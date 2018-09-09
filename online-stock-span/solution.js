const StockSpanner = function() {
  this.prices = []
  this.jumps = []
  this.size = 0
}

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function(price) {
  /*
     idea: the span might extend when next arriving price
     is higher than previous one, but as long as we know
     how to jump back to skip some numbers that are definitely smaller,
     we can compute the result efficiently.
     it happens that all past results are useful just for this purpose.
   */

  // cur is the index of leftmost index of the span window
  let cur = this.size
  // try jumping back
  while (cur - 1 >= 0 && this.prices[cur-1] <= price) {
    // skip known gap
    cur = cur - this.jumps[cur-1]
  }
  this.prices[this.size] = price
  const ans = this.size - cur + 1
  this.jumps[this.size] = ans
  ++this.size
  return ans
}
