/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const subtreeWithAllDeepest = root => {
  if (root === null)
    return null
  const parallel = []
  // attach parent to allow tracing back
  const go = (root, dep, parent = null) => {
    if (root) {
      if (parent)
        root.parent = parent
      if (!parallel[dep]) {
        parallel[dep] = [root]
      } else {
        parallel[dep].push(root)
      }
      go(root.left, dep+1, root)
      go(root.right, dep+1, root)
    }
  }
  go(root, 0, null)

  // simultaneously tracing back until met
  let cur = new Set(parallel[parallel.length-1])
  while (cur.size > 1) {
    const next = new Set()
    cur.forEach(s => {
      if (s.parent)
        next.add(s.parent)
    })
    cur = next
  }
  return [...cur][0]
}
