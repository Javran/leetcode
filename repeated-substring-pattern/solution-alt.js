/**
 * @param {string} s
 * @return {boolean}
 */
const repeatedSubstringPattern = s =>
  /*
     credit to rsrs3 for this one, see:
     - https://leetcode.com/problems/repeated-substring-pattern/discuss/94334/Easy-python-solution-with-explaination
     it's easy to show that it works when string indeed repeats itself,
     but I have trouble understanding why it works when the answer is supposed to be false.
     TODO: I believe this is true but now there is a solid proof missing.
   */
  (s + s).substr(1, s.length*2-2).indexOf(s) !== -1

/*
   regarding the proof for cases where S does not repeat itself:

   let S = a0 a1 ... ak,
   S+S without first and last character gives us:
   S2 = a1 ... ak a0 ... a{k-1} if S can be found somewhere in this string,
   it cannot match a1 ... ak or a0 ... a{k-1} due to insufficient length,
   so S2 = a1 ... a{l-1} al ... ak a0 ... ar a{r+1} ... a{k-1}
   matches S1 by al ... ar. where we can work out that r = l-1,
   which is to say, by spliting S into two parts, we can find two matching substrings:

   a0 ... au | a{u+1} ... ak  where u = k-l
   al ... ak | a0 ... a{l-1}

   not sure how to continue though, my idea is to assume u<l, and
   try to use the fact that two matching part overlaps to show
   a{u+1} ... a{l-1} is either an empty string or is some # of cycles just like a0 ... au
   or something so in the end we'll have a contradiction.
 */

console.assert(repeatedSubstringPattern("abcabcabc"))
console.assert(!repeatedSubstringPattern("abcabcabcaba"))
console.assert(repeatedSubstringPattern("abaaba"))
console.assert(repeatedSubstringPattern("aa"))
console.assert(!repeatedSubstringPattern("a"))
console.assert(!repeatedSubstringPattern("abac"))
console.assert(!repeatedSubstringPattern("ab"))
console.assert(repeatedSubstringPattern("aaaaaa"))
