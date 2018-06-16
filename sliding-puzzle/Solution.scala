import scala.collection.mutable.HashSet
import scala.collection.mutable.Queue

object Solution {
  // LCoord is the linear coord
  type LCoord = Int
  type Board = Array[Int]
  /*

   linear coords:

   (0,0) <=> 0 | (0,1) <=> 1 | (0,2) <=> 2
   (1,0) <=> 3 | (1,1) <=> 4 | (1,2) <=> 5

   lMoves(i) are all possible swaps a blank cell at linear coord i can perform

   */
  val lMoves: Array[List[LCoord]] =
    Array(
      /* 0 */ List(1,3), /* 1 */ List(0,2,4), /* 2 */ List(1,5),
      /* 3 */ List(0,4), /* 4 */ List(1,3,5), /* 5 */ List(2,4)
    )

  def getBlankCoord(b: Board): LCoord = {
    val x = b indexOf 0
    if (x < 0 || x >= 6)
      throw new Exception("Unexpected board")
    x
  }

  def nextBoards(b: Board): List[Board] = {
    val blankInd = getBlankCoord(b)
    lMoves(blankInd).map(otherInd => {
      val b2 = b.clone
      b2(blankInd) = b(otherInd)
      b2(otherInd) = b(blankInd)
      b2
    })
  }

  def hashBoard(b: Board): Int = b.foldLeft(0)((acc,i) => acc*10+i)

  def isSolved(b: Board): Boolean =
    b.zipWithIndex.forall({
      case (e,5) => e == 0
      case (e,ind) => e == ind+1
    })

  def slidingPuzzle(boardInp: Array[Array[Int]]): Int = {
    val board: Board = boardInp.flatten
    val visited: HashSet[Int] = new HashSet()
    val queue: Queue[(Board, Int)] = new Queue()
    queue += ((board, 0): (Board, Int))
    while (!queue.isEmpty) {
      val (curBoard, step) = queue.dequeue
      visited += hashBoard(curBoard)
      if (isSolved(curBoard))
        return step
      for (
        nextBoard <- nextBoards(curBoard);
        h = hashBoard(nextBoard)
        if !(visited contains h)
      )
        queue += ((nextBoard, step+1): (Board, Int))
    }
    return -1
  }

  def main(args: Array[String]): Unit = {
    println(slidingPuzzle(Array(Array(4,1,2),Array(5,0,3))))
    println(slidingPuzzle(Array(Array(3,2,4),Array(1,5,0))))
    println(slidingPuzzle(Array(Array(1,2,3),Array(5,4,0))))
  }
}
