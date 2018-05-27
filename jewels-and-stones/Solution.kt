class Solution {
    fun numJewelsInStones(jewelsRaw: String, stonesRaw: String): Int {
        val jewels : Set<Char> = jewelsRaw.toCharArray().toSet()
        return stonesRaw.filter({x -> jewels.contains(x)}).length
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            println(Solution().numJewelsInStones("aA", "aAAbbbb"))
        }
    }
}
