// TODO: remove this since i don't use it anymore:)))

export const transitionEffects = [
  {
    in: "slide-from-left",
    out: "slide-to-right",
    type: "self-built",
  },
  {
    in: "slide-in-from-2-side",
    out: "slide-out-from-2-side",
    type: "self-built",
  },

  // remotion-transitions
  // 1. slide()
  {
    in: "from-left",
    out: "to-right",
    type: "remotion-transitions",
  },
  {
    in: "from-right",
    out: "to-left",
    type: "remotion-transitions",
  },
  {
    in: "from-top",
    out: "to-bottom",
    type: "remotion-transitions",
  },
  {
    in: "from-bottom",
    out: "to-top",
    type: "remotion-transitions",
  },
] as const;

export const MIN_CONFIDENCE = 0.2;

export const MAX_IMAGE_PER_FRAME = 6;

export const MAX_EVENT_FRAME = 2;
