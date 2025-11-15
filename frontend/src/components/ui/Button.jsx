import { cn } from '../../lib/utils';

export function Button({ className, variant = 'default', ...props }) {
  const variants = {
    default: 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold',
    outline: 'border-2 border-purple-400 dark:border-purple-600 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-lg transition-all duration-300',
    ghost: 'hover:bg-purple-100/80 dark:hover:bg-purple-950/40 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-300 rounded-lg',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-6 py-2.5',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

