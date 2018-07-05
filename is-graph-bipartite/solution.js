/**
 * @param {number[][]} graph
 * @return {boolean}
 */
const isBipartite = graph => {
  // idea: color neighboring nodes with different colors
  // if we can consistently color whole graph, the graph is a bipartite.
  const N = graph.length
  // color[i] = -1: not colored yet, 0: white, 1: black
  const color = new Int8Array(N).fill(-1)
  let result = true
  const doColor = (i, c) => {
    if (color[i] !== -1) {
      // colored (or visited)
      if (color[i] !== c) {
        result = false
      }
      return
    }
    color[i] = c
    const otherC = 1 - c
    const nodes = graph[i]
    for (let nInd = 0; nInd < nodes.length && result; ++nInd) {
      doColor(nodes[nInd], otherC)
    }
  }
  for (let i = 0; i < N; ++i)
    if (color[i] === -1)
      doColor(i, 0)
  return result
}

console.assert(!isBipartite([[1,2,3], [0,2], [0,1,3], [0,2]]))
console.assert(!
  isBipartite([
    [],
    [2,4,6],
    [1,4,8,9],
    [7,8],
    [1,2,8,9],
    [6,9],
    [1,5,7,8,9],
    [3,6,9],
    [2,3,4,6,9],
    [2,4,5,6,7,8]
  ]))
