export function getCurrentSeason(): string {
  const now = new Date();
  const year = now.getFullYear();
  const nextYearShort = String(year + 1).slice(2);

  return `${year}/${nextYearShort}`;
}
