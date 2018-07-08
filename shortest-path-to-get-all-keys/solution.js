function QNode(x,y,keySt,step) {
  this.x = x
  this.y = y
  this.keySt = keySt
  this.step = step
  this.next = null
}

const decodeKeySt = keySt => {
  const ans = []
  if (keySt & 1)
    ans.push('a')
  if (keySt & 2)
    ans.push('b')
  if (keySt & 4)
    ans.push('c')
  if (keySt & 8)
    ans.push('d')
  if (keySt & 16)
    ans.push('e')
  if (keySt & 32)
    ans.push('f')
  return new Set(ans)
}

const encodeKeySt = s => {
  let ret = 0
  if (s.has('a'))
    ret |= 1
  if (s.has('b'))
    ret |= 2
  if (s.has('c'))
    ret |= 4
  if (s.has('d'))
    ret |= 8
  if (s.has('e'))
    ret |= 16
  if (s.has('f'))
    ret |= 32
  return ret
}

/**
 * @param {string[]} grid
 * @return {number}
 */
const shortestPathAllKeys = grid => {
  const rows = grid.length
  const cols = grid[0].length
  let startPos
  // store key and lock in same array
  const keyAndLocks = []
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      const code = grid[i].codePointAt(j)
      if (code === 64) {
        startPos = [i,j]
      } else if (code >= 97 && code <= 102) {
        keyAndLocks[(code-97)*2] = [i,j]
      } else if (code >= 65 && code <= 70) {
        keyAndLocks[(code-65)*2+1] = [i,j]
      }
    }
  }

  const keyCount = keyAndLocks.length / 2
  // BFS
  let qHead = new QNode(startPos[0], startPos[1], 0, 0)
  let qTail = qHead
  const visited = new Array(rows)
  // 1 <= K <= 6, which allows us to encode set of key-availablity
  // using 6 bits
  for (let i = 0; i < rows; ++i) {
    visited[i] = new Array(cols)
    for (let j = 0; j < cols; ++j) {
      visited[i][j] = new Int8Array(64)
    }
  }
  visited[qHead.x][qHead.y][0] = 1
  while (qHead !== null) {
    const {x,y,keySt,step} = qHead
    const keySet = decodeKeySt(keySt)
    if ('abcdef'.indexOf(grid[x][y]) !== -1)
      keySet.add(grid[x][y])
    if (keySet.size === keyCount)
      return step
    const encodedKeys = encodeKeySt(keySet)
    const tryMove = (x,y) => {
      if (x >= 0 && x < rows && y >= 0 && y < cols) {
        const cell = grid[x][y]
        if (cell !== '#') {
          // should not hit wall
          if ('ABCDEF'.indexOf(cell) !== -1) {
            // or encounter a lock we can't unlock
            const needLock = String.fromCodePoint(cell.codePointAt(0)-65+97)
            if (keySet.has(needLock)) {
              // insert
              if (!visited[x][y][encodedKeys]) {
                visited[x][y][encodedKeys] = 1
                qTail.next = new QNode(x,y,encodedKeys,step+1)
                qTail = qTail.next
              }
            }
          } else {
            // insert
            if (!visited[x][y][encodedKeys]) {
              visited[x][y][encodedKeys] = 1
              qTail.next = new QNode(x,y,encodedKeys,step+1)
              qTail = qTail.next
            }
          }
        }
      }
    }
    tryMove(x-1,y)
    tryMove(x+1,y)
    tryMove(x,y-1)
    tryMove(x,y+1)
    qHead = qHead.next
  }
  return -1
}

console.log(shortestPathAllKeys(["@.a.#","###.#","b.A.B"]))
console.log(shortestPathAllKeys(["@..aA","..B#.","....b"]))
