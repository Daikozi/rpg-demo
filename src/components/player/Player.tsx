import React, { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseConfig";
import { Direction, useAnimate } from "../../hooks/useAnimate";
import { useKeyDown } from "../../hooks/useKeyBoard";
import { Actor } from "../actor/Actor";

export type PlayerType = {
  name: string;
  id: string;
  direction: number;
  x: number;
  y: number;
  step: number;
};

type PlayerProps = {
  skin: string;
  player: PlayerType;
};

export const Player: FC<PlayerProps> = ({ skin, player }) => {
  const [user] = useAuthState(auth);

  const data = {
    h: 16,
    w: 16,
  };

  const { id } = player;

  const { animate, directions } = useAnimate(4, player);

  useKeyDown((event: KeyboardEvent) => {
    event.preventDefault();
    const dir = event.key.replace("Arrow", "").toLowerCase();
    if (directions.hasOwnProperty(dir) && user?.uid === id) {
      animate(dir as Direction);
    }
  });

  return (
    <Actor
      sprite={`/assets/sprites/skins/${skin}.png`}
      data={data}
      step={player.step}
      direction={player.direction}
      position={{ x: player.x, y: player.y }}
    />
  );
};
