const next = xs => {
  const ys = new Uint32Array(xs.length+1).fill(0)
  for (let i = 0; i < xs.length; ++i) {
    ys[i] += xs[i]
    ys[i+1] += xs[i]
  }
  return ys
}

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
const getRow = rowIndex => {
  let x = [1]
  for (
    i = 0;
    i < rowIndex;
    ++i
  )
    x = next(x)
  // need to spread bcs we might have Uint32Array instances instead of arrays
  return [...x]
}

console.log(getRow(3))
