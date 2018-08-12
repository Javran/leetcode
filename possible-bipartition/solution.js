/**
 * @param {number} N
 * @param {number[][]} dislikes
 * @return {boolean}
 */
const possibleBipartition = (N, dislikes) => {
  /*
     idea: standard bipartitie-ness testing by coloring.
     give two colors ("false" and "true") and try to color
     all nodes with neighboring ones being different colors
     and see if we can obtain a consistent result.
   */
  const colors = new Array(N).fill(null)
  const graph = new Array(N)
  for (let i = 0; i < N; ++i)
    graph[i] = []
  for (let i = 0; i < dislikes.length; ++i) {
    let [x,y] = dislikes[i]
    --x
    --y
    graph[x].push(y)
    graph[y].push(x)
  }

  const solveFor = (i, color) => {
    if (colors[i] !== null) {
      return colors[i] === color
    }
    colors[i] = color
    const ds = graph[i]
    for (let t = 0; t < ds.length; ++t) {
      const j = ds[t]
      if (!solveFor(j, !color))
        return false
    }
    return true
  }

  for (let i = 0; i < N; ++i) {
    if (colors[i] === null) {
      if (!solveFor(i, true))
        return false
    } else {
      if (!solveFor(i, colors[i]))
        return false
    }
  }
  return true
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(possibleBipartition)
f(4, [[1,2],[1,3],[2,4]])(true)
f(3, [[1,2],[1,3],[2,3]])(false)
f(5, [[1,2],[2,3],[3,4],[4,5],[1,5]])(false)
