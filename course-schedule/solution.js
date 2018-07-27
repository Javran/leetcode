/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
const canFinish = (N, pres) => {
  /*
     idea: standard topological sorting
   */
  const adjMat = new Array(N)
  const inDeg = new Uint32Array(N)
  for (let i = 0; i < N; ++i)
    adjMat[i] = []
  pres.forEach(([u,v]) => {
    adjMat[v].push(u)
    ++inDeg[u]
  })
  const queue = []
  let qHead = 0
  for (let i = 0; i < N; ++i)
    if (inDeg[i] === 0)
      queue.push(i)
  while (qHead < queue.length) {
    const u = queue[qHead]
    ++qHead
    adjMat[u].forEach(v => {
      --inDeg[v]
      if (inDeg[v] === 0) {
        queue.push(v)
      }
    })
    adjMat[u] = []
  }
  return inDeg.every(x => x === 0)
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(canFinish)

f(8,[[1,0],[2,0],[3,2],[4,2],[5,3],[6,4],[7,1],[7,6]])(true)
f(8,[[1,0],[2,0],[3,2],[4,2],[5,3],[6,4],[7,1],[7,6],[0,5]])(false)
f(2,[[1,0]])(true)
f(2,[[1,0],[0,1]])(false)
