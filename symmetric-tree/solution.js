// I'm happy with recursive approach, not going to try do this iteratively

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isSymmetric = root => {
  // while it's tricky to find whether facts about smaller symmetric is useful
  // when dealing with larger ones, we know how to test whether
  // two tree are mirrors of each other.
  // then a symmetric tree is just a tree whose mirror is itself.
  const isSymmetricAux = (l, r) => {
    if (l === null && r === null)
      return true
    if (l && r) {
      return l.val === r.val &&
        isSymmetricAux(l.left, r.right) &&
        isSymmetricAux(l.right, r.left)
    } else {
      return false
    }
  }
  return isSymmetricAux(root, root)
}

console.assert(isSymmetric(null) === true)
console.assert(isSymmetric(new TreeNode(10)) === true)

const n1 = new TreeNode(1)
const n2 = new TreeNode(1)
const n3 = new TreeNode(1)
const n4 = new TreeNode(1)
const n5 = new TreeNode(1)
n1.left = n2
console.assert(isSymmetric(n1) === false)
n1.right = n3
console.assert(isSymmetric(n1) === true)
n2.left = n4
console.assert(isSymmetric(n1) === false)
n3.right = n5
console.assert(isSymmetric(n1) === true)
n3.val = 3
console.assert(isSymmetric(n1) === false)
n3.val = 1
console.assert(isSymmetric(n1) === true)
