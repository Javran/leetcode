/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
const canVisitAllRooms = rooms => {
  /*
     idea: standard DFS should do, we at most have 3000 keys to worry about.
   */
  const N = rooms.length
  // not necessary to keep the count, but this will allow speed up
  let vCount = 0
  const visited = new Uint8Array(N)
  const go = room => {
    if (visited[room])
      return
    visited[room] = 1
    ++vCount
    for (let i = 0; i < rooms[room].length; ++i) {
      go(rooms[room][i])
    }
  }
  go(0)
  return vCount === N
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(canVisitAllRooms)
f([[1],[2],[3],[]])(true)
f([[1,3],[3,0,1],[2],[0]])(false)
