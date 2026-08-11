export type TeamUpdateNecessity =
  | {
      team: 'new';
    }
  | {
      team: 'update';
      fields: unknown; //TODO: implement update logic
      speakers: ('new' | 'update' | 'match')[];
    }
  | {
      team: 'match';
    };
