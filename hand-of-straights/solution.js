/**
 * @param {number[]} hand
 * @param {number} W
 * @return {boolean}
 */
const isNStraightHand = (hs, W) => {
  // only possible when the amount is right
  if (hs.length % W !== 0)
    return false
  /*
     the key observation: every card has to be used,
     which means if we sort the hand of cards,
     and try to form as mush group as we can from one side,
     we should be able to tell.
   */
  hs.sort((x,y) => x-y)
  // count running length
  const runLens = []
  let cur = null
  hs.forEach(h => {
    if (cur === null || cur.val !== h) {
      if (cur !== null)
        runLens.push(cur)
      cur = {val: h, count: 1}
    } else {
      ++cur.count
    }
  })
  if (cur !== null)
    runLens.push(cur)

  // try to put cards into groups
  for (let i = 0; i < runLens.length; ++i) {
    // head value
    const {val: hdVal, count: hdCount} = runLens[i]
    if (hdCount === 0)
      continue
    // now we try to form hdCount groups
    if (i+W-1 >= runLens.length)
      // insufficient distinct values
      return false
    for (let offset = 1; offset < W; ++offset) {
      const curRL = runLens[i+offset]
      if (
        // value has to match (consecutive from hdVal)
        (curRL.val !== hdVal+offset) ||
        // has sufficient amount of cards
        (curRL.count < hdCount)
      )
        return false
      curRL.count -= hdCount
    }
  }
  return true
}

console.log(isNStraightHand([1,2,6,3,6,7,8,2,3,4,7,8], 3))
