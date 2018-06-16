function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const preOrderK = (root, fk, cont) => {
  root ?
    preOrderK(root.left, fk, () =>
      fk(root, () =>
        preOrderK(root.right, fk, cont)
      )
    ) :
  cont()
}

/**
 * @constructor
 * @param {TreeNode} root - root of the binary search tree
 */
const BSTIterator = function(root) {
  this.supply = false
  preOrderK(
    root,
    (node, k) => {
      this.nowVal = this.nextVal
      this.nextVal = node.val
      this.supply = true
      this.nextK = k
    },
    () => {
      this.nowVal = this.nextVal
      delete this.nextVal
      this.supply = false
      delete this.nextK
    }
  )
}

/**
 * @this BSTIterator
 * @returns {boolean} - whether we have a next smallest number
 */
BSTIterator.prototype.hasNext = function() {
  return this.supply
}

/**
 * @this BSTIterator
 * @returns {number} - the next smallest number
 */
BSTIterator.prototype.next = function() {
  this.nextK()
  return this.nowVal
}

/**
 * Your BSTIterator will be called like this:
 * var i = new BSTIterator(root), a = [];
 * while (i.hasNext()) a.push(i.next());
*/
