/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @param {string[][]} pairs
 * @return {boolean}
 */
const areSentencesSimilar = (words1, words2, pairs) => {
  if (words1.length !== words2.length)
    return false
  const n = words1.length
  // record similar words
  const simMap = new Map()
  pairs.forEach(([u,v]) => {
    if (!simMap.has(u))
      simMap.set(u, new Set())
    if (!simMap.has(v))
      simMap.set(v, new Set())
    simMap.get(u).add(v)
    simMap.get(v).add(u)
  })
  for (let i = 0; i < n; ++i) {
    const w1 = words1[i], w2 = words2[i]
    if (!(
      w1 === w2 ||
      (simMap.has(w1) && simMap.get(w1).has(w2))
    ))
      return false
  }
  return true
}
