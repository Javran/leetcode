class Solution {
    /*
        apply a greedy algorithm, advance when the matching char is found.
    */
    fun isSubsequence(s: String, t: String): Boolean {
        if (s.length == 0)
            return true

        var i: Int = 0
        for (ch in t) {
            // actually we want to advance i whenever possible
            // because this allows the longest not-yet-scanned part of the longer string
            // to match with not-yet-scanned part of the pattern
            if (s[i] == ch)
                ++i
            if (i == s.length)
                return true
        }
        return false
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            println(Solution().isSubsequence("ab", "aaaab") == true)
            println(Solution().isSubsequence("ab", "aa") == false)
        }
    }
}
