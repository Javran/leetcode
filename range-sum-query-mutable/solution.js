function SegNode(l,r) {
  this.bound = [l,r]
  this.left = this.right = null
}

const build = (xs, lInd, rInd) => {
  if (lInd > rInd)
    return null
  const node = new SegNode(lInd, rInd)
  const midInd = (lInd+rInd) >> 1
  if (lInd === rInd) {
    node.sum = xs[lInd]
    return node
  }
  let sum = 0
  if (lInd <= midInd) {
    node.left = build(xs, lInd, midInd)
    sum += node.left.sum
  }
  if (midInd+1 <= rInd) {
    node.right = build(xs, midInd+1, rInd)
    sum += node.right.sum
  }
  node.sum = sum
  return node
}

const update = (st, ind, val) => {
  const [l,r] = st.bound
  if (l === r) {
    st.sum = val
    return
  }
  const midInd = (l+r) >> 1
  if (ind <= midInd) {
    const oldSum = st.left.sum
    update(st.left, ind, val)
    st.sum += st.left.sum - oldSum
  } else {
    const oldSum = st.right.sum
    update(st.right, ind, val)
    st.sum += st.right.sum - oldSum
  }
}

const getSum = (st, qL, qR) => {
  const [l, r] = st.bound
  if (l === qL && r === qR)
    return st.sum
  const midInd = (l + r) >> 1
  if (qR <= midInd) {
    return getSum(st.left, qL, qR)
  } else if (midInd+1 <= qL) {
    return getSum(st.right, qL, qR)
  }
  return getSum(st.left, qL, midInd) + getSum(st.right, midInd+1, qR)
}

/**
 * @param {number[]} nums
 */
const NumArray = function(nums) {
  this.segTree = build(nums, 0, nums.length-1)
}

/**
 * @param {number} i
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function(i, val) {
  update(this.segTree, i, val)
}

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
  return getSum(this.segTree, i, j)
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = Object.create(NumArray).createNew(nums)
 * obj.update(i,val)
 * var param_2 = obj.sumRange(i,j)
 */

const xs = [1,9,2,8,5,7,4,5,6]
const t = build(xs, 0, xs.length-1)

const ppr = root => {
  if (root) {
    const pL = ppr(root.left)
    const pR = ppr(root.right)
    return `(seg:${root.bound[0]}-${root.bound[1]}, sum:${root.sum} ${pL} ${pR})`
  } else {
    return "nil"
  }
}

console.log(ppr(t))
update(t, 5, 100)
console.log(ppr(t))
console.log(getSum(t, 3, 5))
