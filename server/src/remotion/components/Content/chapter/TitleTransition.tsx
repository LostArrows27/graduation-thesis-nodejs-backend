import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { TITLE_TRANSITION_TIME } from "../../../constants/constants";

const TitleTransition = () => {
  return (
    <TransitionSeries.Transition
      presentation={slide({
        direction: "from-right",
      })}
      timing={linearTiming({
        durationInFrames: TITLE_TRANSITION_TIME,
      })}
    />
  );
};

export default TitleTransition;
