/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
const robotSim = (commands, obstaclesRaw) => {
  /*
     idea: just do the simulation, command takes at most 9 moves,
     which isn't very large to handle, so let's do one step at a time.
   */
  const obstacles = new Set()
  for (let i = 0; i < obstaclesRaw.length; ++i) {
    const [x,y] = obstaclesRaw[i]
    obstacles.add(`${x},${y}`)
  }
  const hasObstacle = (x,y) =>
    obstacles.has(`${x},${y}`)

  let x = 0, y = 0, dir = 0 // 0: N, 1: E, 2: S, 3: W
  const next = () => {
    if (dir === 0) {
      return [x,y+1]
    }
    if (dir === 1) {
      return [x+1,y]
    }
    if (dir === 2) {
      return [x,y-1]
    }
    if (dir === 3) {
      return [x-1,y]
    }
  }
  let max = 0
  commands.forEach(cmd => {
    if (cmd === -2) {
      dir = (dir + 3) % 4
    } else if (cmd === -1) {
      dir = (dir + 1) % 4
    } else {
      for (let i = 1; i <= cmd; ++i) {
        const [nx,ny] = next()
        if (hasObstacle(nx,ny))
          break
        let curDist = nx*nx + ny*ny
        if (curDist > max)
          max = curDist
        x = nx
        y = ny
      }
    }
  })
  return max
}

console.log(robotSim([4,-1,4,-2,4], [[2,4]]))
