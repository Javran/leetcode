/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
const {Interval, consoleTest} = require('leetcode-zwischenzug')

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
 * @param {Interval[]} intervals
 * @return {number}
 */
const minMeetingRooms = itvs => {
  // sort by start time, don't worry about end time though,
  // they don't matter.
  itvs.sort((x,y) => x.start - y.start)
  let ans = 0
  // lazy container of all meetings we are holding.
  const rooms = new BinHeap(x => x.end)
  itvs.forEach(itv => {
    while (rooms.size > 0 && rooms.container[0].end <= itv.start) {
      rooms.extractMin()
    }
    rooms.insert(itv)
    if (rooms.size > ans)
      ans = rooms.size
  })
  return ans
}

const f = consoleTest(minMeetingRooms)
const mkItvs = xs => xs.map(([x,y]) => new Interval(x,y))

f(mkItvs([[1,2],[2,3]]))(1)
f(mkItvs([[0, 30],[5, 10],[15, 20]]))(2)
f(mkItvs([[7,10],[2,4]]))(1)
