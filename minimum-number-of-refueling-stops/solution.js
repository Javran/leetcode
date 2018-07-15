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
 * @param {number} target
 * @param {number} startFuel
 * @param {number[][]} stations
 * @return {number}
 */
const minRefuelStops = (target, startFuel, stations) => {
  let cur = startFuel
  let count = 0
  let beginInd = 0
  const pq = new BinHeap(x => -x)
  pq.container = new Int32Array(stations.length)
  while (cur < target) {
    /*
       key observation: we can travel as far as we want without refueling.
       but we can still take into account gas stations along the way
       by simply its gas value on top of our current position as if we
       have been refuelled there.
     */
    while (beginInd < stations.length && stations[beginInd][0] <= cur) {
      pq.insert(stations[beginInd][1])
      ++beginInd
    }
    if (cur >= target || pq.size === 0)
      break
    // we may as well "jump" as far as we want,
    // this is beneficial as it allows us to take into account more gas stations along the way
    // we go further.
    cur += pq.extractMin(), ++count
  }
  return cur >= target ? count : -1
}

console.log(minRefuelStops(100, 10, [[10,60],[20,30],[30,30],[60,40]]))
