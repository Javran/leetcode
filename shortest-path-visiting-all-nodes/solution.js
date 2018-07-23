function QNode(front, vState, depth) {
  // "visited" flags
  this.vState = vState
  // current node
  this.front = front
  this.depth = depth
  this.fromNode = null
  this.next = null
}

/**
 * @param {number[][]} graph
 * @return {number}
 */
const shortestPathLength = graph => {
  const N = graph.length
  const vStateSet = (which, vState) => (vState | (1 << which))
  const vStateTest = (which, vState) => Boolean(vState & (1 << which))

  // memo[vState][front] = {depth, fromNode} records the best path of <vState> and <front>
  const memo = new Array(1 << N)

  // dummy node for now
  let qHead = {next: null}
  let qTail = qHead
  let targetVState = 0
  for (let i = 0; i < N; ++i) {
    const vState = vStateSet(i, 0)
    const node = new QNode(i, vState, 0)
    qTail.next = node
    qTail = qTail.next

    memo[vState] = new Array(N)
    memo[vState][i] = {depth: node.depth, fromNode: node.fromNode}

    // reusing this loop to set target v-state, which is 1 for all nodes
    targetVState = vStateSet(i, targetVState)
  }
  // get rid of dummy head
  qHead = qHead.next
  while (qHead) {
    const {vState, front, fromNode, depth} = qHead
    if (vState === targetVState) {
      // current one is already a solution, no need of looking further.
      qHead = qHead.next
      continue
    }
    // try to extend the front
    graph[front].forEach(nextNode => {
      const newVState = vStateSet(nextNode, vState)
      const nextQNode = new QNode(nextNode, newVState, depth+1)
      nextQNode.fromNode = qHead
      if (!(newVState in memo)) {
        memo[newVState] = new Array(N)
      }
      if (!(nextNode in memo[newVState])) {
        memo[newVState][nextNode] = nextQNode
      } else {
        const m = memo[newVState][nextNode]
        if (m.depth > depth+1) {
          memo[newVState][nextNode] = nextQNode
        } else {
          return
        }
      }
      qTail.next = nextQNode
      qTail = qTail.next
    })
    qHead = qHead.next
  }
  let minDepth = +Infinity
  let minFront = null
  memo[targetVState].forEach(x => {
    if (minDepth > x.depth) {
      minDepth = x.depth
      minFront = x.front
    }
  })
  return minDepth
}

const inp2 = [
  // 0
  [1,2,3],
  // 1
  [0,6],
  // 2
  [0,4,5],
  // 3
  [0, 9, 10],
  // 4
  [2],
  // 5
  [2,11],
  // 6
  [1,7],
  // 7
  [8,6],
  // 8
  [7],
  // 9
  [3],
  // 10
  [3],
  // 11
  [5]
]

// console.log(JSON.stringify(inp2))
// console.log(shortestPathLength([[1,2,3],[0],[0],[0]]))
console.assert(shortestPathLength(inp2) === 15)
console.assert(shortestPathLength([[1,2,3],[0],[0],[0]]) === 4)
console.assert(shortestPathLength([[1],[0,2,4],[1,3,4],[2],[1,2]]) === 4)
