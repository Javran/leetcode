/**
 * @param {number[]} pid
 * @param {number[]} ppid
 * @param {number} kill
 * @return {number[]}
 */
const killProcess = (pid, ppid, kill) => {
  const N = pid.length
  const graph = new Map()
  for (let i = 0; i < N; ++i) {
    const vFrom = ppid[i]
    const vTo = pid[i]
    if (graph.has(vFrom)) {
      graph.get(vFrom).push(vTo)
    } else {
      graph.set(vFrom, [vTo])
    }
  }
  const ans = []
  const search = vStart => {
    ans.push(vStart)
    if (graph.has(vStart)) {
      // if we trust input to never give us loops,
      // there is no need of checking some "if-visited" flags
      graph.get(vStart).forEach(search)
    }
  }
  search(kill)
  return ans
}

console.log(killProcess([1,3,10,5],[3,0,5,3],5))
