/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
const anagramMappings = (A, B) => {
  // if A and B are guaranteed to be anagrams,
  // we are sure sorted A and sorted B are exactly the same
  // by keeping track of element indices before sorting,
  // we should be able to establish a mapping in any direction
  const mkInd = (x, ind) => ({x, ind})
  const aWithInd = A.map(mkInd)
  const bWithInd = B.map(mkInd)
  const cmp = (u, v) => u.x - v.x
  aWithInd.sort(cmp)
  bWithInd.sort(cmp)
  const xs = new Array(A.length)
  for (let i = 0; i < A.length; ++i)
    xs[ aWithInd[i].ind ] = bWithInd[i].ind

  return xs
}

console.log(anagramMappings([12, 28, 46, 32, 50], [50, 12, 32, 46, 28]))
