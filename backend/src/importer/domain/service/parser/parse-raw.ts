import { ParseFailedError } from '@shared/domain/error';
import { ok, err } from 'neverthrow';
import * as v from 'valibot';

const TableSchema = v.pipe(
  v.object({
    headers: v.array(v.nullable(v.string())),
    data: v.array(
      v.array(v.nullable(v.union([v.string(), v.number(), v.boolean()]))),
    ),
  }),
  v.check(
    ({ headers, data }) => data.every((row) => row.length === headers.length),
    'Header and data have unequal number of columns.',
  ),
  v.rawTransform(({ dataset, addIssue, NEVER }) => {
    const camelCaseHeaders = v.parse(
      v.array(v.nullable(v.pipe(v.string(), v.toCamelCase()))),
      dataset.value.headers.map((col) => (col !== '' ? col : null)),
    );
    const headersWithCamelCase = dataset.value.headers.map(
      (header, index) =>
        [
          index,
          {
            raw: header,
            processed: camelCaseHeaders[index],
          },
        ] as const,
    );
    const headersGroupedByCamelCase = Map.groupBy(
      headersWithCamelCase,
      (column) => column[1].processed,
    );
    let hasErrors = false;
    for (const [
      camelCasedHeader,
      cols,
    ] of headersGroupedByCamelCase.entries()) {
      if (camelCasedHeader === null || cols.length <= 1) {
        continue;
      }
      for (const col of cols) {
        addIssue({
          message: `There are multiple columns with the same header "${camelCasedHeader}"`,
          path: [
            {
              type: 'object',
              origin: 'value',
              input: dataset.value,
              key: 'headers',
              value: dataset.value.headers,
            },
            {
              type: 'array' as const,
              origin: 'value' as const,
              input: dataset.value.headers,
              key: col[0],
              value: col[1].raw,
            },
          ],
        });
      }
      hasErrors = true;
    }
    if (hasErrors) {
      return NEVER;
    }
    return dataset.value.data.map((row) =>
      Object.fromEntries(
        headersWithCamelCase
          .filter(
            (
              input,
            ): input is [
              number,
              { readonly processed: string; readonly raw: string | null },
            ] => input[1].processed !== null,
          )
          .map(([idx, { processed }]) => [
            processed,
            row[idx] !== '' ? row[idx] : null,
          ]),
      ),
    );
  }),
);

export const parseRawTable = (
  headers: (string | null)[],
  data: (string | number | boolean | null)[][],
) => {
  const result = v.safeParse(TableSchema, { headers, data });
  if (!result.success) {
    return err(ParseFailedError.fromIssue<typeof TableSchema>(result.issues));
  }
  return ok(result.output);
};
