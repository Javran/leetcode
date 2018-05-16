object Solution {
  def flipAndInvertImage(xs: Array[Array[Int]]): Array[Array[Int]] =
    xs.map(_.reverse.map(x => if (x == 0) 1 else 0))

  def main(args: Array[String]) = {
    println(
      new Array(new Array(1,1,0),new Array(1,0,1),new Array(0,0,0))
    )
  }
}
