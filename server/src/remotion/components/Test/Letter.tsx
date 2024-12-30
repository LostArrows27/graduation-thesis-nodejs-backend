import { AbsoluteFill } from "remotion";

export const Letter: React.FC<{ color: string; children: React.ReactNode }> = ({
  color,
  children,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color, fontSize: 200 }}>{children}</h1>
    </AbsoluteFill>
  );
};
