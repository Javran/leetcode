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

printTree(mkTree([]))
printTree(mkTree([1,2,3]))
printTree(mkTree([1,null,2,3]))
printTree(mkTree([5,4,7,3,null,2,null,-1,null,9]))

console.assert(isTreeEqual(
  mkTree([5,4,7,3,null,2,null,-1,null,9]),
  mkTree([5,4,7,3,null,2,null,-1,null,9,null])
))

console.assert(!isTreeEqual(
  mkTree([5,4,7,3,null,2,null,-1,null,9]),
  mkTree([5,4,6,3,null,2,null,-1,null,9])
))
