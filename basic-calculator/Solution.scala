import scala.annotation.tailrec

/*
 
 the difficulty is in determining the appropriate time to perform an arithmetic operation:
 given "a - (b + c)", the "+" must be processed first before "-" can be done.
 this is done by keeping info on two stacks, one for storing numbers and another
 for operations with their priority.

 one we have this representation ("Machine" case class below),
 we gradually process the input (by "interpret") and
 try to perform as many operations as possible until
 we are unsure about priority (by "force").

 */
object Solution {
  type Token = Either[Char, Int]

  case class Machine(
    numStack: List[Int],
    // + or - with priority
    opStack: List[(Char, Int)],
    curPriority: Int
  )

  @tailrec def parse(raw: List[Char], acc: List[Token]): List[Token] = raw match {
    case Nil => acc.reverse
    case x :: xs =>
      x match {
        case _ if x.isSpaceChar =>
          parse(xs.dropWhile(_.isSpaceChar), acc)
        case '(' | ')' | '+' | '-' =>
          parse(xs, Left(x) :: acc)
        case _ if x.isDigit =>
          val (numsRaw, ys) = raw.span(_.isDigit)
          parse(ys, Right(numsRaw.mkString("").toInt) :: acc)
      }
  }

  // force a machine to run until all ops with priority >= given priority is done
  // as both "-" and "-" happen to be left-associative, using ">=" won't get us into any trouble
  @tailrec def force(m: Machine, priority: Int): Machine = {
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
    val tokens = parse(s.toList, Nil)
    val m = force(tokens.foldLeft(Machine(Nil, Nil, 1))(interpret), -1)
    m.numStack.head
  }

  def main(args: Array[String]): Unit = {
    println(calculate("(1+(4+5+2)-3)+(6+8)") == 23)
    println(calculate("3-(13-21)+5") == 16)
    println(calculate("1 +   1  ") == 2)
    println(calculate("2 - 1 +   2 ") == 3)
  }
}
