const { Interval } = require('leetcode-zwischenzug')

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
      lcInd < size &&
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
 * @param {Interval[][]} schedule
 * @return {Interval[]}
 */
const employeeFreeTime = schedule => {
  // progress[i] is the index of the first pending task for person i
  const progress = new Uint8Array(schedule.length)
  const pQueue = new BinHeap(pInd => schedule[pInd][progress[pInd]].start)
  for (let i = 0; i < schedule.length; ++i)
    pQueue.insert(i)
  const ans = []
  let anchor = -Infinity
  while (pQueue.size > 0) {
    const pInd = pQueue.extractMin()
    const curTask = schedule[pInd][progress[pInd]]
    if (anchor < curTask.start) {
      if (anchor > -Infinity)
        ans.push(new Interval(anchor, curTask.start))
    }
    if (anchor < curTask.end)
      anchor = curTask.end
    ++progress[pInd]
    if (progress[pInd] < schedule[pInd].length) {
      pQueue.insert(pInd)
    }
  }
  return ans
}

console.log(employeeFreeTime(
  [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]].map(xs =>
    xs.map(x => new Interval(x[0], x[1]))
  )
))
