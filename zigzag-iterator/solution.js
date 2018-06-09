/**
 * @constructor
 * @param {Integer[]} v1
 * @param {Integer[]} v1
 */
const ZigzagIterator = function ZigzagIterator(v1, v2) {
  /*

     just implementing "interleave" function. like merging step in a merge sort.

   */
  this.v1 = v1
  this.v2 = v2
  this.focus = 0
  this.ind1 = 0
  this.ind2 = 0
}

/**
 * @this ZigzagIterator
 * @returns {boolean}
 */
ZigzagIterator.prototype.hasNext = function hasNext() {
  // hasNext iff. there are elements not yet visited
  return this.ind1 < this.v1.length || this.ind2 < this.v2.length
}

/**
 * @this ZigzagIterator
 * @returns {integer}
 */
ZigzagIterator.prototype.next = function next() {
  // focus always alternates. but as sometimes v1 or v2 becomes
  // empty, there could be no element consumption after a focus switch
  if (this.focus === 0) {
    if (this.ind1 < this.v1.length) {
      const ret = this.v1[this.ind1]
      ++this.ind1
      this.focus = 1 - this.focus
      return ret
    } else {
      this.focus = 1
      return this.next()
    }
  } else {
    if (this.ind2 < this.v2.length) {
      const ret = this.v2[this.ind2]
      ++this.ind2
      this.focus = 1 - this.focus
      return ret
    } else {
      this.focus = 0
      return this.next()
    }
  }
}

/**
 * Your ZigzagIterator will be called like this:
 * var i = new ZigzagIterator(v1, v2), a = [];
 * while (i.hasNext()) a.push(i.next());
*/
