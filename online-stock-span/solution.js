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
  let cur = this.size
  while (cur - 1 >= 0 && this.prices[cur-1] <= price) {
    cur = cur - this.jumps[cur-1]
  }
  this.prices[this.size] = price
  const ans = this.size - cur + 1
  this.jumps[this.size] = ans
  ++this.size
  return ans
}
