import { ExternalLinkIcon } from "@/lib/icons";

interface ExplorerLinkButtonProps {
  href: string;
  label: string;
}

export default function ExplorerLinkButton({
  href,
  label,
}: ExplorerLinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
    >
      <span>{label}</span>
      <ExternalLinkIcon className="h-3 w-3" />
    </a>
  );
}
