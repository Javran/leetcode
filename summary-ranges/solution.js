/**
 * @param {number[]} nums
 * @return {string[]}
 */
const summaryRanges = nums => {
  const ranges = []
  let curRange = null
  nums.map(num => {
    if (curRange === null) {
      curRange = [num, num]
    } else
    // curRange is not null
    if (curRange[1] + 1 === num) {
      curRange[1] = num
    } else {
      // need to start a new chunk
      ranges.push(curRange)
      curRange = [num, num]
    }
  })
  if (curRange !== null) {
    ranges.push(curRange)
    curRange = null
  }
  return ranges.map(range =>
    range[0] === range[1] ?
      String(range[0]) :
      `${range[0]}->${range[1]}`
  )
}

console.log(summaryRanges([0,1,2,4,5,7]))
console.log(summaryRanges([0,1,2,4,5,6]))
console.log(summaryRanges([0,2,3,4,6,8,9]))
console.log(summaryRanges([]))
console.log(summaryRanges([1]))
