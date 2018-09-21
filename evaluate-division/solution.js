/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
const calcEquation = (equations, values, queries) => {
  /*
     idea:

     notice that, when given a / b = u, b / c = v,
     - we know b / a = 1 / u and c / b =  1 / v
     - we also know a / c = (a / b) * (b / c) = u * v

     this allows us to use transitivity to derive the "path" we want.

     so the relation can be encoded into a graph in which nodes are variables,
     and for an edge (A,B), we attach a value k on this edge to mean that A/B = k,
     as the input is guaranteed to be consistent, given any two variable A and B,
     we just need to find a path from A to B and multiple values along the path.

   */

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
