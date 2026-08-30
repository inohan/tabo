import * as v from 'valibot';
import { CellValue } from './cell-value';

export const TableValue = v.object({
  headers: v.array(v.string()),
  data: v.array(v.array(CellValue)),
});

export type TableValue = v.InferOutput<typeof TableValue>;
