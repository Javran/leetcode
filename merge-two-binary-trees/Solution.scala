/**
 * Definition for a binary tree node.
 * class TreeNode(var _value: Int) {
 *   var value: Int = _value
 *   var left: TreeNode = null
 *   var right: TreeNode = null
 * }
 */
object Solution {
  // pattern matching FTW.
  def mergeTrees(t1: TreeNode, t2: TreeNode): TreeNode = (t1, t2) match {
    case (null, _) => t2
    case (_, null) => t1
    case (_, _) =>
      // well, if we can somehow reduce the "noise", this could be great.
      val (v1,l1,r1) = (t1.value, t1.left, t1.right)
      val (v2,l2,r2) = (t2.value, t2.left, t2.right)
      val node = new TreeNode(v1+v2)
      node.left = mergeTrees(l1,l2)
      node.right = mergeTrees(r1,r2)
      node
  }
}
