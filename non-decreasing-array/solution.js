/**
 * @param {number[]} nums
 * @return {boolean}
 */
const checkPossibility = nums => {
  /*
     this "modify at most 1 element" is really complicating things a lot:

     - if the Array is already non-decreasing, easy peasy.
     - otherwise, for violation a[i-1] > a[i],
       we could do two things:

       - modify a[i-1]
       - modify a[i]

       we could try to figure out the place and the value,
       which would be efficient but complicated,
       but we could also just use the simplest, stupid solution:
       remove that value and see if the rest of the sequence is non-decreasing.
       doing removal instead of modifying just simplifies the problem
       because we can always duplicate a value from a neighboring element
       to create a non-decreasing sequence (given if it is possible at all)

   */
  const checkViolates = xs => {
    for (let i = 1; i < xs.length; ++i)
      if (xs[i-1] > xs[i])
        return i
    return null
  }
  const check1 = checkViolates(nums)
  if (check1 === null)
    return true
  const xs1 = nums.slice(0,check1-1).concat(nums.slice(check1))
  const check2 = checkViolates(xs1)
  if (check2 === null)
    return true
  const xs2 = nums.slice(0,check1).concat(nums.slice(check1+1))
  return checkViolates(xs2) === null
}

console.assert(checkPossibility([4,2,3]) === true)
console.assert(checkPossibility([2,2,2]) === true)
console.assert(checkPossibility([1,2,0]) === true)
console.assert(checkPossibility([1,1,2,1,1]) === true)
console.assert(checkPossibility([1,2,2,1,1]) === false)
console.assert(checkPossibility([4,2,1]) === false)
console.assert(checkPossibility([1,2,3,4,1,4,5,6]) === true)
console.assert(checkPossibility([1,2,3,4,10,4,5,6]) === true)
