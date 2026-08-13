import * as v from 'valibot';

export const CellValue = v.union([
  v.string(),
  v.number(),
  v.boolean(),
  v.null(),
]);

export type CellValue = v.InferOutput<typeof CellValue>;
