import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { emojify } from "node-emoji";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

/**
 * Formats a BigInt timestamp to a readable date string
 */
export function formatTimestamp(timestamp: bigint): string {
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Creates an explorer URL for a transaction or address
 */
export function getExplorerUrl(
  hashOrAddress: string,
  chainId: number = 11155111
): string {
  const baseUrl =
    chainId === 11155111
      ? "https://sepolia.etherscan.io"
      : "https://etherscan.io";
  return `${baseUrl}/tx/${hashOrAddress}`;
}

export function getMyExplorerUrl(hashOrAddress: string): string {
  const baseUrl = "https://block-explorer-chi.vercel.app";

  return `${baseUrl}/tx/${hashOrAddress}`;
}

export function parseEmojis(text: string): string {
  return emojify(text);
}
