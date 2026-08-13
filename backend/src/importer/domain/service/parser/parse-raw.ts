import { CellValue } from '@importer/domain/values';
import { ParseFailedError } from '@shared/domain/error';
import { ok, err, Result } from 'neverthrow';
import * as v from 'valibot';

const TableSchema = v.pipe(
  v.object({
    headers: v.array(v.nullable(v.string())),
    row: v.array(v.nullable(v.union([v.string(), v.number(), v.boolean()]))),
  }),
  v.check(
    ({ headers, row }) => row.length === headers.length,
    'Header and row have unequal number of columns.',
  ),
  v.rawTransform(({ dataset, addIssue, NEVER }) => {
    const headersWithCamelCase = dataset.value.headers.map(
      (header, index) =>
        [
          index,
          {
            raw: header,
            processed: v.parse(
              v.nullable(v.pipe(v.string(), v.toCamelCase())),
              header !== '' ? header : null,
            ),
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
    return Object.fromEntries(
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
          dataset.value.row[idx] !== '' ? dataset.value.row[idx]! : null,
        ]),
    );
  }),
);

/**
 * Converts raw headers and data into a record whose key is the camelCased header.
 * @param headers The header.
 * @param data The rows.
 * @returns An array of results of the parsing
 */
export const parseRawTable = ({
  headers,
  data,
}: {
  headers: (string | null)[];
  data: CellValue[][];
}): Result<Record<string, CellValue>, ParseFailedError<typeof TableSchema>>[] =>
  data.map((row) => {
    const result = v.safeParse(TableSchema, { headers, row });
    if (!result.success) {
      return err(ParseFailedError.fromIssue<typeof TableSchema>(result.issues));
    }
    return ok(result.output);
  });
