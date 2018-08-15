
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
