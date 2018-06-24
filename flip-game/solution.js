/**
 * @param {string} s
 * @return {string[]}
 */
const generatePossibleNextMoves = s => {
  const locs = []
  for (let i = 1; i < s.length; ++i) {
    if (s[i-1] === '+' &&s [i] === '+')
      locs.push(i-1)
  }
  return locs.map(loc => {
    return s.substring(0, loc) + '--' + s.substring(loc+2)
  })
}

console.log(generatePossibleNextMoves("++--++++"))
