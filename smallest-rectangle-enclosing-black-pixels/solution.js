function QNode(coords) {
  this.coords = coords
  this.next = null
}

/**
 * @param {character[][]} image
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const minArea = (img, xInp, yInp) => {
  // as we are guaranteed to get one black region,
  // there is no need of checking (=== 0)s

  // idea: not the fastest approach, but BFS seesm good enough
  const rows = img.length
  const cols = img[0].length
  const visited = new Array(rows)
  for (let i = 0; i < rows; ++i)
    visited[i] = new Int8Array(cols)
  let qHead = new QNode([xInp, yInp])
  visited[xInp][yInp] = 1
  let qTail = qHead
  let xMin = xInp, xMax = xInp
  let yMin = yInp, yMax = yInp
  while (qHead !== null) {
    const {coords: [x,y]} = qHead
    if (x < xMin) xMin = x
    if (x > xMax) xMax = x
    if (y < yMin) yMin = y
    if (y > yMax) yMax = y
    const enqueue = (x,y) => {
      if (
        x >= 0 && x < rows && y >= 0 && y < cols &&
        img[x][y] === '1' &&
        visited[x][y] === 0
      ) {
        visited[x][y] = 1
        qTail.next = new QNode([x,y])
        qTail = qTail.next
      }
    }
    enqueue(x-1,y)
    enqueue(x+1,y)
    enqueue(x,y-1)
    enqueue(x,y+1)
    qHead = qHead.next
  }
  return (xMax - xMin + 1) * (yMax - yMin + 1)
}

console.assert(minArea(["0010", "0110", "0100"], 0, 2) === 6)
