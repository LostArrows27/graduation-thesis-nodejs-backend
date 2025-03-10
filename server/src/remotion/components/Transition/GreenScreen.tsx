import { useRef, useCallback } from "react";
import {
  useVideoConfig,
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
} from "remotion";

export const Greenscreen: React.FC<{
  opacity: number;
  videoSrc: string;
}> = ({ opacity, videoSrc }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { width, height } = useVideoConfig();

  // Process a frame
  const onVideoFrame = useCallback(
    (frame: CanvasImageSource) => {
      if (!canvas.current) {
        return;
      }
      const context = canvas.current.getContext("2d");

      if (!context) {
        return;
      }

      context.drawImage(frame, 0, 0, width, height);
      const imageFrame = context.getImageData(0, 0, width, height);
      const { length } = imageFrame.data;

      // If the pixel is very green, reduce the alpha channel
      for (let i = 0; i < length; i += 4) {
        const red = imageFrame.data[i + 0];
        const green = imageFrame.data[i + 1];
        const blue = imageFrame.data[i + 2];
        if (green > 100 && red < 100 && blue < 100) {
          imageFrame.data[i + 3] = opacity * 255;
        }
      }
      context.putImageData(imageFrame, 0, 0);
    },
    [height, opacity, width]
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <OffthreadVideo
          playbackRate={2}
          style={{ opacity: 0 }}
          src={staticFile(videoSrc)}
          onVideoFrame={onVideoFrame}
        />
      </AbsoluteFill>
      <AbsoluteFill>
        <canvas ref={canvas} width={width} height={height} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
