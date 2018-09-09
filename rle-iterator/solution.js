/**
 * @param {number[]} A
 */
const RLEIterator = function(A) {
  this.xs = A
  this.ind = 0
  this.invariant()
}

/*
   idea: the tricky part is how to skip values with 0 count,
   we make sure this by calling invariant() below.
 */
RLEIterator.prototype.invariant = function() {
  if (this.ind >= this.xs.length)
    return

  let count = this.xs[this.ind]
  let num = this.xs[this.ind+1]
  while (count <= 0 && this.ind < this.xs.length) {
    this.ind += 2
    count = this.xs[this.ind]
    num = this.xs[this.ind+1]
  }
}

/**
 * @param {number} n
 * @return {number}
 */
RLEIterator.prototype.next = function(n) {
  let last = -1
  // as calling "invariant()" will maintain the invariant that
  // first count is always positive, we can safely extract the value.
  while (n > 0) {
    if (this.ind >= this.xs.length)
      return -1
    const count = this.xs[this.ind]
    const num = this.xs[this.ind+1]
    last = num
    if (n >= count) {
      n -= count
      this.ind += 2
      this.invariant()
    } else {
      // n < count
      this.xs[this.ind] = count - n
      n = 0
    }
  }
  return last
}
