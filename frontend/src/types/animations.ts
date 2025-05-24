import type { MotionValue } from "framer-motion";

export type HeroAnimations = {
	scrollYProgress: MotionValue<number>;
	mainTitleOpacity: MotionValue<number>;
	sectionOpacity: MotionValue<number>;
	laterOpacity: MotionValue<number>;

	logoX: MotionValue<number>;
	logoY: MotionValue<number>;
	logoRotate: MotionValue<number>;
	logoScale: MotionValue<number>;
	logoColor: MotionValue<string>;

	subtitleY: MotionValue<number>;
  subtitleX: MotionValue<number>;
	subtitleOpacity: MotionValue<number>;
	subtitleColor: MotionValue<string>;
	isSubtitleBold: MotionValue<boolean>;

	photoY: MotionValue<number>;
	photoOpacity: MotionValue<number>;

	cloneOpacities: MotionValue<number>[];
	blurLevels: MotionValue<number>[];
};
