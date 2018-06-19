function NestedInteger(xs) {
  this.xs = xs
}

NestedInteger.prototype.isInteger = function() {
  return !Array.isArray(this.xs)
}

NestedInteger.prototype.getInteger = function() {
  return Array.isArray(this.xs) ? null : this.xs
}

NestedInteger.prototype.getList = function() {
  return Array.isArray(this.xs) ? this.xs.map(x => new NestedInteger(x)) : null
}

/*
   whoever make this problem is surely poor at designing API
   and excellent at making things more complicated than it has to be:

   - what NestedInteger does that an Array can't do?
   - talking about consistency, why NestedIterator accepts an Array of NestedInteger,
     instead of using NestedInteger

   WHAT THE ACTUAL FUCK????
 */
const nextFocus = zipper => {
  /*
     well. back to the topic. we just need a zipper to navigate in the structure.
     "nextFocus" always brings the focus to the next actual integer
     (or return null if it is possible)
     I'm aware that generators might be of good use, and this approach
     is a bit of "functional" one, and slight slowdown in performance
     is expected because all these cloning need to happen.
   */
  let {ind, arr} = zipper
  let breadcrumb = zipper.breadcrumb.slice()
  ind += 1
  while (true) {
    // until hitting a valid array & index
    while (ind >= arr.length) {
      if (breadcrumb.length === 0)
        return null
      const bc = breadcrumb.pop()
      ind = bc.ind + 1
      arr = bc.arr
    }
    if (arr[ind].isInteger())
      break
    while (ind < arr.length && !arr[ind].isInteger()) {
      breadcrumb.push({ind, arr})
      arr = arr[ind].getList()
      ind = 0
    }
  }
  return {ind, arr, breadcrumb}
}

/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
const NestedIterator = function(nestedList) {
  this.zipper = {
    ind: -1,
    arr: nestedList,
    breadcrumb: [],
  }
}

/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
  return Boolean(nextFocus(this.zipper))
}

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function() {
  this.zipper = nextFocus(this.zipper)
  const {arr, ind} = this.zipper
  return arr[ind].getInteger()
}

const test = xs => {
  const i = new NestedIterator(xs.map(x => new NestedInteger(x)))
  const a = []
  while (i.hasNext()) a.push(i.next())
  console.log(a)
}

test([[[]],1,[2,3,[4,5,[[2,4,[]]]],6,[[[[5]]]]]])
test([[[[[]]]]])
test([[1,1],2,[1,1]])
test([1,[4,[6]]])
