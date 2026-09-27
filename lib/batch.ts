export function deriveBatchFromRoll(rollNumber?: string): string {
  if (!rollNumber) return "";
  const match = rollNumber.trim().match(/^(\d{2})/);
  if (!match) return "";
  return `20${match[1]}`;
}
