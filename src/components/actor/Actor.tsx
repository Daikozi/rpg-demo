import React, { FC } from "react";
import { Sprite } from "../sprite/Sprite";

type ActorProps = {
  sprite: string;
  step: number;
  direction: number;
  data: {
    h: number;
    w: number;
  };
  position: {
    x: number;
    y: number;
  };
};

export const Actor: FC<ActorProps> = ({
  sprite,
  data,
  step,
  direction,
  position,
}) => {
  const { h, w } = data;
  return (
    <Sprite
      image={sprite}
      data={{ x: direction * w, y: step * h, h, w }}
      position={position}
    />
  );
};
