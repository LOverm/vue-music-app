export function shuffle(arr) {
  let _arr = arr.slice();
  for (let index = 0; index < arr.length; index++) {
    let j = getRandomInt(0, index);
    let t = _arr[index];
    _arr[index] = _arr[j];
    _arr[j] = t;
  }
  return _arr;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
