import { CsvError, parse } from 'csv-parse/sync';
import chardet from 'chardet';
import { err, ok, Result } from 'neverthrow';
import { FileError } from '@shared/domain';

export class CsvClient {
  read(input: Uint8Array): Result<string[][], FileError> {
    const encoding = this.getEncoding(input);
    if (encoding === null) {
      return err(new FileError('Failed to read csv: unknown encoding'));
    }
    const decoder = new TextDecoder(encoding);
    const decoded = decoder.decode(input).toString();
    try {
      const records = parse(decoded);
      return ok(records);
    } catch (e) {
      if (e instanceof CsvError) {
        return err(
          new FileError(`Failed to parse CSV: ${e.message}`, { cause: e }),
        );
      } else {
        throw e;
      }
    }
  }

  private getEncoding(input: Uint8Array): string | null {
    return chardet.detect(input);
  }
}
