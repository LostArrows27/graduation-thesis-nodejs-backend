import { AbsoluteFill, Img } from "remotion";
import { FaceProps } from "../../types/video.type";
import {
  useAssetBouncingAnimation,
  useAssetGoInAnimation,
  useLeaderboardAssetAnimation,
  useTitleAnimation,
} from "../../hooks/special-part-animation/use-leaderboard-animation";
import { useMemoAssetArray } from "../../hooks/use-memo-asset-path";
import { specialPath } from "../../constants/constants";
import { loadFont as loadTitleFont } from "@remotion/google-fonts/NotoSans";
import FaceListLayer from "./FaceListLayer";

const { fontFamily } = loadTitleFont();

const FaceLeaderBoard = ({ faces }: { faces: FaceProps[] }) => {
  const { opacity } = useLeaderboardAssetAnimation();

  const [fade2Path, blockSvgPath] = useMemoAssetArray(
    ["fade_2.webp", "block.svg"],
    specialPath
  );

  const { bounce1, bounce2, bounce3 } = useAssetBouncingAnimation();

  const { moveFirstBlockIn, moveSecondBlockIn, moveThirdBlockIn, moveBgIn } =
    useAssetGoInAnimation();

  const { moveFirstTitle, moveSecondTitle } = useTitleAnimation();

  return (
    <AbsoluteFill>
      {/* asset layer */}
      <AbsoluteFill>
        <AbsoluteFill>
          <div
            style={{ opacity: `${opacity}` }}
            className="absolute h-full w-full bg-[rgb(115,246,129)]"
          />
          <Img
            src={fade2Path}
            style={{
              right: `${moveBgIn}px`,
            }}
            className="absolute w-[1200px] h-[800px] object-center"
          />
        </AbsoluteFill>
        <AbsoluteFill>
          <Img
            style={{
              transform: `translateY(${bounce1}px)`,
              top: moveFirstBlockIn,
            }}
            src={blockSvgPath}
            className="absolute w-[500px] right-[-150px] h-auto object-center object-cover"
          />
          <Img
            src={blockSvgPath}
            style={{
              transform: `translateY(${bounce2}px)`,
              left: moveSecondBlockIn,
            }}
            className="absolute w-[200px] top-[20px]  h-auto object-center object-cover"
          />
          <Img
            src={blockSvgPath}
            style={{
              transform: `translateY(${bounce3}px)`,
              bottom: moveThirdBlockIn,
            }}
            className="absolute w-[300px]  left-[300px] h-auto object-center object-cover"
          />
        </AbsoluteFill>
      </AbsoluteFill>
      {/* face leaderboard layer */}
      <AbsoluteFill
        style={{
          fontFamily,
        }}
      >
        {/* face layer */}
        <FaceListLayer faces={faces} />
        {/* caption layer */}
        <AbsoluteFill>
          <div
            style={{
              left: `${moveFirstTitle}px`,
            }}
            className="absolute top-[250px] p-4 w-[500px] h-[80px] center"
          >
            <h1 className="text-black text-4xl uppercase font-bold">
              Bảng xếp hạng
            </h1>
          </div>
          <div
            style={{
              left: `${moveSecondTitle}px`,
            }}
            className="absolute top-[330px] bg-[rgb(231,102,182)] p-4 w-[600px] h-[80px] center"
          >
            <h1 className="text-white text-4xl uppercase font-bold">
              Top 4 người tham gia
            </h1>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default FaceLeaderBoard;
