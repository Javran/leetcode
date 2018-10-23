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
      sub = new Map()
      graph[u] = sub
    }
    if (sub.has(v)) {
      // in case that we have more than one path between u and v
      sub.set(v, Math.min(sub.get(v), w))
    } else {
      sub.set(v, w)
    }
  }

  const dists = new Array(N+1).fill(+Infinity)
  const visited = new Array(N+1)
  let vCount = 0
  dists[K] = 0
  const pq = new BinHeap(x => x.dist)
  pq.insert({node: K, dist: 0})
  while (pq.size > 0) {
    const {node, dist} = pq.extractMin()
    if (visited[node]) {
      continue
    }
    visited[node] = true
    vCount += 1
    if (vCount === N)
      break
    if (node in graph) {
      for (let [v, w] of graph[node].entries()) {
        if (dists[v] > dists[node] + w) {
          dists[v] = dists[node] + w
          pq.insert({node: v, dist: dists[v]})
        }
      }
    }
  }
  if (vCount !== N)
    return -1
  let max = dists[1]
  for (let i = 2; i <= N; ++i) {
    if (dists[i] > max)
      max = dists[i]
  }
  return max
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(networkDelayTime)

f([[2,1,1],[2,3,1],[3,4,1]],4,2)(2)
