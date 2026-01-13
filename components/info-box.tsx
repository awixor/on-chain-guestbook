import { InfoIcon } from "@/lib/icons";

interface InfoBoxProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function InfoBox({ title, description, icon }: InfoBoxProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-linear-to-br from-zinc-50/80 to-zinc-50/40 p-4 backdrop-blur-sm transition-all duration-200 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-700 dark:from-zinc-800/80 dark:to-zinc-800/40 dark:hover:border-zinc-600">
      <div className="shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-700/50">
          {icon || (
            <InfoIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          {title}
        </p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}
