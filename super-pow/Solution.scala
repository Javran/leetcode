/*
 
 Problem: find a ^ b mod M where M = 1337

 let b = b_n-1, b_n-2, ... b_0 (digits)

 note that:

 - b = 10^(n-1)*b_n-1 + 10^(n-2)*b_n-2 + ... 10^0*b_0
 -   = 10*( ... 10*(10*b_n-1 + b_n-2) + b_n-3 ...) + b_0

 therefore:

 -   a ^ b mod M
 - = a ^ (10*( ... 10*(10*b_n-1 + b_n-2) + b_n-3 ...) + b_0) mod M
 - = a ^ (10*( ... 10*(10*b_n-1 + b_n-2) + b_n-3 ...)) * a ^ b_0 mod M
 - = [(a ^ 10) ^ (10*( ... 10*(10*b_n-1 + b_n-2) + b_n-3 ...)) mod M] * [a ^ b_0] mod M

 note that now the problem becomes:

 - find a ^ b_0 mod M
 - find a' == a^10 mod M (0 < a' < 1337)
 - find a' ^ b' mod M (where b' = b_n-1, b_n-2, ... b_1) (note that we've reduced problem size)

 */
object Solution {
  val M = 1337

  def fastModPow(a: Int, b: Int): Int = b match {
    case 0 => 1
    case 1 => a % M
    case _ =>
      if ((b | 0) == 0)
        // a^(2n) = (a^2)^n
        fastModPow(a*a % M, b) % M
      else
        // a^(2n+1) = a*a^(2n)
        a*fastModPow(a, b-1) % M
  }

  def superPowAux(a: Int, revB: List[Int], accumlated: Int): Int = revB match {
    case Nil => accumlated
    case hd :: tl =>
      val a1 = fastModPow(a,10)
      val c = fastModPow(a,hd)
      superPowAux(a1, tl, (accumlated*c) % M)
  }

  def superPow(a: Int, b: Array[Int]): Int =
    superPowAux(a % M, b.reverse.toList, 1)

  def main(args: Array[String]) = {
    println(superPow(2,Array(3,9,5)))
  }
}
