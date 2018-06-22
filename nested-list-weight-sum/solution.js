const depthSumAux = (arr, depth) =>
  arr.reduce(
    (acc, l /* NestedInteger */) => {
      const v = l.getInteger()
      if (v === null) {
        // we have encountered a list
        return acc + depthSumAux(l.getList(), depth+1)
      } else {
        return acc + v*depth
      }
    },
    0
  )

// the only difficulty lies in the artifical API.
const depthSum = nestedList => depthSumAux(nestedList, 1)

