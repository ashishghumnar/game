/**
 * Create The Score Map Only Once and Cache for futher reference
 */
const map = new Map();

const createMap = () => {
  let size = 1;
  let points = 10;

  while (size <= 10) {
    map.set(size * 10, points);
    size++;
    points--;
  }
};

function getScore(size) {
  if (map.size > 0) {
    return map.get(size);
  }

  createMap();

  return map.get(size);
}

export default getScore;
