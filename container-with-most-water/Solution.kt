/*

a straightforward problem with the only difficulty being
that the description sounds intentionally ambiguous
for the mere puroise of screwing you over.

*/
class Solution {
    fun maxArea(hs: IntArray): Int {
        var maxArea = minOf(hs[0], hs[1])
        val hsLen = hs.count()
        for (w in 1..hsLen-1) {
            // a condition check on "j" is more straightforward and readable
            // so I don't bother to do the math.
            for (i in 0..hsLen) {
                val j = i + w
                if (j >= hsLen)
                    break
                val h = minOf(hs[i], hs[j])
                val curArea = w*h
                if (curArea > maxArea)
                   maxArea = curArea
            }
        }
        return maxArea
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            println(Solution().maxArea(intArrayOf(3,4,5)))
            println(Solution().maxArea(intArrayOf(1,2,4,3)))
        }
    }
}
