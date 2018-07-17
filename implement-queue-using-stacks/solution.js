/**
 * Initialize your data structure here.
 */
const MyQueue = function() {
  /*
     stack is FILO while queue is FIFO,
     so it's unlikely that we do this with one stack, try two and it works nicely:
     whenever we require to pop from the queue, we check "outSt":
     - if it contains a value, pop it
     - if not, drain "inSt" so element is inserted into "outSt" in reversed order,
       which effectively implements the FIFO requirement.
   */
  this.inSt = []
  this.outSt = []
}

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  this.inSt.push(x)
  return
}

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  if (this.outSt.length === 0) {
    while (this.inSt.length !== 0) {
      const v = this.inSt.pop()
      this.outSt.push(v)
    }
  }
  return this.outSt.pop()
}

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  if (this.outSt.length === 0) {
    while (this.inSt.length !== 0) {
      const v = this.inSt.pop()
      this.outSt.push(v)
    }
  }
  return this.outSt[this.outSt.length-1]
}

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  return this.inSt.length === 0 && this.outSt.length === 0
}
