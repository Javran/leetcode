function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

const mkTree = xs => {
  if (!Array.isArray(xs) || xs.length === 0)
    return null

  const {next, isNothing} = (() => {
    let i = 0
    const nothing = {}
    const isNothing = v => v === nothing
    const next = () => {
      if (i >= xs.length)
        return nothing
      const ret = xs[i]
      ++i
      return ret
    }
    return {next, isNothing}
  })()

  const root = new TreeNode(next())
  let currentLevel = [root]
  let nextLevel = []

  while (currentLevel.length > 0) {
    for (let i = 0; i < currentLevel.length; ++i) {
      const lVal = next()
      if (isNothing(lVal))
        return root
      if (lVal && !isNothing(lVal)) {
        const newNode = new TreeNode(lVal)
        currentLevel[i].left = newNode
        nextLevel.push(newNode)
      }
      const rVal = next()
      if (isNothing(rVal))
        return root
      if (rVal && !isNothing(rVal)) {
        const newNode = new TreeNode(rVal)
        currentLevel[i].right = newNode
        nextLevel.push(newNode)
      }
    }
    currentLevel = nextLevel
    nextLevel = []
  }
  return root
}

const treeToStr = t => {
  if (t === null)
    return "-"
  return `(${treeToStr(t.left)}|${t.val}|${treeToStr(t.right)})`
}

const printTree = t =>
  console.log(treeToStr(t))

const isTreeEqual = (t1, t2) => {
  if (t1 === t2)
    return true
  if (t1 === null || t2 === null)
    return false
  // now we have t1 !== null and t2 !== null
  return t1.val === t2.val &&
    isTreeEqual(t1.left, t2.left) &&
    isTreeEqual(t1.right, t2.right)
}

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
const recoverTree = root => {
  // idea: having two elements swapped in a BST is the same as
  // swapping two elements of a sorted list (think about in-order BST traversal)
  // so what we do is to identify two swapped values
  // and then swap them back
  if (root === null)
    return

  // to ensure O(1) extra space (actually it's O(log n) due to
  // implicit use of stack)
  // we only keep a iterator, which is sufficient for our purpose.
  function *gen(root) {
    if (root) {
      if (root.left)
        yield *gen(root.left)
      yield root
      if (root.right)
        yield *gen(root.right)
    }
  }
  const it = gen(root)
  let nodeL = null
  let nodeR = null
  let prev = it.next()
  // identify the sudden drop in value, which means a element appears
  // at the location it shouldn't be
  for (let cur = it.next(); !cur.done; cur = it.next()) {
    if (cur.value.val < prev.value.val) {
      nodeL = prev.value
      nodeR = cur.value
      break
    }
    prev = cur
  }
  // if everything looks fine, it is the case where two swapped
  // values are the same, swapping them won't have any effect.
  if (nodeL === null)
    return
  // otherwise there is a value to the right of nodeL,
  // which is the minimum value to the right of nodeL
  for (let cur = it.next(); !cur.done; cur = it.next()) {
    if (cur.value.val < nodeR.val) {
      // note that the minimum update can only happen once:
      // as all values is supposed to be larger except the one
      // that was originally placed at nodeL's current position
      nodeR = cur.value
      break
    }
  }
  // swap and done
  const tmp = nodeL.val
  nodeL.val = nodeR.val
  nodeR.val = tmp
}

recoverTree(mkTree([2,4,1,null,null,3]))
