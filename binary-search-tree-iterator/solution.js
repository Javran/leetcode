function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

// continuation passing preorder traversal.
// which allows us to suspend in the middle of a traversal
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
  // indicator of whether next value exists
  // (for implementing hasNext)
  this.supply = false
  preOrderK(
    root,
    (node, k) => {
      // visit current node
      // value first goes to nextVal then nowVal, so the traversal is
      // always one step ahead (this is to allow hasNext)
      this.nowVal = this.nextVal
      this.nextVal = node.val
      this.supply = true
      // suspend traversal instead of executing right away
      this.nextK = k
    },
    () => {
      // shift supply as always, but now traversal is over.
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
