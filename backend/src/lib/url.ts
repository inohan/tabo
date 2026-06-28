export const parseTournamentUrl = (url: string) => {
  return new URL(url).origin;
};
