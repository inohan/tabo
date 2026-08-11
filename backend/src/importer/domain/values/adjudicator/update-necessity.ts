export type AdjudicatorUpdateNecessity =
  | {
      adjudicator: 'new';
    }
  | {
      adjudicator: 'update';
      fields: unknown; //TODO: implement update logic
    }
  | {
      adjudicator: 'match';
    };
