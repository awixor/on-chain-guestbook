/**
 * Truncates a hash string to show first N and last M characters
 */
export function truncateHash(
  hash: string,
  startLength = 6,
  endLength = 4
): string {
  if (hash.length <= startLength + endLength) {
    return hash;
  }
  return `${hash.slice(0, startLength)}...${hash.slice(-endLength)}`;
}
