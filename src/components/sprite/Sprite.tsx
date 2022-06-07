import { FC } from "react";

type SpriteProps = {
  image: string;
  data: {
    x: number;
    y: number;
    h: number;
    w: number;
  };
  position: {
    x: number;
    y: number;
  };
};

export const Sprite: FC<SpriteProps> = ({ image, data, position }) => {
  const { x, y, h, w } = data;
  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        height: `${h}px`,
        width: `${w}px`,
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: `-${x}px -${y}px`,
        transition: "top 0.4s, left 0.4s",
      }}
    />
  );
};
