/**
 * @param {number[]} digits
 * @return {number[]}
 */
const plusOne = digits => {
  // INVARIANT: digits must be a non-empty Array
  // plus 1 here
  ++digits[digits.length-1]
  let i = digits.length-1
  // carry bits until hitting most significant digit
  while (i-1 >= 0 && digits[i] > 9) {
    ++digits[i-1]
    digits[i] -= 10
    --i
  }
  // carry for first digit
  if (digits[0] > 9) {
    digits[0] -= 10
    digits.unshift(1)
  }
  return digits
}

console.log(plusOne([0]))
console.log(plusOne([9]))
console.log(plusOne([9,9,9,9,9]))
console.log(plusOne([9,9,9,9,7]))
