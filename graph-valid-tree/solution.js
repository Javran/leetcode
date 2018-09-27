/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
const validTree = (n, edges) => {
  if (edges.length !== n-1) {
    return false
  }
  const graph = new Map()
  const insert = (a, b) => {
    let sub
    if (graph.has(a)) {
      sub = graph.get(a)
    } else {
      sub = new Set()
      graph.set(a, sub)
    }
    sub.add(b)
  }

  for (let i = 0; i < edges.length; ++i) {
    const [u,v] = edges[i]
    insert(u,v)
    insert(v,u)
  }

  let count = 0
  const visited = new Int8Array(n)
  const search = u => {
    visited[u] = 1
    ++count
    if (graph.has(u)) {
      for (let v of graph.get(u)) {
        if (!visited[v]) {
          search(v)
        }
      }
    }
  }
  search(0)
  return n === count
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(validTree)
f(5, [[0,1], [0,2], [0,3], [1,4]])()
