object Solution {
  def gameOfLife(board: Array[Array[Int]]): Unit = {
    val rows = board.length
    if (rows == 0)
      return
    val cols = board(0).length
    if (cols == 0)
      return

    // I'm not sure if this is the intended way,
    // but since a board cell can only take value 0 or 1 as input and output,
    // we might as well use these unused bits to store values for next gen.
    // so our plan is simple: board(i)(j) is changed into (next*2 + board(i)(j))
    // where "next" is the next bit in (i,j),
    // then we take another scan to keep only this "next" value.

    def get(i: Int, j: Int): Int =
      if (i < 0 || i >= rows || j < 0 || j >= cols)
        0
      else
        board(i)(j)

    // here we will use the least significant bit for storing current value
    // and next to least significant ones for next bit.
    def neighborCount(i: Int, j: Int): Int = {
      val cells = (
        for (
          dx <- -1 to 1;
          dy <- -1 to 1;
          if !(dx == 0 && dy == 0)
        )
          // to extract only the last bit
          yield (get(i+dx,j+dy) & 1)
      )
      cells.sum
    }

    for (
      i <- 0 to rows-1;
      j <- 0 to cols-1
    ) {
      val cur = (board(i)(j) & 1)
      val nCount = neighborCount(i,j)
      val next = if (cur == 1) {
        if (nCount < 2)
          0
        else if (nCount <= 3)
          1
        else
          0
      } else {
        if (nCount == 3)
          1
        else
          0
      }
      board(i)(j) = board(i)(j) + next*2
    }
    for (
      i <- 0 to rows-1;
      j <- 0 to cols-1
    ) {
      board(i)(j) /= 2
    }
  }

  def main(args: Array[String]): Unit = {
    gameOfLife(
      Array(
        Array(0,1,0),
        Array(0,0,1),
        Array(1,1,1),
        Array(0,0,0),
      )
    )
  }
}
