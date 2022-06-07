export const randomFromArray = (array: []) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getKeyStrin = (x: number, y: number) => {
  return `${x}x${y}`;
};
