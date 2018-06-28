/**
 * Initialize your data structure here.
 * @param {number} size
 */
const MovingAverage = function(size) {
  this.maxSize = size
  this.arr = []
}

/**
 * @param {number} val
 * @return {number}
 */
MovingAverage.prototype.next = function(val) {
  this.arr.push(val)
  if (this.arr.length > this.maxSize) {
    this.arr.shift()
  }
  return this.arr.reduce((x,y) => x+y, 0) / this.arr.length
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
