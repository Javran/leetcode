/**
 * @param {number} N
 * @param {number[][]} edges
 * @return {number[]}
 */
const sumOfDistancesInTree = (N, edgesRaw) => {
  const edges = new Array(N)
  for (let i = 0; i < N; ++i)
    edges[i] = []
  for (let i = 0; i < edgesRaw.length; ++i) {
    const [u,v] = edgesRaw[i]
    edges[u].push(v)
    edges[v].push(u)
  }
  // parent[i]: null or parent of node i
  const parent = new Array(N).fill(null)
  // distSum[i]: distance sum in subtree whose root is i
  const distSum = new Array(N)
  // nodeCount[i]: # of nodes
  const nodeCount = new Array(N)
  // making node 0 the root.
  parent[0] = 0
  const go = i => {
    // determine parent-child relation
    // and compute distSum and nodeCount
    const children = edges[i].filter(x => parent[x] === null)
    let nowCount = 1
    let nowDistSum = 0
    children.forEach(c => {
      parent[c] = i
      const [cnt, ds] = go(c)
      nowCount += cnt
      nowDistSum += cnt + ds
    })
    distSum[i] = nowDistSum
    nodeCount[i] = nowCount
    return [nowCount, nowDistSum]
  }
  const [rootCount, rootDistSum] = go(0)
  const ans = new Array(N)
  ans[0] = distSum[0]
  const computeAns = i => {
    const children = edges[i].filter(x => parent[x] === i)
    children.forEach(c => {
      // by moving from parent i to child c,
      // (N - nodeCount[c]) nodes are one edge further away
      // nodeCount[c] nodes are one edge closer
      // therefore we have:
      // (N - nodeCount[c])*1 - nodeCount[c]*1
      // = N - 2*nodeCount[c]
      ans[c] = ans[i] + N - 2*nodeCount[c]
      computeAns(c)
    })
  }
  computeAns(0)
  return ans
}

sumOfDistancesInTree(6, [[0,1],[0,2],[2,3],[2,4],[2,5]])
