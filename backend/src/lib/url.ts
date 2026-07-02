/**
 * Gets the origin of a tournament URL.
 * @param url URL of the tournament, e.g. "https://tabbycat.tabroom.com/t/2023-2024-national-championships"
 * @returns The origin of the URL
 */
export const parseTournamentUrl = (url: string) => {
  return new URL(url).origin;
};
