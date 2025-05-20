// src/components/CardFrame.tsx

import { forwardRef } from "react";
import type { ElementType, ComponentPropsWithRef, Ref } from "react";
import { clsx } from "clsx";

type CardFrameProps<E extends ElementType = "article"> = {
	as?: E;
	className?: string;
	bgColor?: string;
	frameColor?: string;
	innerBorderColor?: string;
} & ComponentPropsWithRef<E>;

export const CardFrame = forwardRef(
	<E extends ElementType = "article">(
		{
			as,
			className = "",
			children,
			bgColor = "bg-beige/30",
			frameColor = "border-yellow",
			innerBorderColor = "border-primary",
			...rest
		}: CardFrameProps<E>,
		ref: Ref<Element>,
	) => {
		const Comp: ElementType = as ?? "article";

		return (
			<Comp
				ref={ref}
				className={clsx(
					"relative overflow-hidden rounded-3xl p-6 sm:p-8 shadow-md backdrop-blur-lg",
					bgColor,
					className,
				)}
				{...rest}
			>
				{/* Bordas visuais */}
				<div
					className={clsx(
						"pointer-events-none absolute inset-4 rounded-2xl border-2",
						innerBorderColor,
					)}
				/>
				<div
					className={clsx(
						"pointer-events-none absolute inset-2 rounded-2xl border-2",
						innerBorderColor,
					)}
				/>
				<div
					className={clsx(
						"pointer-events-none absolute inset-0 rounded-3xl border-[8px]",
						frameColor,
					)}
				/>
				{/* Conteúdo */}
				<div className="relative z-10">{children}</div>
			</Comp>
		);
	},
);

CardFrame.displayName = "CardFrame";
