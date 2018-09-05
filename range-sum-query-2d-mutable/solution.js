/*
   idea:

   https://leetcode.com/problems/range-sum-query-2d-mutable/discuss/75870/Java-2D-Binary-Indexed-Tree-Solution-clean-and-short-17ms

   perhaps a chance to learn "Binary Indexed Tree".

   the mysterious i & (-i) extracts the least significant part from i:

   - 0 => 0
   - 0b101010 => 0b10
   - 0b111 => 0b1
   - 0b1010000 => 0b10000

 */

/**
 * @param {number[][]} matrix
 */
const NumMatrix = function(matrix) {
  const rows = matrix.length
  if (rows === 0) {
    this.empty = true
    return
  }
  const cols = matrix[0].length
  if (cols === 0) {
    this.empty = true
    return
  }
  this.rows = rows
  this.cols = cols
  this.empty = false
  this.tree = new Array(rows+1)
  for (let i = 0; i < this.tree.length; ++i) {
    this.tree[i] = new Array(cols+1).fill(0)
  }
  this.nums = new Array(rows)
  for (let i = 0; i < rows; ++i) {
    this.nums[i] = new Array(cols).fill(0)
  }
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      this.update(i,j, matrix[i][j])
    }
  }
}

/**
 * @param {number} row
 * @param {number} col
 * @param {number} val
 * @return {void}
 */
NumMatrix.prototype.update = function(row, col, val) {
  if (this.empty)
    return
  const {rows, cols, tree, nums} = this
  const diff = val - nums[row][col]
  nums[row][col] = val
  for (let i = row+1; i <= rows; i += i & (-i)) {
    for (let j = col+1; j <= cols; j += j & (-j)) {
      tree[i][j] += diff
    }
  }
}

NumMatrix.prototype.sum = function(row, col) {
  if (this.empty)
    return 0
  const {tree} = this
  let ret = 0
  for (let i = row; i > 0; i -= i & (-i)) {
    for (let j = col; j > 0; j -= j & (-j)) {
      ret += tree[i][j]
    }
  }
  return ret
}

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
  if (this.empty)
    return 0

  return this.sum(row2+1, col2+1) +
    this.sum(row1,col1) -
    this.sum(row1,col2+1) -
    this.sum(row2+1,col1)
}

const {cTestImpl} = require('leetcode-zwischenzug')
const f = cTestImpl(NumMatrix)

f(
  ["NumMatrix","sumRegion","update","sumRegion"],
  [[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]],[2,1,4,3],[3,2,2],[2,1,4,3]]
)([null,8,null,10])
