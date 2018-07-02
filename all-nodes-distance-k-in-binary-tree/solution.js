/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} K
 * @return {number[]}
 */
const distanceK = function(root, target, K) {
  // first step: turn this tree into a graph by attaching parent
  // to all nodes
  const nodeMap = []
  const setParent = (root, refPar) => {
    if (root) {
      nodeMap[root.val] = root
      root.parent = refPar
      setParent(root.left, root)
      setParent(root.right, root)
    }
  }
  setParent(root, null)
  // second step: non-deterministically while avoid taking the way back
  let targets = [{node: target, frm: null}]
  const next = (info, resultList) => {
    const {node, frm} = info
    if (node.left && node.left !== frm) {
      resultList.push({node: node.left, frm: node})
    }
    if (node.right && node.right !== frm) {
      resultList.push({node: node.right, frm: node})
    }
    if (node.parent && node.parent !== frm) {
      resultList.push({node: node.parent, frm: node})
    }
  }
  for (let i = 1; i <= K; ++i) {
    const nextTargets = []
    targets.forEach(t => next(t, nextTargets))
    targets = nextTargets
  }
  return targets.map(t => t.node.val)
}
