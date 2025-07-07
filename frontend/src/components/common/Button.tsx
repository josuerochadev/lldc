import type React from 'react';

import { cn } from '@/lib/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, ...props }: ButtonProps) {
  return <button className={cn('button-primary font-semibold', className)} {...props} />;
}
