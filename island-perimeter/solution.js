/**
 * @param {number[][]} grid
 * @return {number}
 */
const islandPerimeter = grid => {
  const rows = grid.length
  if (rows === 0)
    return 0
  const cols = grid[0].length
  if (cols === 0)
    return 0

  // solution: count every cell for bounds
  // bounds are either grid bound or value between a 1-cell and a 0-cell
  let p = 0
  for (let i = 0; i < rows; ++i)
    for (let j = 0; j < cols; ++j)
      if (grid[i][j] !== 0) {
        if (i-1 < 0 || grid[i-1][j] === 0)
          ++p
        if (i+1 >= rows || grid[i+1][j] === 0)
          ++p
        if (j-1 < 0 || grid[i][j-1] === 0)
          ++p
        if (j+1 >= cols || grid[i][j+1] === 0)
          ++p
      }

  return p
}

console.log(islandPerimeter(
  [
    [0,1,0,0],
    [1,1,1,0],
    [0,1,0,0],
    [1,1,0,0],
  ]
))

console.log(islandPerimeter(
  [
    [1,0],
    [1,1],
    [0,1],
  ]
))
