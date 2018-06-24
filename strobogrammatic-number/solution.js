const strobMaps = new Map([
  ["0", "0"],
  ["1", "1"],
  ["6", "9"],
  ["8", "8"],
  ["9", "6"],
])

/**
 * @param {string} num
 * @return {boolean}
 */
const isStrobogrammatic = num => {
  const num2 = new Array(num.length)
  for (let i = 0; i < num.length; ++i) {
    const n = num[i]
    // all nums can be turned upside down (meaningfully)
    if (strobMaps.has(n)) {
      const v = strobMaps.get(n)
      // reversing
      num2[num.length-i] = v
    } else {
      return false
    }
  }
  return num2.join("") === num
}
