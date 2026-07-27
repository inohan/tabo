export type ImportOrigin =
  | {
      type: 'google-sheets';
      id: string;
      tableId: string;
    }
  | {
      type: 'excel';
      id: string;
      tableId: string;
    }
  | {
      type: 'csv';
      id: string;
    };
