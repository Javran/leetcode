// one popCount table to rule them all!
object Solution {
  def popCount(v: Int): Int = {
    var vNow: Int = v
    var count = 0
    while (vNow != 0) {
      if ((vNow & 1) != 0)
        count += 1
      vNow >>>= 1
    }

    count
  }

  val popCountTable: Map[Int, List[String]] = (
    for (
      hour <- (0 to 11).toList;
      minu <- 0 to 59;
      count = popCount(hour) + popCount(minu);
      str = f"${hour}%d:${minu}%02d"
    ) yield (count, str)
  ).groupBy(_._1).mapValues(_.map(_._2).toList)

  def readBinaryWatch(num: Int): List[String] =
    popCountTable.get(num).getOrElse({Nil})

  def main(args: Array[String]) = {
    println(readBinaryWatch(1))
  }
}
