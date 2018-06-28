/**
 * Initialize your data structure here.
 * @param {number} size
 */
const MovingAverage = function(size) {
  this.maxSize = size
  this.arr = []
  // keeping track of current sum allows us to avoid redundant computations
  this.curSum = 0
}

/**
 * @param {number} val
 * @return {number}
 */
MovingAverage.prototype.next = function(val) {
  this.arr.push(val)
  this.curSum += val
  if (this.arr.length > this.maxSize) {
    const oldV = this.arr.shift()
    this.curSum -= oldV
  }
  return this.curSum / this.arr.length
}

/**
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = Object.create(MovingAverage).createNew(size)
 * var param_1 = obj.next(val)
 */
const obj = new MovingAverage(3);
[1,10,3,5,6].forEach(v => {
  console.log(obj.next(v))
})
