/**
 * @param {string} start
 * @param {string} end
 * @return {boolean}
 */
const canTransform = (start, end) => {
  if (start.length !== end.length)
    return false
  /*
     idea: first of all, given lengths must be the same,
     we just check if two strings are equal ignoring all Xs,
     this is because "XL" => "LX" and "RX" => "XR"
     moves "X" around without changing ordering of any "L" and "R".

     but notice that there is no "LX" => "XL" or "XR" => "RX" around,
     so "L" can only move to the left
     and "R" to the right.

   */

  let i = 0, j = 0
  while (true) {
    while (i < start.length && start[i] === 'X')
      ++i
    while (j < end.length && end[j] === 'X')
      ++j
    if (i === start.length)
      return j === end.length
    if (j === end.length)
      return i === start.length
    if (start[i] !== end[j])
      return false
    if (start[i] === 'R') {
      if (i > j)
        return false
    } else {
      // start[i] === 'L'
      if (j > i)
        return false
    }
    ++i
    ++j
  }
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(canTransform)
f("RXXLRXRXL","XRLXXRRLX")(true)
f("L","X")(false)
f("XXRXXLXXXX","XXXXRXXLXX")(false)
