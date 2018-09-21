/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
const calcEquation = (equations, values, queries) => {
  // graph: Map<Var, Map<Var, K>>
  // e.g.: if A / B = K, graph[A][B] = K
  const graph = new Map()
  const insert = (u, v, val) => {
    let sub
    if (graph.has(u)) {
      sub = graph.get(u)
    } else {
      sub = new Map()
      graph.set(u, sub)
    }
    sub.set(v, val)
  }
  for (let i = 0; i < equations.length; ++i) {
    const [varA, varB] = equations[i]
    const k = values[i]
    insert(varA, varB, k)
    insert(varB, varA, 1/k)
  }

  return queries.map(([vFrom, vTo]) => {
    if (vFrom === vTo)
      return graph.has(vFrom) ? 1 : -1
    const visited = new Set([vFrom])
    const search = (now, prod) => {
      if (now === vTo)
        return prod
      if (graph.has(now)) {
        const nexts = [...graph.get(now).entries()]
        for (let i = 0; i < nexts.length; ++i) {
          const [vNext, vFac] = nexts[i]
          if (visited.has(vNext))
            continue
          visited.add(vNext)
          const ret = search(vNext, prod*vFac)
          if (ret !== -1)
            return ret
          visited.delete(vNext)
        }
      }
      return -1
    }
    return search(vFrom, 1)
  })
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(calcEquation)

f(
  [["a","b"],["b","c"]],
  [2.0,3.0],
  [["a","c"],["b","c"],["a","e"],["a","a"],["x","x"]]
)([6.0,3.0,-1.0,1.0,-1.0])
