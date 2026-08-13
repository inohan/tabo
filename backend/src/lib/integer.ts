import { integer, number, pipe } from 'valibot';

export const integerSchema = pipe(number(), integer());
