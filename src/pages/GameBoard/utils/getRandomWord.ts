const randomWordsList = [
  "SHARP",
  "CRAFT",
  "MATTE",
  "GHOST",
  "MORAL",
  "CLOUD",
  "TRUST",
  "WASTE",
  "FRONT"
];

export const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * randomWordsList.length);
  return randomWordsList[randomIndex];
};
