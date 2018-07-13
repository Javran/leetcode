class Solution {
public:
    int uniquePaths(int m, int n) {
        /*
          given rect of m x n,
          this is asking for the # of unique permutations
          of (m-1) down moves and (n-1) right moves,
          which is just (m+n-2)! / (m-1)! / (n-1)!
         */
        if (m < n) {
            // as we'll use n as loop factor, we
            // want it to be the smaller one.
            int tmp = m;
            m = n;
            n = tmp;
        }
        --m, --n;
        // INVARIANT: m >= n
        long ans = 1;
        // note that we can do:
        // ans = (m+1) / 1 * (m+2) / 2 * ...
        // this is because we are guaranteed that
        // - m+1, m+2 will have an even number
        // - m+1, m+2, m+3 will have a factor of 3
        // - (and so on)
        // but we need to be careful not to overflow the int,
        // so we're using "long".
        for (int i = 1; i <= n; ++i) {
            ans *= m+i;
            ans /= i;
        }
        return ans;
    }
};
