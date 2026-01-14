import { ExternalLinkIcon, SpinnerIcon } from "@/lib/icons";

interface ExternalLinkButtonProps {
  href: string;
  label: string;
  isLoading?: boolean;
}

export default function ExternalLinkButton({
  href,
  label,
  isLoading,
}: ExternalLinkButtonProps) {
  if (isLoading) {
    return (
      <button
        disabled
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500 cursor-not-allowed"
      >
        <span>{label}</span>
        <SpinnerIcon className="h-3 w-3 animate-spin" />
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
    >
      <span>{label}</span>
      {isLoading ? (
        <SpinnerIcon className="h-3 w-3 animate-spin" />
      ) : (
        <ExternalLinkIcon className="h-3 w-3" />
      )}
    </a>
  );
}
