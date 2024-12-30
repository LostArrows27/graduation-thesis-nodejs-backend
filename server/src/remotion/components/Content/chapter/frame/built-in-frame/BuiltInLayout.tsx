import { AbsoluteFill, Img } from "remotion";
import { BuiltInTransitionLayoutProps } from "../../../../../types/content.type";
import { builtInPath } from "../../../../../constants/constants";
import { MapPin } from "lucide-react";
import { loadFont as loadTitleFont } from "@remotion/google-fonts/AmaticSC";
import { useMemoAssetArray } from "../../../../../hooks/use-memo-asset-path";
import { memo } from "react";

const { fontFamily } = loadTitleFont();

// TODO: add location if have later
const BuiltInLayout = ({
  children,
  bg,
  imageNumber,
}: BuiltInTransitionLayoutProps) => {
  const [bgPath, paperPath, yellowNotePath, blackNotePath] = useMemoAssetArray(
    [
      `bg${bg === "dark" ? "_dark" : ""}.png`,
      "paper_white.png",
      "yellow_note.png",
      "black_note.png",
    ],
    builtInPath,
  );

  return (
    <AbsoluteFill className="overflow-hidden">
      <AbsoluteFill>
        <Img
          className="object-cover object-center w-full h-full"
          src={bgPath}
        />
      </AbsoluteFill>
      {bg === "light" && (
        <AbsoluteFill>
          <Img
            src={paperPath}
            className="object-cover rotate-180 object-center w-[120%] max-w-[120%] min-w-[120%] h-auto -top-10"
          />
        </AbsoluteFill>
      )}
      <AbsoluteFill>{children}</AbsoluteFill>
      <AbsoluteFill>
        {bg === "dark" ? (
          <div className="h-[81.25px] absolute w-[500px] -left-[320px] -bottom-2">
            <div className="right-0 absolute h-full w-[180px] p-2 gap-1 flex items-center">
              <MapPin size={30} />
              <p
                className="text-2xl font-bold"
                style={{
                  fontFamily,
                }}
              >
                144 Ba Vì, Hà Nội
              </p>
            </div>
            <Img className="image-fit-full" src={yellowNotePath} />
          </div>
        ) : (
          <div
            style={{
              display: imageNumber === 4 ? "none" : "block", // NOTE: frame 4 images ugly -> remove:)
            }}
            className="-bottom-[250px] h-[363.75px] w-[500px] -left-[230px] absolute"
          >
            <div className="right-0 absolute h-full w-[270px] mt-10  gap-2 px-2 py-4 flex">
              <MapPin color="rgb(212,212,216)" size={30} />
              <p
                className="text-zinc-300 text-3xl font-bold"
                style={{
                  fontFamily,
                }}
              >
                144 Ba Vì, Hà Nội
              </p>
            </div>
            <Img className="image-fit-full" src={blackNotePath} />
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default memo(BuiltInLayout);
