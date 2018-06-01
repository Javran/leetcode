function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
const findTarget = (root, k) => {
  const inOrd = []
  const getInOrd = root => {
    if (root) {
      getInOrd(root.left)
      inOrd.push(root.val)
      getInOrd(root.right)
    }
  }
  getInOrd(root)

  const search = (root, target) => {
    if (root) {
      if (root.val === target) {
        return true
      } if (root.val < target) {
        return search(root.right, target)
      } else {
        // root.val > target
        return search(root.left, target)
      }
    } else {
      return false
    }
  }

  for (let i = 0; i < inOrd.length; ++i) {
    const a = inOrd[i]
    const b = k - a
    // fix a, search b in the tree,
    // we can assume a < b to avoid duplicated effort.
    if (a >= b)
      break
    if (search(root, b)) {
      // now we know a+b = k for a < b
      return true
    }
  }
  return false
}

const n5 = new TreeNode(5)
const n3 = new TreeNode(3)
const n6 = new TreeNode(6)
const n2 = new TreeNode(2)
const n4 = new TreeNode(4)
const n7 = new TreeNode(7)
n5.left = n3
n5.right = n6
n3.left = n2
n3.right = n4
n6.right = n7

console.assert(findTarget(n5, 9) === true)
console.assert(findTarget(n5, 28) === false)
console.assert(findTarget(n5, 13) === true)
console.assert(findTarget(n5, 14) === false)
