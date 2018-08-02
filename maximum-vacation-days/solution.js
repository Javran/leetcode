/**
 * @param {number[][]} flights
 * @param {number[][]} days
 * @return {number}
 */
const maxVacationDays = (flights, days) => {
  const N = flights.length
  const K = days[0].length
  /*
     idea:

     f[i][j] is the maximum vacation days we can have during week 0..i with
     week i stayed in city j.

     - f[0][j] = days[j][0]
       if city j is reachable from city 0 (or it's city 0 itself)
     - f[w][c] = max of f[w-1][c']
       if city c is reachable from city c' (or c' === c)

   */
  const f = new Array(K)
  for (let w = 0; w < K; ++w)
    f[w] = new Array(N).fill(-Infinity)
  f[0][0] = days[0][0]
  for (let c = 1; c < N; ++c) {
    if (flights[0][c]) {
      f[0][c] = days[c][0]
    }
  }
  for (let w = 1; w < K; ++w) {
    for (let c = 0; c < N; ++c) {
      // determine f[w][c]
      let cur = -Infinity
      for (let cPrev = 0; cPrev < N; ++cPrev) {
        if (c === cPrev || flights[cPrev][c]) {
          if (f[w-1][cPrev] > cur)
            cur = f[w-1][cPrev]
        }
      }
      f[w][c] = cur + days[c][w]
    }
  }
  let max = -Infinity
  for (let i = 0; i < N; ++i)
    if (max < f[K-1][i])
      max = f[K-1][i]
  return max
}

const {consoleTest, genList, genInt} = require('leetcode-zwischenzug')
const f = consoleTest(maxVacationDays)
f([[0,1,1],[1,0,1],[1,1,0]], [[1,3,1],[6,0,3],[3,3,3]])(12)
f([[0,0,0],[0,0,0],[0,0,0]], [[1,1,1],[7,7,7],[7,7,7]])(3)
f([[0,1,1],[1,0,1],[1,1,0]], [[7,0,0],[0,7,0],[0,0,7]])(21)

const mkTest = () => {
  const flights = new Array(100)
  for (let i = 0; i < 100; ++i) {
    flights[i] = genList(100, {l:0, r:1})
    flights[i][i] = 0
  }
  const days = new Array(100)
  for (let i = 0; i < 100; ++i) {
    days[i] = genList(98, {l:0, r:7})
  }
  console.log(JSON.stringify(flights))
  console.log(JSON.stringify(days))
}
// mkTest()
