/**
 * @param {number[][]} grid
 * @return {number}
 */
const cherryPickup = grid => {
  if (grid.length === 0 || grid[0].length === 0)
    return 0
  const N = grid.length
  const memoize = f => {
    const xs = new Array(N)
    return i => {
      if (i in xs)
        return xs[i]
      const ans = f(i)
      xs[i] = ans
      return ans
    }
  }

  const search = memoize(x1 => memoize(y1 => memoize(x2 => memoize(y2 => {
    /*
       INVARIANT:
       - x1+y1 === x2+y2 (two worker must occupy same diag)
       - x1 <= x2 (w.l.o.g. lock worker1 to the left of worker2)
     */
    if (
      x1 === x2 && x1 === N-1 && x1 === y1
    ) {
      return Number(Boolean(grid[N-1][N-1] === 1))
    }

    let ans = 0
    if (x1 === x2) {
      if (grid[x1][y1] === 1)
        ++ans
    } else {
      if (grid[x1][y1] === 1)
        ++ans
      if (grid[x2][y2] === 1)
        ++ans
    }
    let max = null
    const p1Down = x1+1 < N && grid[x1+1][y1] !== -1
    const p2Down = x2+1 < N && grid[x2+1][y2] !== -1
    const p1Right = y1+1 < N && grid[x1][y1+1] !== -1
    const p2Right = y2+1 < N && grid[x2][y2+1] !== -1
    if (p1Down && p2Down) {
      const result = search(x1+1)(y1)(x2+1)(y2)
      if (result !== -1) {
        if (max === null || max < result)
          max = result
      }
    }
    if (p1Right && p2Right) {
      const result = search(x1)(y1+1)(x2)(y2+1)
      if (result !== -1) {
        if (max === null || max < result)
          max = result
      }
    }
    if (p1Down && p2Right && x1+1 <= x2) {
      const result = search(x1+1)(y1)(x2)(y2+1)
      if (result !== -1) {
        if (max === null || max < result)
          max = result
      }
    }
    if (p1Right && p2Down && x1 <= x2+1) {
      const result = search(x1)(y1+1)(x2+1)(y2)
      if (result !== -1) {
        if (max === null || max < result)
          max = result
      }
    }

    if (max === null) {
      ans = -1
    } else {
      ans += max
    }
    return ans
  }))))
  const ans = search(0)(0)(0)(0)
  return ans === -1 ? 0 : ans
}

