object Solution {
  type Token = Either[Char, Int]

  case class Machine(
    numStack: List[Int],
    // + or - with priority
    opStack: List[(Char, Int)],
    curPriority: Int
  )

  def parse(raw: List[Char]): List[Token] = raw match {
    case Nil => Nil
    case x :: xs =>
      x match {
        case _ if x.isSpaceChar =>
          parse(xs.dropWhile(_.isSpaceChar))
        case '(' | ')' | '+' | '-' =>
          Left(x) :: parse(xs)
        case _ if x.isDigit =>
          val (numsRaw, ys) = raw.span(_.isDigit)
          Right(numsRaw.mkString("").toInt) :: parse(ys)
      }
  }

  // force a machine to run until all ops with priority >= given priority is done
  def force(m: Machine, priority: Int): Machine = {
    val Machine(numStack, opStack, _) = m
    opStack match {
      case (op, opPrior) :: opStack1 if opPrior >= priority =>
        numStack match {
          case rNum :: lNum :: numStack1 =>
            val newNum = op match {
              case '+' => lNum + rNum
              case '-' => lNum - rNum
              case _ => throw new Exception(s"Unknown op: ${op}")
            }
            val m1 = m.copy(numStack = newNum :: numStack1, opStack = opStack1)
            force(m1, priority)
          case _ =>
            throw new Exception("Insufficient nums")
        }
      case _ => m
    }
  }

  def interpret(m: Machine, tok: Token): Machine = tok match {
    case Right(v) =>
      m.copy(numStack = v :: m.numStack)
    case Left('(') =>
      m.copy(curPriority = m.curPriority + 1)
    case Left(')') =>
      m.copy(curPriority = m.curPriority - 1)
    case Left('+') | Left('-') =>
      val Left(op) = tok
      val m1 = force(m, m.curPriority)
      m1.copy(opStack = (op, m1.curPriority) :: m1.opStack)
    case _ =>
      m
  }

  def calculate(s: String): Int = {
    val tokens = parse(s.toList)
    val m = force(tokens.foldLeft(Machine(Nil, Nil, 1))(interpret), -1)
    m.numStack.head
  }

  def main(args: Array[String]): Unit = {
    println(calculate("(1+(4+5+2)-3)+(6+8)"))
    println(calculate("3-(13-21)+5"))
    println(calculate("1 +   1  "))
    println(calculate("2 - 1 +   2 "))
  }
}
