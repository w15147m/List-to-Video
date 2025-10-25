import { z } from "zod";
import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
import React, { useMemo } from "react";
import { CompositionProps } from "../schemata";

const weight = "600" as const;

loadFont("normal", {
  weights: ["400", weight],
});

const footballers = [
  {
    name: "Cristiano Ronaldo 1",
    goals: 899,
    period: "2002–Present",
    details: "Include Club, Country and other",
    bgGradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    textColor: "#2563eb"
  },
  {
    name: "Lionel Messi 2",
    goals: 889,
    period: "2004–Present",
    details: "Include Club, Country and other",
    bgGradient: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
    textColor: "#16a34a"
  },
  {
    name: "Pelé 3",
    goals: 762,
    period: "1957–1977",
    details: "Include Club, Country and other",
    bgGradient: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
    textColor: "#dc2626"
  },
  {
    name: "Romário 4",
    goals: 756,
    period: "1985–2007",
    details: "Include Club, Country and other",
    bgGradient: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
    textColor: "#ea580c"
  }
];

const container: React.CSSProperties = {
  background: "linear-gradient(135deg, #581c87 0%, #4c1d95 50%, #3730a3 100%)",
};

export const Main = ({ title }: z.infer<typeof CompositionProps>) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Duration for each player card (in seconds)
  const cardDuration = 4 * fps; // 4 seconds per card
  const transitionDuration = 0.7 * fps; // 0.7 seconds transition

  // Calculate current player index
  const currentPlayerIndex = Math.floor(frame / cardDuration) % footballers.length;
  const currentPlayer = footballers[currentPlayerIndex];
  
  // Frame within current card
  const frameInCard = frame % cardDuration;

  // Animations for card entrance
  const cardOpacity = interpolate(
    frameInCard,
    [0, transitionDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const cardScale = interpolate(
    frameInCard,
    [0, transitionDuration],
    [0.95, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Staggered animations for elements
  const nameDelay = 0.1 * fps;
  const goalsDelay = 0.2 * fps;
  const periodDelay = 0.3 * fps;

  const nameOpacity = interpolate(
    frameInCard,
    [nameDelay, nameDelay + transitionDuration * 0.5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const nameTranslateY = interpolate(
    frameInCard,
    [nameDelay, nameDelay + transitionDuration * 0.5],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const goalsOpacity = interpolate(
    frameInCard,
    [goalsDelay, goalsDelay + transitionDuration * 0.5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const goalsScale = interpolate(
    frameInCard,
    [goalsDelay, goalsDelay + transitionDuration * 0.5],
    [0.5, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const periodOpacity = interpolate(
    frameInCard,
    [periodDelay, periodDelay + transitionDuration * 0.5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const periodTranslateY = interpolate(
    frameInCard,
    [periodDelay, periodDelay + transitionDuration * 0.5],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Animated goal counter
  const displayedGoals = Math.floor(
    interpolate(
      frameInCard,
      [goalsDelay, goalsDelay + 2 * fps],
      [0, currentPlayer.goals],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.quad),
      }
    )
  );

  const titleStyle: React.CSSProperties = useMemo(() => {
    return {
      fontFamily,
      fontSize: 70,
      fontWeight: weight,
      color: "white",
      textAlign: "center",
      margin: 0,
      padding: "0 40px",
      letterSpacing: "-1px",
    };
  }, []);

  const cardContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  };

  const cardStyle: React.CSSProperties = {
    width: "80%",
    maxWidth: "900px",
    height: "450px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
    opacity: cardOpacity,
    transform: `scale(${cardScale})`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "60px",
  };

  const nameBadgeStyle: React.CSSProperties = {
    background: currentPlayer.bgGradient,
    padding: "20px 50px",
    borderRadius: "50px",
    marginBottom: "40px",
    opacity: nameOpacity,
    transform: `translateY(${nameTranslateY}px)`,
  };

  const nameStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 48,
    fontWeight: "700",
    color: "white",
    margin: 0,
    letterSpacing: "1px",
  };

  const goalsContainerStyle: React.CSSProperties = {
    marginBottom: "40px",
    opacity: goalsOpacity,
    transform: `scale(${goalsScale})`,
  };

  const goalsNumberStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 140,
    fontWeight: "900",
    color: currentPlayer.textColor,
    margin: 0,
    lineHeight: 1,
    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))",
  };

  const goalsLabelStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 32,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    margin: "10px 0 0 0",
    textTransform: "uppercase",
    letterSpacing: "6px",
  };

  const periodContainerStyle: React.CSSProperties = {
    textAlign: "center",
    opacity: periodOpacity,
    transform: `translateY(${periodTranslateY}px)`,
  };

  const periodStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 28,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
    margin: "0 0 8px 0",
  };

  const detailsStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
    margin: 0,
  };

  // Dots indicator
  const dotsContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "40px",
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    margin: "30px 0 0 0",
  };

  return (
    <AbsoluteFill style={container}>
      {/* Main Card */}
      <AbsoluteFill style={cardContainerStyle}>
        <div style={cardStyle}>
          {/* Player Name */}
          <div style={nameBadgeStyle}>
            <h2 style={nameStyle}>{currentPlayer.name}</h2>
          </div>

          {/* Goals Counter */}
          <div style={goalsContainerStyle}>
            <div style={goalsNumberStyle}>{displayedGoals}</div>
            <p style={goalsLabelStyle}>Goals</p>
          </div>

          {/* Period and Details */}
          <div style={periodContainerStyle}>
            <p style={periodStyle}>{currentPlayer.period}</p>
            <p style={detailsStyle}>{currentPlayer.details}</p>
          </div>
        </div>
      </AbsoluteFill>

     
    </AbsoluteFill>
  );
};