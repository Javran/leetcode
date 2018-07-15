/**
 * @param {number} N
 * @return {number}
 */
const binaryGap = N => {
  if (N === 0)
    return 0
  // remove least significant 0s
  while (N !== 0 && !(N & 1))
    N >>= 1
  if (N === 1)
    // only happens when there is a single '1'
    return 0
  // to bin str
  let str = []
  while (N !== 0) {
    str.push((N & 1) ? '1' : '0')
    N >>= 1
  }
  str = str.join('')
  let max = -Infinity
  let i = 0
  while (i < str.length) {
    // try all distances
    const j = str.indexOf('1', i+1)
    if (j === -1)
      break
    if (max < j - i)
      max = j - i
    i = j
  }
  return max
}

console.assert(binaryGap(0) === 0)
console.assert(binaryGap(1) === 0)
console.assert(binaryGap(64) === 0)
console.assert(binaryGap(6) === 1)
console.assert(binaryGap(5) === 2)
console.assert(binaryGap(22) === 2)
