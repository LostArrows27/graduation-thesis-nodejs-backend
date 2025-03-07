import { Series } from "remotion";
import IntroScene from "./components/Intro";
import OutroScene from "./components/Outro";
import {
  INTRO_SCENE_LENGTH,
  OUTRO_SCENE_LENGTH,
  SPECIAL_PART_LENGTH,
} from "./constants/constants";
import MainScene from "./components/Content";
import { MainProps } from "./types/video.type";
import BackgroundMedia from "./components/Main/BackgroundMedia";
import VideoSpecialPart from "./components/Special/VideoSpecialPart";

const MainVideo = ({
  contentLength,
  introScene,
  bgMusic,
  bgVideo,
  videoDate,
  contentScene,
  titleStyle,
  outroScene,
  specialPart,
}: MainProps) => {
  return (
    <>
      <BackgroundMedia bgMusic={bgMusic} bgVideo={bgVideo} />
      <Series>
        <Series.Sequence durationInFrames={INTRO_SCENE_LENGTH}>
          <IntroScene
            firstScene={{
              ...introScene.firstScene,
              time: new Date(videoDate),
            }}
            secondScene={introScene.secondScene}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={contentLength}>
          <MainScene titleStyle={titleStyle} data={contentScene} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SPECIAL_PART_LENGTH}>
          <VideoSpecialPart
            totalFaces={specialPart.totalFaces}
            faces={specialPart.faces}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={OUTRO_SCENE_LENGTH}>
          <OutroScene data={outroScene} />
        </Series.Sequence>
      </Series>
    </>
  );
};

export default MainVideo;
