class Solution {
    /*
    
    - note that n = 4 is a losing state, so did any n = 4*k where k is an integer.
    - for all the other cases, namely n = 4*k+1, n = 4*k+2, n = 4*k+3,
      you can always leave your opponent a "n = 4*k" situation so they are all winning states.
    
    */
    fun canWinNim(n: Int): Boolean {
        return n % 4 != 0
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            println("placeholder")
        }
    }
}
