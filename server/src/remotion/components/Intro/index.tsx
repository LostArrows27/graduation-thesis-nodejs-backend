import { AbsoluteFill, Sequence } from "remotion";
import { IntroProps } from "../../types/video.type";
import FirstIntroScene from "./FirstIntroScene";
import {
  INTRO_FIRST_SCENE_LENGTH,
  INTRO_SECOND_SCENE_LENGTH,
} from "../../constants/constants";
import SecondIntroScene from "./SecondIntroScene";

const IntroScene = ({ firstScene, secondScene }: IntroProps) => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={INTRO_FIRST_SCENE_LENGTH}>
        <FirstIntroScene
          title={firstScene.title}
          time={firstScene.time}
          images={firstScene.images}
        />
      </Sequence>
      <Sequence
        from={INTRO_FIRST_SCENE_LENGTH}
        durationInFrames={INTRO_SECOND_SCENE_LENGTH}
      >
        <SecondIntroScene
          firstCaption={secondScene.firstCaption}
          secondCaption={secondScene.secondCaption}
          images={secondScene.images}
          // direction="vertical"
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export default IntroScene;
