/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
const strStr = (haystack, needle) => {
  for (let i = 0; i + needle.length <= haystack.length ; ++i) {
    let match = true
    for (let j = 0; j < needle.length && match; ++j) {
      if (haystack.codePointAt(i+j) !== needle.codePointAt(j))
        match = false
    }
    if (match)
      return i
  }
  return -1
}
