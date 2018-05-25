/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/*
   encoding: let's invent a stack-based binary tree building language:

   - <num>: push a number to the stack
   - N: pop a number from the stack, and create a node without any child, push the created node back
   - L: pop a node l, and a number n from the stack, create a node whose value is n and
     it has a single left child l, push the created node back
   - R: same as l but on right side
   - B: pop a node r, a node l, a number n, create a node, push it back

   note that this language can only describe a non-empty tree,
   for the completeness of the language, an empty string stands for an empty tree.

 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
const serialize = root => {
  const encoded = []
  const e = v => encoded.push(v)
  const encode = root => {
    if (root === null)
      return
    if (root.left === null && root.right === null) {
      e(root.val)
      e('N')
    } else if (root.left && root.right === null) {
      e(root.val)
      encode(root.left)
      e('L')
    } else if (root.left === null && root.right) {
      e(root.val)
      encode(root.right)
      e('R')
    } else {
      // root.left && root.right
      e(root.val)
      encode(root.left)
      encode(root.right)
      e('B')
    }
  }

  encode(root)
  return encoded.join(',')
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
const deserialize = data => {
  if (data === "")
    return null

  const stack = []
  const push = v => stack.push(v)
  const pop = () => stack.pop()

  data.split(',').map(op => {
    if (op === 'N') {
      const n = pop()
      push(new TreeNode(n))
    } else if (op === 'L') {
      const l = pop()
      const n = pop()
      const node = new TreeNode(n)
      node.left = l
      push(node)
    } else if (op === 'R') {
      const r = pop()
      const n = pop()
      const node = new TreeNode(n)
      node.right = r
      push(node)
    } else if (op === 'B') {
      const r = pop()
      const l = pop()
      const n = pop()
      const node = new TreeNode(n)
      node.left = l
      node.right = r
      push(node)
    } else {
      const v = Number(op)
      push(v)
    }
  })

  return pop()
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

const n1 = new TreeNode(1)
const n2 = new TreeNode(2)
const n3 = new TreeNode(3)
const n4 = new TreeNode(4)
const n5 = new TreeNode(5)

n1.left = n2
n1.right = n4
n2.left = n3
n4.right = n5

console.log(serialize(n1))
console.log(serialize(deserialize(serialize(n1))))
