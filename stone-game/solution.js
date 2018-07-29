/**
 * @param {number[]} piles
 * @return {boolean}
 */
const stoneGame = ps => {
  /*
     idea: memoized search seems good enough. I was worried that I have to keep track
     of current score of both players without realizing that it's only the score difference
     that matters.

     well, you can just return true.
     ref: https://leetcode.com/problems/stone-game/discuss/154610/C++JavaPython-DP-or-Just-return-true

     basically since length of input is even,
     the partity of the length doesn't change when either Alex or Lee take their turns,
     so Alex, which is the first player, can always choose the i-th piles where i is always odd or always even
     (here the index does not change as game proceeds).
     the winning strategy then becomes just pick the pile that has larger sum.
   */
  const N = ps.length
  const memoize = f => {
    const xs = new Array(N)
    return x => {
      if (x in xs) {
        return xs[x]
      } else {
        xs[x] = f(x)
        return xs[x]
      }
    }
  }
  // let search(l)(r) be `current player - opposite` on score.
  const search = memoize(l => memoize(r => {
    if (l > r)
      return 0
    return Math.max(ps[l] - search(l+1)(r), ps[r] - search(l)(r-1))
  }))
  return search(0)(N-1) > 0
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(stoneGame)

f([5,3,4,5])(true)
