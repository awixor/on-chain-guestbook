import { SpinnerIcon } from "@/lib/icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export default function Button({
  isLoading = false,
  loadingText,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`
        w-full px-6 py-3.5 text-sm font-semibold rounded-xl cursor-pointer
        bg-zinc-900 text-white 
        dark:bg-zinc-100 dark:text-zinc-900
        enabled:hover:bg-zinc-800 
        dark:enabled:hover:bg-zinc-200 
        hover:bg-origin-border
        enabled:hover:shadow-md
        disabled:opacity-50 
        disabled:cursor-not-allowed 
        disabled:shadow-none
        transition-all duration-200
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <SpinnerIcon className="h-4 w-4" />
            {loadingText || children}
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
}
