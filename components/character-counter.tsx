interface CharacterCounterProps {
  current: number;
  max: number;
  warningThreshold?: number;
  dangerThreshold?: number;
}

export default function CharacterCounter({
  current,
  max,
  warningThreshold = 200,
  dangerThreshold = 250,
}: CharacterCounterProps) {
  const percentage = Math.min((current / max) * 100, 100);

  const getTextColor = () => {
    if (current > dangerThreshold) {
      return "text-orange-500 dark:text-orange-400";
    }
    if (current > warningThreshold) {
      return "text-zinc-600 dark:text-zinc-400";
    }
    return "text-zinc-500 dark:text-zinc-500";
  };

  return (
    <div className="mt-2 flex items-center justify-between">
      <div className="flex-1">
        <div className="h-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <span
        className={`ml-3 text-xs font-medium transition-colors ${getTextColor()}`}
      >
        {current}/{max}
      </span>
    </div>
  );
}
