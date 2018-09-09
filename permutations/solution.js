function Node(num) {
  this.num = num
  this.prev = null
  this.next = null
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = nums => {
  /*
     idea: dancing links ftw
   */
  const dl = new Node(null)
  dl.prev = dl
  dl.next = dl
  for (let i = 0; i < nums.length; ++i) {
    const node = new Node(nums[i])
    node.next = dl
    node.prev = dl.prev
    node.next.prev = node
    node.prev.next = node
  }
  const ans = []
  const curList = []
  const search = dep => {
    if (dep === nums.length) {
      ans.push(curList.slice())
      return
    }
    for (let cur = dl.next; cur !== dl; cur = cur.next) {
      curList[dep] = cur.numn
      cur.prev.next = cur.next
      cur.next.prev = cur.prev
      search(dep+1)
      cur.prev.next = cur
      cur.next.prev = cur
    }
  }
  search(0)
  return ans
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(permute)
f([1,2,3,4,5])()
