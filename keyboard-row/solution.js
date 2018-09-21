/*
   idea: nothing tricky, I just like that we can do .every and .some
   to get the task done.
 */
const toSet = str => new Set(str.split(''))

const rows = [
  toSet('qwertyuiop'),
  toSet('asdfghjkl'),
  toSet('zxcvbnm'),
]

/**
 * @param {string[]} words
 * @return {string[]}
 */
const findWords = words => words.filter(word =>
  rows.some(rowSet => word.toLowerCase().split('').every(w => rowSet.has(w)))
)

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(findWords)

f(["Hello", "Alaska", "Dad", "Peace"])(["Alaska", "Dad"])
