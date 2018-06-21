object Solution {
  def closestValue(root: TreeNode, target: Double): Int = {
    /*
     observation: if we were to perform a BST lookup,
     the min diff must be along the visited roots.
     (because the not-visited branch must be further than root.value)
     */
    var ans = root.value
    var diff = (target - root.value).abs
    def go(root: TreeNode): Unit =
      if (root != null) {
        if (target == root.value) {
          ans = root.value
          diff = 0
          return
        }
        val curDiff = (target - root.value).abs
        if (curDiff < diff) {
          ans = root.value
          diff = curDiff
        }
        if (target < root.value) {
          go(root.left)
        } else {
          go(root.right)
        }
      }
    go(root)
    ans
  }
}
