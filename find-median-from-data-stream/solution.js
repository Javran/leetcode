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

BinHeap.prototype.getMin = function() {
  if (this.size === 0)
    return null
  return this.container[0]
}

/**
 * initialize your data structure here.
 */
const MedianFinder = function() {
  /*
     max heap on left, min heap on right.

     so:
     - this.leftPart.getMin() is actually the max val
     - this.rightPart.getMin() is the min val

     INVARIANT:

     - 0 <= this.leftPart.size - this.rightPart.size <= 1
       (in other words, leftPart and rightPart is kept balanced
       most of the time with bias to leftPart)
     - this.leftPart.getMin() <= this.rightPart.getMin()

     these invariant helps us to always keep track of
     the middle two elements of the list.

   */
  this.leftPart = new BinHeap(x => -x)
  this.rightPart = new BinHeap(x => x)
}

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  if (this.leftPart.size <= this.rightPart.size) {
    // insert to leftPart
    this.leftPart.insert(num)
    if (this.rightPart.size > 0 && this.leftPart.getMin() > this.rightPart.getMin()) {
      /*
         when invariant is violated, we can fix it simply by swaping top elements
         of both heaps.
         the observation is that the only value causing the invariant violation must
         be the newly inserted one on top of either heap, if we move it
         to the other heap, the invariant will be restored.
       */
      const a = this.leftPart.extractMin()
      const b = this.rightPart.extractMin()
      this.leftPart.insert(b)
      this.rightPart.insert(a)
    }
  } else {
    // insert to rightPart
    // symmetric case
    this.rightPart.insert(num)
    if (this.leftPart.size > 0 && this.leftPart.getMin() > this.rightPart.getMin()) {
      const a = this.leftPart.extractMin()
      const b = this.rightPart.extractMin()
      this.leftPart.insert(b)
      this.rightPart.insert(a)
    }
  }
}

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  if (this.leftPart.size > this.rightPart.size) {
    return this.leftPart.getMin()
  } else {
    return (this.leftPart.getMin() + this.rightPart.getMin()) / 2
  }
}
