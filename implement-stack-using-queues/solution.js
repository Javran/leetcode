/*
   idea:

   we will use an approach that utilizes two queues:

   - the data structure holds one queue, while
     we would need another queue in the middle of some operations.

   - pushing new element to this structure is as simple as just pushing the element to the back
   - popping is a bit tricky, because we need to reveal the very first element that
     we have pushed to this structure.
     in order to achieve this, we use a temporary queue to hold elements
     that has been popped from front, as queue is a FIFO structure, the element order
     is preserved this way.
   - similar business for `top` operation, but this time we'll need to
     preserve that element instead of removing it from the structure.

 */

/**
 * Initialize your data structure here.
 */
const MyStack = function() {
  this.queue = []
}

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
  this.queue.push(x)
  return
}

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
  const tmp = []
  if (this.queue.length === 0)
    throw "popping an empty structure"
  while (this.queue.length > 1) {
    tmp.push(this.queue.shift())
  }
  const ret = this.queue[0]
  this.queue = tmp
  return ret
}

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
  const tmp = []
  if (this.queue.length === 0)
    throw "peeking top of an empty structure"
  while (this.queue.length > 1) {
    tmp.push(this.queue.shift())
  }
  const ret = this.queue[0]
  this.queue = tmp
  tmp.push(ret)
  return ret
}

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return this.queue.length === 0
}
