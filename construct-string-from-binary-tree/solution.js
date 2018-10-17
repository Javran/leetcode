/**
 * @param {TreeNode} t
 * @return {string}
 */
const tree2str = t => {
  /*
     idea: we just need to discuss case-by-case,
     there is no need of generalizing this as
     the rules are "biased" in a way that a left-empty-subtree
     and right one has totally different rules.
   */
  /*
     also note that a property of tree2str is that
     the result is '' if and only if the input is null,
     in other words, we know exactly the places where
     parentheses are or aren't necessary.
   */
  if (t === null)
    return ''

  const cur = String(t.val)
  if (t.left === null) {
    if (t.right === null) {
      return cur
    } else {
      return `${cur}()(${tree2str(t.right)})`
    }
  } else {
    // t.left is not null
    if (t.right === null) {
      return `${cur}(${tree2str(t.left)})`
    } else {
      return `${cur}(${tree2str(t.left)})(${tree2str(t.right)})`
    }
  }
}

const {mkTree, cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(tree2str)

f(mkTree([1,2,null]))('1(2)')
f(mkTree([1,null,2]))('1()(2)')
f(mkTree([1,2,3,4]))('1(2(4))(3)')
f(null)('')
f(mkTree([1,2,3,null,4]))('1(2()(4))(3)')
f(mkTree([1,2,3,null,4,5]))('1(2()(4))(3(5))')
