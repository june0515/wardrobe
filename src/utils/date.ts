export const todayISO = () => new Date().toISOString().slice(0, 10);

export function daysSince(date?: string) {
  if (!date) return Infinity;
  const start = new Date(date).getTime();
  const now = new Date().getTime();
  return Math.floor((now - start) / (1000 * 60 * 60 * 24));
}
