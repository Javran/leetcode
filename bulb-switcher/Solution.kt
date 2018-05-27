import java.lang.Math

/*

math problem in disguise.

First we figure out what determines the end state of i-th bulb (1-based):
take n = 5 as an example.
1st bulb is on because 1 has the only factor 1
2nd is off because 2 has two factors: 1,2
3rd is off because 3 has two factors: 1,3
4th: on, factors: 1,2,4
5th: off, factors: 1,5

now note that when i>1, i-th bulb is on if and only if i has odd number of factors
for any integer N, we can do factorization:
N = p1^a1 * p2^a2 ... * pk^ak where p are prime numbers
and the number of factors will be T = (a1 + 1)*(a2 + 1)* ... *(ak + 1)
if T is an odd, we know i-th bulb will be on.
since we need T = (a1 + 1)*(a2 + 1)* ... *(ak + 1) to be odd,
all of (a_ + 1) needs to be odd because any of them being even will cause T to be even,
which means all (a_) needs to be even.
N = p1^(b1*2) * p2^(b2*2) * ... * pk^(bk*2) where a_ = b_*2 ...
well, now we know that N has to be a square number.

Given n bulbs, if we count the # of square numbers in range of 1 .. n, that is the anwser
to the question - just do floor(sqrt(n)) and we are done.

*/

class Solution {
    fun bulbSwitch(n: Int): Int {
        return Math.floor(Math.sqrt(n.toDouble())).toInt()
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            println(Solution().bulbSwitch(10))
        }
    }
}
