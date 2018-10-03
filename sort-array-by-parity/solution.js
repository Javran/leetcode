/**
 * @param {number[]} A
 * @return {number[]}
 */
const sortArrayByParity = A => A.sort((x,y) => (x & 1) - (y & 1))
