const pinyin = require('pinyin')

export function shuffle(arr) {
  const _arr = arr.slice()
  for (let index = 0; index < arr.length; index++) {
    const j = getRandomInt(0, index)
    const t = _arr[index]
    _arr[index] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 实现函数的防抖
 * @param {传入函数} func
 * @param {等待时间} wait
 */
export function debounce(func, wait) {
  var timeout

  return function() {
    var context = this
    var args = arguments

    clearTimeout(timeout)
    timeout = setTimeout(function() {
      func.apply(context, args)
    }, wait)
  }
}

export function getInitialLetter(word) {
  const py = pinyin(word[0], {
    style: pinyin.STYLE_FIRST_LETTER
  })
  return py[0][0].toUpperCase()
}
