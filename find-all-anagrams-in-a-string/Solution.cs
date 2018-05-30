using System;
using System.Collections.Generic;
using System.Linq;

// Given that all inputs are from chars of 'a' ~ 'z',
// we have such a very small set that we can use array to our advantage.
public class Solution {
    public IList<int> FindAnagrams(string s, string p) {
        var ans = new List<int>();
        if (s.Length < p.Length)
            return ans;

        int[] dPattern = new int[26];
        var pInds = new List<int>();
        int[] dCurrent = new int[26];
        foreach (var ch in p)
            dPattern[ch - 'a'] += 1;
        foreach (var ch in s.Substring(0,p.Length))
            dCurrent[ch - 'a'] += 1;

        for (int i = 0; i < 26; ++i)
            if (dPattern[i] > 0)
                pInds.Add(i);
        
        for (int i = 0; true; ++i) {
            // INVARANT: dCurrent should be sync-ed at this point.
            bool matched = true;
            for (int j = 0; j < pInds.Count() && matched; ++j)
                if (dCurrent[pInds[j]] != dPattern[pInds[j]])
                    matched = false;
            if (matched) {
                ans.Add(i);
            }
            if (i+p.Length < s.Length) {
                var oldCh = s[i];
                var newCh = s[i+p.Length];
                if (oldCh != newCh) {
                    dCurrent[oldCh - 'a'] -= 1;
                    dCurrent[newCh - 'a'] += 1;
                }
            } else {
                break;
            }
        }
        return ans;
    }

    static void Main(string[] args) {
        var ans = new Solution().FindAnagrams("cbaebabacdabc", "abc");
        Console.WriteLine(string.Join(", ", ans));
    }
}
