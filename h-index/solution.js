/**
 * @param {number[]} citations
 * @return {number}
 */
const hIndex = cs => {
  /*
     the description makes no sense and a lack of example makes this problem the most
     confusing and incomprehensive one at all time.
   */
  /*
     idea: from the description we know that we want to find some sort of cutting point
     for a descending list of citations, so we just as well sort it in desc.

     then we want to find h, such that:

     - cs[i] >= h where 0 <= i < h
     - cs[i] <= h where h <= i < cs.length

     since we've sorted cs, this can be simplified to:

     - h < 1 || cs[h-1] >= h ===> h === 0 || cs[h-1] >= h
     - cs[h] <= h
   */
  cs.sort((x,y) => y-x)
  // eliminate cases where h === 0
  if (cs.length === 0 || cs[0] === 0)
    return 0
  // now we just need to find cs[h-1] >= h >= cs[h]
  for (let h = 1; h < cs.length; ++h)
    if (cs[h-1] >= h && h >= cs[h])
      return h
  return cs.length
}

console.assert(hIndex([11, 15]) === 2)
console.assert(hIndex([1]) === 1)
console.assert(hIndex([3,0,6,1,5]) === 3)
console.assert(hIndex([1,2,3,4,5,5,6,6,6,7]) === 5)
