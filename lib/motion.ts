/**
 * Global motion design tokens and choreography constants for Pixel Arc.
 *
 * Philosophy: slow, weighty, architectural. No bounce or spring overshoot on large elements.
 * - ease-out-expo: (0.16, 1, 0.3, 1) for entrances and reveals
 * - ease-in-out-quart: (0.76, 0, 0.24, 1) for route wipes, drawers, and state transitions
 */

export const MOTION_EASE = {
  /** Cubic-bezier tuple for Motion (Framer Motion) entrances */
  outExpo: [0.16, 1, 0.3, 1] as const,
  /** Cubic-bezier tuple for Motion (Framer Motion) page wipes and drawers */
  inOutQuart: [0.76, 0, 0.24, 1] as const,
  /** CSS timing function string for transitions */
  cssOutExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** CSS timing function string for transitions */
  cssInOutQuart: "cubic-bezier(0.76, 0, 0.24, 1)",
  /** GSAP power / custom ease equivalents */
  gsapOutExpo: "expo.out",
  gsapInOutQuart: "quart.inOut",
  gsapOutPower3: "power3.out",
} as const;

export const MOTION_DURATION = {
  /** Quick micro-interactions (underlines, arrow swaps, row offsets) */
  micro: 0.35,
  /** Standard hover wipes and interactive state changes */
  hover: 0.45,
  /** Editorial text and image reveals */
  reveal: 1.05,
  /** Hero / large display headline entrance */
  heroReveal: 1.25,
  /** Route panel wipe duration */
  pageTransition: 0.75,
  /** Initial session preloader duration (seconds) */
  preloader: 1.8,
} as const;

export const MOTION_STAGGER = {
  /** Tight stagger between SplitText lines */
  lines: 0.09,
  /** Word-by-word masked reveal stagger */
  words: 0.035,
  /** Sequential list items / navigation links */
  items: 0.06,
} as const;

export const LENIS_CONFIG = {
  lerp: 0.095,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.4,
} as const;

export const MAGNETIC_CONFIG = {
  /** Activation radius around button center in pixels */
  radius: 80,
  /** Maximum displacement factor relative to pointer delta */
  strength: 0.28,
  /** Inner label parallax strength */
  innerStrength: 0.14,
  /** GSAP quickTo return duration in seconds */
  duration: 0.55,
} as const;

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.18,
} as const;

/**
 * Standard Motion variants aligned with Pixel Arc's architectural easing.
 */
export const fadeRevealVariant = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.reveal,
      ease: MOTION_EASE.outExpo,
      delay,
    },
  }),
};

export const panelWipeVariant = {
  initial: {
    clipPath: "inset(0% 0% 0% 0%)",
  },
  animate: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: {
      duration: MOTION_DURATION.pageTransition,
      ease: MOTION_EASE.inOutQuart,
    },
  },
  exit: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: MOTION_DURATION.pageTransition,
      ease: MOTION_EASE.inOutQuart,
    },
  },
};
