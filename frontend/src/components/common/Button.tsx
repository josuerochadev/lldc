import type React from 'react';

import { cn } from '@/lib/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn('button-primary text-base font-semibold sm:text-lg', className)}
      {...props}
    />
  );
}
