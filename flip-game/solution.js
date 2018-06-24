/**
 * @param {string} s
 * @return {string[]}
 */
const generatePossibleNextMoves = s => {
  const locs = []
  const ans = []
  for (let i = 1; i < s.length; ++i) {
    if (s[i-1] === '+' &&s [i] === '+') {
      ans.push(s.substring(0, i-1) + '--' + s.substring(i+1))
    }
  }
  return ans
}

console.log(generatePossibleNextMoves("++--++++"))
