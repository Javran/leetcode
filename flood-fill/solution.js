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
  const queue = []
  let qHead = 0
  queue.push([sr,sc])
  visited[sr][sc] = 1
  while (qHead < queue.length) {
    const [r,c] = queue[qHead]
    ++qHead
    if (image[r][c] !== oldColor)
      continue
    image[r][c] = newColor
    const enqueue = (r,c) => {
      if (visited[r][c] === 0) {
        visited[r][c] = 1
        queue.push([r,c])
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
  return image
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(floodFill)
f([[1,1,1],[1,1,0],[1,0,1]],1,1,2)()
