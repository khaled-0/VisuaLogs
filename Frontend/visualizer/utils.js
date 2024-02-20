export function getRandomColor() {
  return "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
}

export function getRandomVelocity(positive = false) {
  const array = positive ? [2, 3, 4] : [-4, -3, -2, 2, 3, 4];
  return array[Math.floor(Math.random() * array.length)];
}

/**@param {number} max default 5  */
export function getRandomInt(max = 5) {
  return Math.floor(Math.random() * max) + 1;
}
