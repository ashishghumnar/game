function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  while (color.length < 7) {
    color += letters[Math.round(Math.random() * 16)];
  }

  return color;
}

export default getRandomColor;
