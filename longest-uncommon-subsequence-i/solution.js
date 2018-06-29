/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
const findLUSlength = (a, b) => {
  // I feel this question is poorly written and described,
  // and is more like a play of word than proper problem.

  // if both are the same, it's not possible to get a uncommon subseq
  if (a === b)
    return -1
  // otherwise, just pick the length of the longer one:
  // as two different strings cannot be immediate subseq of each other,
  // so we have only two choices to make.
  return a.length > b.length ? a.length : b.length
}
