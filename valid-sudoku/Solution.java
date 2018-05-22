class Solution {
    public static int[][][] cellSets;

    static {
    }

    public static boolean isValidChar(char ch) {
        return (ch >= '0' && ch <= '9') || (ch == '.');
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


        
        return false;
    }

    public static void main(String[] args) {
        return;
    }
}
