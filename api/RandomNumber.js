export const RandomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min);
};
