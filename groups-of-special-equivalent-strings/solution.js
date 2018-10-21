const toKey = xs => {
  const es = []
  const os = []
  for (let i = 0; i < xs.length; i += 2) {
    es.push(xs[i])
  }
  for (let i = 1; i < xs.length; i += 2) {
    os.push(xs[i])
  }
  es.sort()
  os.sort()
  return `${es.join('')}|${os.join('')}`
}

/**
 * @param {string[]} A
 * @return {number}
 */
const numSpecialEquivGroups = A => {
  /*
     idea: notice that we are just finding
     equivalence classes, which means once
     a proper "digest" of the original element is found
     (i.e. two elements digest to the same value iff
     they belong to the same class),
     we can easily figure out how many groups are there.

     here notice that odd and even positions never get switched,
     every element will have a bag of even and a bag of odd
     characters and we can just establish equivalence by
     having these 2 bags sorted and compared.
   */
  const groups = new Set()
  for (let i = 0; i < A.length; ++i) {
    groups.add(toKey(A[i]))
  }
  return groups.size
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(numSpecialEquivGroups)
f(["a","b","c","a","c","c"])(3)
f(["aa","bb","ab","ba"])(4)
f(["abc","acb","bac","bca","cab","cba"])(3)
f(["abcd","cdab","adcb","cbad"])(1)
