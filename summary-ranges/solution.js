/**
 * @param {number[]} nums
 * @return {string[]}
 */
const summaryRanges = nums => {
  /*
     a linear scan should do the job.
     we need "curRange" to keep track of current range
     that we are building, and we expand its end whenever possible,
     or start a new curRange otherwise
   */
  const ranges = []
  let curRange = null

  const recordResult = () => {
    const str = curRange[0] === curRange[1] ?
      String(curRange[0]) :
      `${curRange[0]}->${curRange[1]}`
    ranges.push(str)
    curRange = null
  }

  nums.map(num => {
    if (curRange === null) {
      curRange = [num, num]
    } else
    // curRange is not null
    if (curRange[1] + 1 === num) {
      curRange[1] = num
    } else {
      // need to start a new chunk
      recordResult()
      curRange = [num, num]
    }
  })
  if (curRange !== null) {
    recordResult()
  }
  return ranges
}

console.log(summaryRanges([0,1,2,4,5,7]))
console.log(summaryRanges([0,1,2,4,5,6]))
console.log(summaryRanges([0,2,3,4,6,8,9]))
console.log(summaryRanges([]))
console.log(summaryRanges([1]))
