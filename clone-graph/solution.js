/**
 * Definition for undirected graph.
 * function UndirectedGraphNode(label) {
 *     this.label = label;
 *     this.neighbors = [];   // Array of UndirectedGraphNode
 * }
 */

/**
 * @param {UndirectedGraphNode} graph
 * @return {UndirectedGraphNode}
 */
const cloneGraph = graph => {
  if (!graph)
    return graph

  const newMap = new Map()
  const dfs = node => {
    if (!newMap.has(node.label)) {
      const newNode = new UndirectedGraphNode(node.label)
      // shallow copy
      newNode.neighbors = node.neighbors.slice()
      newMap.set(node.label, newNode)
      node.neighbors.forEach(dfs)
    }
  }
  // first pass, shallow copy
  dfs(graph)
  // second pass, redirect old nodes to their corresponding new ones
  newMap.forEach((node, k) => {
    for (let i = 0; i < node.neighbors.length; ++i) {
      const label = node.neighbors[i].label
      node.neighbors[i] = newMap.get(label)
    }
  })
  return newMap.get(graph.label)
}
