using System.Collections.Generic;
using System.Diagnostics;

public class Solution {
    public int LengthOfLongestSubstring(string s) {
        // INVARIANT: s[curBegin..i] should be in sync with curSet
        var curSet = new HashSet<char>();
        int curBegin = 0;
        int curMax = 0;
        for (int i = 0; i<s.Length; ++i) {
            char c = s[i];
            if (curSet.Contains(c)) {
                // found repetition
                // drop chars until current set no longer contains
                // the conflicting char
                while (s[curBegin] != c) {
                    curSet.Remove(s[curBegin]);
                    ++curBegin;
                }
                ++curBegin;
            } else {
                curSet.Add(c);
                var l = curSet.Count;
                if (l > curMax)
                    curMax = l;
            }
        }
        return curMax;
    }

    delegate void TestFunc(string s, int i);

    static void Main(string[] args) {
        var s = new Solution();
        TestFunc test = (inp, exp) =>
            Debug.Assert(s.LengthOfLongestSubstring(inp) == exp);

        test("abcabcbb", 3);
        test("bbbb", 1);
        test("", 0);
        test("a1atuy12",5);
    }
}
