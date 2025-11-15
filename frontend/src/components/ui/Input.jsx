import { cn } from '../../lib/utils';

export function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-3 text-sm text-gray-900 dark:text-gray-100 ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:border-purple-500 dark:focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-500/20 dark:focus-visible:ring-purple-600/20 focus-visible:ring-offset-2 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm hover:shadow-md',
        className
      )}
      {...props}
    />
  );
}

