/**
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive = nums => {
  if (nums.length <= 1)
    return nums.length
  /*
     a disjoint set should serve the purpose well:
     when inserting i, we try to connect i-1,i and i,i+1 given that
     either i-1 or i+1 is already established.
     by doing so we keep the set of all consecutive ranges,
     which allows us to pick one up from there.

     However the real time complexity is O(n log n) due to the use of Map.
     not sure whether we have better ways.
   */
  const disjointSets = new Map()
  const allRoots = new Set()
  const find = node => {
    if (node.parent !== node)
      node.parent = find(node.parent)
    return node.parent
  }
  const union = (x,y) => {
    let xRoot = find(x)
    let yRoot = find(y)
    if (xRoot === yRoot)
      return
    if (xRoot.size < yRoot.size) {
      const tmp = xRoot
      xRoot = yRoot
      yRoot = tmp
    }
    allRoots.delete(yRoot)
    yRoot.parent = xRoot
    xRoot.size += yRoot.size
  }
  nums.forEach(num => {
    if (disjointSets.has(num))
      return
    const node = {size: 1}
    node.parent = node
    allRoots.add(node)
    disjointSets.set(num, node)
    if (disjointSets.has(num-1)) {
      union(node, disjointSets.get(num-1))
    }
    if (disjointSets.has(num+1)) {
      union(node, disjointSets.get(num+1))
    }
  })
  let max = null
  for (const x of allRoots) {
    console.log(x)
    if (max === null || x.size > max)
      max = x.size
  }
  return max
}

console.log(longestConsecutive([100, 4, 200, 1, 3, 2]))
console.log(longestConsecutive([0,0,1,-1]))
