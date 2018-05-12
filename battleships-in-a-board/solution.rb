# thanks to the strong input assumption that the problem gives,
# we only need to count cells that does not have an upper cell or a left cell
# so for each "battleship" we count exactly one cell of them, which is all what we need

# @param {Character[][]} board
# @return {Integer}
def count_battleships(board)
  ans = 0
  board.each_with_index do | row, i |
    row.each_with_index do | cell, j |
      if cell == 'X'
        has_upper = i-1 >= 0 && board[i-1][j] == 'X'
        has_left = j-1 >= 0 && board[i][j-1] == 'X'
        if !has_upper && !has_left
          ans += 1
        end
      end
    end
  end
  ans
end

puts count_battleships(
  [
    ['X','.','X','X','X'],
    ['X','.','.','.','.'],
    ['X','.','X','.','X'],
    ['.','.','.','.','X'],
    ['X','X','X','.','X'],
  ]
)
