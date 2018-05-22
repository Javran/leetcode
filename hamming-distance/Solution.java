class Solution {
    // straightforward counting
    public int hammingDistance(int x, int y) {
        int curX = x, curY = y;
        int ans = 0;
        while (curX > 0 || curY > 0) {
            if (curX % 2 != curY % 2)
                ++ans;
            curX /= 2;
            curY /= 2;
        }
        return ans;
    }

    public static void main(String [] args) {
        System.out.println(new Solution().hammingDistance(1,4));
    }
}
