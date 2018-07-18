/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
const solution = isBadVersion => {
  /*
     idea: let's just close in the search space by binary search.
   */
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return n => {
    let l = 1, r = n
    while (l <= r) {
      if (l === r)
        return l
      const mid = (l + r) >>> 1
      const result = isBadVersion(mid)
      if (result) {
        // bad version, in fact could be first bad version,
        // so we don't remove mid from search space for now.
        // note that the only way we can call isBadVersion(mid) again
        // in future is when l === r, but this is already eliminated
        // by returning when l and r meets.
        // so indeed we have strictly less space to search in each iteration.
        r = mid
      } else {
        // good version, excluding mid
        l = mid + 1
      }
    }
  }
}
