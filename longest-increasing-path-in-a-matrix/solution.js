function QNode(r,c) {
  this.r = r
  this.c = c
  this.next = null
}

/**
 * @param {number[][]} matrix
 * @return {number}
 */
const longestIncreasingPath = mat => {
  const rows = mat.length
  if (rows === 0)
    return 0
  const cols = mat[0].length
  if (cols === 0)
    return 0
  /*
     idea: BFS, and keep dist updated until getting "fixpoint"
   */
  const dist = new Array(rows)
  for (let i = 0; i < rows; ++i) {
    dist[i] = new Uint16Array(cols).fill(1)
  }

  let ans = 1
  let qHead = {next: null}
  let qTail = qHead
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      qTail.next = new QNode(i,j)
      qTail = qTail.next
    }
  }
  qHead = qHead.next
  while (qHead !== null) {
    const {r,c} = qHead
    const curH = mat[r][c]
    const nextDist = dist[r][c] + 1
    const enqueue = (r1,c1) => {
      if (mat[r1][c1] > curH) {
        if (nextDist > dist[r1][c1]) {
          dist[r1][c1] = nextDist
          if (nextDist > ans)
            ans = nextDist
          qTail.next = new QNode(r1,c1)
          qTail = qTail.next
        }
      }
    }

    if (r > 0)
      enqueue(r-1,c)
    if (r+1 < rows)
      enqueue(r+1,c)
    if (c > 0)
      enqueue(r,c-1)
    if (c+1 < cols)
      enqueue(r,c+1)
    qHead = qHead.next
  }

  return ans
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(longestIncreasingPath)
f([[9,9,4],[6,6,8],[2,1,1]])(4)
f([[3,4,5],[3,2,6],[2,2,1]])(4)
f([[1,2]])(2)
