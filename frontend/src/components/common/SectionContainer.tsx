// src/components/common/SectionContainer.tsx

import type { ReactNode, HTMLAttributes } from "react";
import { forwardRef } from "react";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
} & HTMLAttributes<HTMLElement>;

const SectionContainer = forwardRef<HTMLElement, Props>(function SectionContainer(
  { id, children, className = "", ariaLabel, ...rest },
  ref
) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      ref={ref}
      className={`relative isolate mx-auto w-full ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
});

export default SectionContainer;