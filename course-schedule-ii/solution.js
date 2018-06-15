/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
const findOrder = (numCourses, prerequisites) => {
  // topological sorting ftw!
  const edges = new Array(numCourses)
  for (let i = 0; i < numCourses; ++i)
    edges[i] = []
  const indegree = new Array(numCourses).fill(0)
  for (let i = 0; i < prerequisites.length; ++i) {
    const [to, frm] = prerequisites[i]
    edges[frm].push(to)
    ++indegree[to]
  }
  const ans = []
  const queue = []
  for (let i = 0; i < numCourses; ++i)
    if (indegree[i] === 0)
      queue.push(i)
  let curInd = 0
  while (curInd < queue.length) {
    const cur = queue[curInd]
    ++curInd
    ans.push(cur)
    for (let i = 0; i < edges[cur].length; ++i) {
      const to = edges[cur][i]
      --indegree[to]
      if (indegree[to] === 0)
        queue.push(to)
    }
  }
  return ans.length === numCourses ? ans : []
}

console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]))
