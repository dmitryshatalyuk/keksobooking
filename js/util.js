export function getRandomValue(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

export function getRandomLocationValue(min, max) {
  return Math.random() * (max - min) + min;
}