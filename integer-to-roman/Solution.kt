class Solution {
    fun toRomanAux(one: Char, five: Char, ten: Char): (Int) -> List<Char> = {
        /* n: 0~9 */
        n : Int ->
        when (n) {
            in 0..3 -> List(n) { one }
            4 -> listOf(one, five)
            in 5..8 -> listOf(five) + List(n-5) { one }
            9 -> listOf(one, ten)
            else -> throw IllegalArgumentException("Unexpected input")
        }
    }

    fun intToRoman(num: Int): String {
        val numDs = num % 10
        val numTs = (num % 100 - numDs) / 10
        val numHs = (num % 1000 - numTs*10 - numDs) / 100
        val numKs = (num % 10000 - numHs * 100 - numTs*10 - numDs) / 1000
        val rKs = toRomanAux('M','?','?')(numKs)
        val rHs = toRomanAux('C','D','M')(numHs)
        val rTs = toRomanAux('X','L','C')(numTs)
        val rDs = toRomanAux('I','V','X')(numDs)
        return (rKs + rHs + rTs + rDs).joinToString("")
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            println(Solution().intToRoman(3) == "III")
            println(Solution().intToRoman(1994) == "MCMXCIV")
        }
    }
}
