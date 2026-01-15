import { Skeleton } from "@/lib/ui/skeleton";

export default function ConnectWalletSkeleton() {
  return (
    <div className="mb-12 flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Skeleton className="h-11.5 w-48 rounded-lg" />
        <Skeleton className="h-11.5 w-48 rounded-lg" />
      </div>
    </div>
  );
}
