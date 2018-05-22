import java.util.*;

class Solution {
    public static boolean isValidChar(char ch) {
        return (ch >= '0' && ch <= '9') || (ch == '.');
    }

    public static boolean hasDupCell(char[] cs) {
        for (int i = 0; i < cs.length; ++i) {
            if (cs[i] == '.')
                continue;
            // INVARIANT: cs[i] is not empty
            for (int j = i+1; j < cs.length; ++j) {
                if (cs[i] == cs[j])
                    return true;
            }
        }
        return false;
    }

    public boolean isValidSudoku(char[][] board) {
        // first pass: shape and elements are allowed (no dup detection)
        if (board == null || board.length != 9)
            return false;
        for (char[] row : board) {
            if (row == null || row.length != 9)
                return false;
            for (char cell : row) {
                if (!isValidChar(cell))
                    return false;
            }
        }

        // TODO: this can be done statically
        int cellSets[][][] = new int[9+9+9][9][2];
        for (int i = 0; i < 9; ++i) {
            for (int j = 0; j < 9; ++j) {
                // rows: 0~8
                cellSets[i][j][0] = i;
                cellSets[i][j][1] = j;
                
                // cols: 9~18
                cellSets[i+9][j][0] = j;
                cellSets[i+9][j][1] = i;
            }
        }

        int ltCoords[][] = {
            {0,0}, {0,3}, {0,6},
            {3,0}, {3,3}, {3,6},
            {6,0}, {6,3}, {6,6},
        };
        int diffs[][] = {
            {0,0}, {0,1}, {0,2},
            {1,0}, {1,1}, {1,2},
            {2,0}, {2,1}, {2,2},
        };
        
        // boxes
        for (int ltInd = 0; ltInd < ltCoords.length; ++ltInd) {
            for (int diffInd = 0; diffInd < diffs.length; ++diffInd) {
                cellSets[18+ltInd][diffInd][0] = ltCoords[ltInd][0] + diffs[diffInd][0];
                cellSets[18+ltInd][diffInd][1] = ltCoords[ltInd][1] + diffs[diffInd][1];
            }
        }

        for (int[][] cellSet : cellSets) {
            char[] cs = new char[cellSet.length];
            for (int i = 0; i < cellSet.length; ++i) {
                int x = cellSet[i][0];
                int y = cellSet[i][1];
                cs[i] = board[x][y];
            }
            if (hasDupCell(cs))
                return false;
        }
        return true;
    }

    public static void main(String[] args) {
        char test[][] = {
            {'5','3','.','.','7','.','.','.','.'},
            {'6','.','.','1','9','5','.','.','.'},
            {'.','9','8','.','.','.','.','6','.'},
            {'8','.','.','.','6','.','.','.','3'},
            {'4','.','.','8','.','3','.','.','1'},
            {'7','.','.','.','2','.','.','.','6'},
            {'.','6','.','.','.','.','2','8','.'},
            {'.','.','.','4','1','9','.','.','5'},
            {'.','.','.','.','8','.','.','7','9'}
        };

        System.out.println(new Solution().isValidSudoku(test));
        return;
    }
}
