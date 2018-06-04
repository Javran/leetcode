import scala.collection.mutable.Queue

object Solution {
  // extra INVARIANT: the coord must be within range
  type Coord = (Int, Int)

  def pacificAtlantic(matrix: Array[Array[Int]]): List[Array[Int]] = {
    val m = matrix.length
    if (m == 0)
      return Nil
    val n = matrix(0).length
    if (n == 0)
      return Nil
    /*

     given we have 150*150 cell at most, BFS should serve the purpose well:

     - do two expansions to pacific and atlantic
     - pick intersection

     */

    // whether we can move from a to b
    // NOTE: this function should only be called by "allPossibleDirs"
    // to ensure that "a" and "b" are neighbors
    def canMove(a: Coord, b: Coord): Boolean = {
      val ((x0, y0), (x1, y1)) = (a,b)
      // no need of distance check.
      // val dist = Math.abs(x0-x1) + Math.abs(y0-y1)
      matrix(x0)(y0) >= matrix(x1)(y1)
    }

    // give all possible moving directions
    def allPossibleDirs(c: Coord): List[Coord] = {
      val (x,y) = c
      List((x-1,y), (x+1,y), (x, y-1), (x, y+1)).filter(pair => {
        val (u,v) = pair
        u >= 0 && u < m && v >= 0 && v < n &&
        // note that we actually interested in reversed direction
        canMove(pair, c)
      })
    }

    def bfs(
      queue: Queue[Coord],
      ocean: Array[Array[Boolean]]
    ) = {
      val visited = Array.ofDim[Boolean](m,n)
      while (!queue.isEmpty) {
        val coord = queue.dequeue
        val (x,y) = coord
        if (!visited(x)(y)) {
          visited(x)(y) = true
          ocean(x)(y) = true
          for (cNext <- allPossibleDirs(coord)) {
            val (x1,y1) = cNext
            if (!visited(x1)(y1)) {
              queue += cNext
            }
          }
        }
      }
    }

    val pacificQueue = new Queue[Coord]()
    val atlanticQueue = new Queue[Coord]()
    val pacificOcean = Array.ofDim[Boolean](m,n)
    val atlanticOcean = Array.ofDim[Boolean](m,n)
    for (i <- 0 to n-1) {
      pacificOcean(0)(i) = true
      pacificQueue += ((0,i): Coord)

      atlanticOcean(m-1)(i) = true
      atlanticQueue += ((m-1,i): Coord)
    }
    for (i <- 1 to m-1) {
      pacificOcean(i)(0) = true
      pacificQueue += ((i,0): Coord)
    }
    for (i <- 0 to m-2) {
      atlanticOcean(i)(n-1) = true
      atlanticQueue += ((i,n-1): Coord)
    }
    bfs(pacificQueue, pacificOcean)
    bfs(atlanticQueue, atlanticOcean)

    for (
      i <- (0 to m-1).toList;
      j <- 0 to n-1 if pacificOcean(i)(j) && atlanticOcean(i)(j)
    ) yield Array(i,j)
  }

  def main(args: Array[String]) = {
    println(pacificAtlantic(Array(
      Array(1,2,2,3,5),
      Array(3,2,3,4,4),
      Array(2,4,5,3,1),
      Array(6,7,1,4,5),
      Array(5,1,1,2,4)
    )).map(_.mkString(","))
    )
  }
}
