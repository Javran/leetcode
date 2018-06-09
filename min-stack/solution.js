/*
   I'm sure the difficulty is in get O(1) time complexity
   for min(), as a naive approach will try to search the whole
   stack to find one.
   But here note that a stack can only insert or remove from one end
   which means this info is available by just looking at current min
   and the value we are inserting. And if we keep current min
   at every element of the stack, we should be able to figure this out
   all the time.
 */

/**
 * initialize your data structure here.
 */
const MinStack = function() {
  this.stack = []
}

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(val) {
  if (this.stack.length === 0) {
    this.stack = [{val, min: val}]
  } else {
    const min = Math.min(this.stack[this.stack.length-1].min, val)
    this.stack.push({val, min})
  }
}

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  this.stack.pop()
}

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  if (this.stack.length === 0) {
    return undefined
  } else {
    return this.stack[this.stack.length-1].val
  }
}

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  if (this.stack.length === 0) {
    return undefined
  } else {
    return this.stack[this.stack.length-1].min
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = Object.create(MinStack).createNew()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
