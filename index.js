/* jshint esversion: 6 */

// Util Function for Math.random()
function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// cat avatars for customers
function getCatPicture() {
  return `https://http.cat/${getRandomArbitrary(0, 1000)}`;
}
