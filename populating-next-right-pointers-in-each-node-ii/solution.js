/**
 * Definition for binary tree with next pointer.
 * function TreeLinkNode(val) {
 *     this.val = val;
 *     this.left = this.right = this.next = null;
 * }
 */

/**
 * @param {TreeLinkNode} root
 * @return {void} Do not return anything, modify tree in-place instead.
 */
const connect = root => {
  // go connects between immediate children,
  // and returns rightmost element in each level
  const go = root => {
    if (root) {
      const ls = go(root.left)
      const rs = go(root.right)
      const sz = Math.max(ls ? ls.length : 0, rs ? rs.length : 0)
      // a zip to handle each situation
      const ret = new Array(sz+1)
      for (let i = 0; i < sz; ++i) {
        const l = ls ? ls[i] : null, r = rs ? rs[i] : null
        if (l && r) {
          l.next = r
          ret[i+1] = r
        } else if (l && !r) {
          // note that once r is empty, all following values
          // of rs must be falsy, so here we can short circuit a bit
          for (/* NOOP */; i < sz; ++i)
            ret[i+1] = ls[i]
          break
        } else if (!l && r) {
          for (/* NOOP */; i < sz; ++i)
            ret[i+1] = rs[i]
          break
        } else {
          // this part should actually be unreachable
          // because the size of the array is the max of two
          throw "unreachable"
        }
      }
      // finally adding first node
      ret[0] = root
      return ret
    } else {
      return null
    }
  }
  const after = go(root)
  // we have not yet connected all rightmost nodes to null.
  after && after.forEach(x => {
    if (x)
      x.next = null
  })
}
