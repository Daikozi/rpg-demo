import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { PlayerType } from "../components/player/Player";
import { firestore } from "../firebase/firebaseConfig";

export type Direction = "down" | "left" | "right" | "up";

export const useAnimate = (maxSteps: number, player: PlayerType) => {
  const { x, y, id } = player;
  const [position, setPosition] = useState({
    x,
    y,
  });
  const [direction, setDirection] = useState(0);
  const [step, setStep] = useState(0);

  const directions = {
    down: 0,
    up: 1,
    left: 2,
    right: 3,
  };

  const stepSize = 4;

  const modifier = {
    down: { x: 0, y: stepSize },
    left: { x: -stepSize, y: 0 },
    right: { x: stepSize, y: 0 },
    up: { x: 0, y: -stepSize },
  };

  const move = (dir: Direction) => {
    setPosition((prev) => ({
      x: prev.x + modifier[dir].x,
      y: prev.y + modifier[dir].y,
    }));
  };

  const animate = async (dir: Direction) => {
    setDirection((prev) => {
      if (directions[dir as Direction] === prev) {
        move(dir);
      }
      return directions[dir as Direction];
    });
    setStep((prev) => (prev < maxSteps - 1 ? prev + 1 : 0));
    await setDoc(doc(firestore, "players", id), {
      ...player,
      direction: direction,
      step: step,
      x: position.x,
      y: position.y,
    });
  };

  return { animate, directions };
};
