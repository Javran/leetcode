/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
const constructArray = (n, k) => {
  /*
     for any n, we can at most make n-1 distinct values,
     and there is a systematic way.

     consider n=7:

     [1,7,2,6,3,5,4] gives us differences: [6,5,4,3,2,1], (k=6) which is
     a interleave of unused min-max values within range.

     but if say we want to deal with k = 3, we try the same process:

     [1,7,2, <?> ]

     now we have differences: [6,5] and just need one more, which can be constructed
     from all unused numbers:

     [1,7,2, <3,4,5,6>]

     but what if k has a different parity, say k = 4?

     we'll still try the same thing:

     [1,7,2,6, <?>]

     now that we have [6,5,4] as differences, we can still use all leftovers
     but in descending order:

     [1,7,2,6, <5,4,3>]

     now it's everything we need.

   */
  const ans = []
  let l = 1, r = n
  let curK
  for (curK = k; curK >= 2; curK -= 2) {
    ans.push(l), ++l
    ans.push(r), --r
  }

  if (curK === 0) {
    for (let i = r; i >= l; --i)
      ans.push(i)
  } else {
    for (let i = l; i <= r; ++i)
      ans.push(i)
  }
  return ans
}

for (let i = 1; i < 6; ++i) {
  console.log(constructArray(7,i))
}
