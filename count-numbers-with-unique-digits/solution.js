/**
 * @param {number} n
 * @return {number}
 */
const countNumbersWithUniqueDigits = nInp => {
  if (nInp === 0)
    return 1
  const n = nInp > 10 ? 10 : nInp
  // aux[i]: exact number of numbers that has n digits
  const aux = new Array(11)
  // all single digits are unique
  aux[1] = 10
  // first digit pick from 1~9, then unused 0~9 for all following digits
  aux[2] = 9 * 9
  for (let i = 3; i <= 10; ++i) {
    aux[i] = aux[i-1] * (11 - i)
  }
  return aux.slice(1, n+1).reduce((x,y) => x+y)
}

console.log(countNumbersWithUniqueDigits(10))
