import { cn } from '../../lib/utils';

export function Label({ className, ...props }) {
  return (
    <label
      className={cn(
        'text-sm font-semibold leading-none text-gray-700 dark:text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  );
}

