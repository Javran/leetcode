object Solution {
  def summarize(xsRaw : Array[Char]) : Array[Int] = {
    val xs : Array[Int] = xsRaw.map(_ - '0')
    val ys = Array.fill(10){0}
    for (x <- xs) {
      ys(x) += 1
    }
    return ys
  }

  def getHint(secretRaw: String, guessRaw: String): String = {
    val secret = secretRaw.toCharArray()
    val guess = guessRaw.toCharArray()
    // split into perfect matches and all leftovers
    val (matches, mismatches) = secret.zip(guess).partition(
      {case (sCh, gCh) => sCh == gCh}
    )
    val bulls = matches.length
    val (umSecret, umGuess) = mismatches.unzip[Char, Char]
    // make a summarize, in which we just count how many times a specific digit occurs
    val sSecret = summarize(umSecret)
    val sGuess = summarize(umGuess)
    val commons = sSecret.zip(sGuess).map(
      {case (a,b) => Math.min(a,b)}
    )
    val cows = commons.sum
    return s"${bulls}A${cows}B"
  }

  def main(args: Array[String]) = {
    println(getHint("1123", "0111") == "1A1B")
    println(getHint("1807", "7810") == "1A3B")
    println(getHint("", "") == "0A0B")
    println(getHint("114514", "123456") == "1A2B")
  }
}
