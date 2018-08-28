/**
 * @param {number[][]} grid
 * @return {number}
 */
const shortestDistance = grid => {
  /*
     idea: BFS with some "pruning"

     (1) notice that if one building cannot reach all other buildings,
         finding a solution won't be possible.
     (2) in fact (1) is not always true: if there is only one building,
         we just want to see if there are empty spaces around it
         to allow a valid solution, so we treat this case specially.
     (3) given at least two buildings, we find all coordinates reachable from both
         and search only in this space

         in fact coordinate of shortest distance can only exist in
         coordinates reachable from first building.
         but in case that 4-directions of first building might not
         necessarily connect with each other, it's important
         to have a pair of buildings so that we can further narrow down
         the search space.
   */
  const rows = grid.length
  const cols = grid[0].length
  // coordinates of buildings
  const bldCoords = []
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (grid[i][j] === 1) {
        bldCoords.push([i,j])
      }
    }
  }
  // INVARIANT: input guarantees that bldCoords.length >= 1
  /*
     compute a matrix of reachable points for initCoord,
     isReachable(r,c) is called in addition to checking grids,
     this allows us to use things like `reach0`, `reach`
     without changing too much of the code.

     the function returns [reach, emptySpace] in which
     reach[i][j] is either Infinity or a distance from initCoord,
     and emptySpace is true iff. there are empty cells encountered
     throughout the search
   */
  const computeReach = (initCoord, isReachable) => {
    const [r0,c0] = initCoord
    const reach = new Array(rows)
    for (let i = 0; i < rows; ++i)
      reach[i] = new Array(cols).fill(Infinity)
    const queue = []
    let qHd = 0
    queue.push(initCoord)
    reach[r0][c0] = 0
    const enqueue = (r,c,dep) => {
      if (isReachable(r,c) && reach[r][c] > dep) {
        reach[r][c] = dep
        queue.push([r,c])
      }
    }
    let emptySpace = false
    while (qHd < queue.length) {
      const [r,c] = queue[qHd]
      const newDepth = reach[r][c] + 1
      // expand when it's origin or empty
      if (qHd === 0 || grid[r][c] === 0) {
        if (grid[r][c] === 0)
          emptySpace = true
        if (r > 0)
          enqueue(r-1,c,newDepth)
        if (r+1 < rows)
          enqueue(r+1,c,newDepth)
        if (c > 0)
          enqueue(r,c-1,newDepth)
        if (c+1 < cols)
          enqueue(r,c+1,newDepth)
      }
      ++qHd
    }
    return [reach, emptySpace]
  }
  const [reach0, es0] = computeReach(bldCoords[0], () => true)
  if (!es0)
    return -1
  if (bldCoords.length === 1) {
    // special case: we only have one building,
    // in which case any empty space right near it will do
    return 1
  }
  // it's helpful to know if all buildings are reachable from each other
  // if not, we can return -1 right away.
  for (let i = 1; i < bldCoords.length; ++i) {
    const [r,c] = bldCoords[i]
    if (reach0[r][c] === Infinity)
      return -1
  }

  const [reach1, es1] = computeReach(bldCoords[1], (r,c) => reach0[r][c] < Infinity)
  if (!es1)
    return -1
  // combine the reach of two buildings to build the final "reachable" check.
  // using both `reachX` allows narrowing down our search space.
  const reach = new Array(rows)
  for (let i = 0; i < rows; ++i) {
    reach[i] = new Uint8Array(cols)
    for (let j = 0; j < cols; ++j) {
      if (reach0[i][j] < Infinity && reach1[i][j] < Infinity)
        reach[i][j] = 1
    }
  }
  const reaches = new Array(bldCoords.length)
  reaches[0] = reach0
  reaches[1] = reach1
  for (let i = 2; i < bldCoords.length; ++i) {
    const [rch, _ignored] = computeReach(bldCoords[i], (r,c) => reach[r][c] === 1)
    reaches[i] = rch
  }
  let ans = +Infinity
  for (let r = 0; r < rows; ++r) {
    for (let c = 0; c < cols; ++c) {
      if (grid[r][c] === 0 && reach[r][c] === 1) {
        let curDist = 0
        for (let i = 0; i < bldCoords.length; ++i) {
          curDist += reaches[i][r][c]
        }
        if (curDist < ans)
          ans = curDist
      }
    }
  }
  return ans < Infinity ? ans : -1
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(shortestDistance)
f([[1]])(-1)
f([[0,1]])(1)
f([[0],[1]])(1)
f([[2],[1]])(-1)
f([
  [1,0,2,0,1],
  [0,0,0,2,2],
  [0,0,1,2,0],
])(-1)
f([
  [1,0,2,0,1],
  [0,0,0,0,2],
  [0,0,1,2,2],
])(7)
