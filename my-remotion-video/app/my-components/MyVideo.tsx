import { AbsoluteFill, useCurrentFrame } from "remotion";

export const MyVideo = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      className="flex items-center justify-center bg-black text-white text-5xl"
    >
      My Custom Video — Frame {frame}
    </AbsoluteFill>
  );
};
