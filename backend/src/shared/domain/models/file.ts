import { Branded, Struct } from 'src/lib/brand';
import { TournamentId } from './tournament';

export declare const fileIdSymbol: unique symbol;
export declare const fileSymbol: unique symbol;

export type FileId = Branded<string, typeof fileIdSymbol>;

export const FileId = {
  ...Struct<FileId>(),
};

export type File = Branded<
  {
    tournamentId: TournamentId;
    id: FileId;
    path: string;
  },
  typeof fileSymbol
>;

export const File = {
  ...Struct<File>(),
};
