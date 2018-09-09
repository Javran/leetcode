/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const solve = board => {
  const rows = board.length
  if (rows <= 2)
    return
  const cols = board[0].length
  if (cols <= 2)
    return

  /*

     idea: mark cells that need to be preserved and color all the others.

     for the marking process, we do floodfill along the border.
     well, not exactly floodfill as we are doing DFS for simplicity.

   */
  const protect = new Array(rows)
  for (let i = 0; i < rows; ++i) {
    protect[i] = new Uint8Array(cols)
  }

  const expand = (x,y) => {
    if (board[x][y] === 'X' || protect[x][y] === 1)
      return
    protect[x][y] = 1
    if (x > 0)
      expand(x-1, y)
    if (x+1 < rows)
      expand(x+1, y)
    if (y > 0)
      expand(x, y-1)
    if (y+1 < cols)
      expand(x, y+1)
  }

  for (let i = 0; i < rows; ++i) {
    expand(i, 0)
    expand(i, cols-1)
  }
  for (let j = 1; j < cols-1; ++j) {
    expand(0, j)
    expand(rows-1, j)
  }

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (board[i][j] === 'O' && protect[i][j] === 0)
        board[i][j] = 'X'
    }
  }
}
