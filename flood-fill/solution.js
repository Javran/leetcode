function QNode(r,c) {
  this.r = r
  this.c = c
  this.next = null
}

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
const floodFill = (image, sr, sc, newColor) => {
  /*
     idea: standard floodfill, no much to say.
   */
  const rows = image.length
  const cols = image[0].length
  const visited = new Array(rows)
  for (let i = 0; i < rows; ++i)
    visited[i] = new Uint8Array(cols)
  const oldColor = image[sr][sc]
  if (oldColor === newColor)
    return image
  let qHead = new QNode(sr,sc)
  let qTail = qHead
  visited[sr][sc] = 1
  while (qHead !== null) {
    const {r,c} = qHead
    if (image[r][c] === oldColor) {
      image[r][c] = newColor
      const enqueue = (r,c) => {
        if (visited[r][c] === 0) {
          visited[r][c] = 1
          qTail.next = new QNode(r,c)
          qTail = qTail.next
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
    }
    qHead = qHead.next
  }
  return image
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(floodFill)
f([[1,1,1],[1,1,0],[1,0,1]],1,1,2)()
