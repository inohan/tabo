import { NotFoundError } from '@shared/domain';
import { Result } from 'neverthrow';

export abstract class ImportFileReaderPort {
  abstract read(): Promise<
    Result<
      {
        headers: (string | null)[];
        data: (string | boolean | number | null)[][];
      },
      NotFoundError
    >
  >;
}
