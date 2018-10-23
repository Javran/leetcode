function BinHeap(elemToKey) {
  this.size = 0
  this.container = []
  this.elemToKey = elemToKey
}

const siftUp = pq => ind => {
  const {container, elemToKey} = pq
  while (ind !== 0) {
    const parentInd = (ind - 1) >> 1
    if (elemToKey(container[parentInd]) > elemToKey(container[ind])) {
      const tmp = container[parentInd]
      container[parentInd] = container[ind]
      container[ind] = tmp
      ind = parentInd
    } else {
      break
    }
  }
}

const siftDown = pq => ind => {
  const {size, container, elemToKey} = pq
  while (true) {
    const lcInd = ind*2+1
    const rcInd = ind*2+2
    if (lcInd >= size)
      break
    let preferInd = ind
    if (
      elemToKey(container[lcInd]) <= elemToKey(container[preferInd])
    )
      preferInd = lcInd
    if (
      rcInd < size &&
      elemToKey(container[rcInd]) <= elemToKey(container[preferInd])
    )
      preferInd = rcInd

    if (preferInd !== ind) {
      const tmp = container[preferInd]
      container[preferInd] = container[ind]
      container[ind] = tmp
      ind = preferInd
    } else {
      break
    }
  }
}

BinHeap.prototype.insert = function(e) {
  const eInd = this.size
  this.container[this.size] = e
  ++this.size
  siftUp(this)(eInd)
}

BinHeap.prototype.extractMin = function() {
  if (this.size === 0)
    return null
  const ret = this.container[0]
  this.container[0] = this.container[this.size-1]
  --this.size
  siftDown(this)(0)
  return ret
}

/**
 * @param {number[][]} times
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
const networkDelayTime = (times, N, K) => {
  /* idea: typical Dijkstra's algorithm */

  // build graph
  const graph = new Array(N+1)
  for (let i = 0; i < times.length; ++i) {
    const [u,v,w] = times[i]
    let sub
    if (u in graph) {
      sub = graph[u]
    } else {
      sub = new Array(N+1)
      graph[u] = sub
    }
    if (v in sub) {
      // in case that we have more than one path between u and v
      sub[v] = Math.min(sub[v], w)
    } else {
      sub[v] = w
    }
  }

  const dists = new Array(N+1).fill(+Infinity)
  const visited = new Array(N+1)
  dists[K] = 0
  const pq = new BinHeap(x => x.dist)
  pq.insert({node: K, dist: 0})
  while (pq.size > 0) {
    const {node, dist} = pq.extractMin()
    if (visited[node]) {
      continue
    }
    visited[node] = true
    if (node in graph) {
      graph[node].forEach((w, v) => {
        if (dists[v] > dists[node] + w) {
          dists[v] = dists[node] + w
          pq.insert({node: v, dist: dists[v]})
        }
      })
    }
  }
  let max = -Infinity
  for (let i = 1; i <= N; ++i) {
    if (dists[i] === +Infinity)
      return -1
    if (dists[i] > max)
      max = dists[i]
  }
  return max
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(networkDelayTime)

f([[2,1,1],[2,3,1],[3,4,1]],4,2)(2)
