using System;
using System.Collections.Generic;
using System.Linq;

/*
  TyDigest is a type for digest of interest:
  a char is contained if and only if the char presents in the pattern.
*/
using TyDigest = System.Collections.Generic.Dictionary<char, int>;

public class Solution {
    public static bool Matches(TyDigest d, TyDigest pat) {
        foreach (var k in pat.Keys) {
            if (!d.ContainsKey(k) || d[k] != pat[k])
                return false;
        }
        return true;
    }

    public IList<int> FindAnagrams(string s, string p) {
        var ans = new List<int>();
        if (s.Length < p.Length)
            return ans;

        // digest pattern
        var dPattern = new Dictionary<char, int>();
        // digest current part
        var dCurrent = new Dictionary<char, int>();
        foreach (var ch in p) {
            if (dPattern.ContainsKey(ch)) {
                dPattern[ch] += 1;
            } else {
                dPattern[ch] = 1;
            }
        }
        foreach (var k in dPattern.Keys) {
            dCurrent[k] = 0;
        }

        foreach (var ch in s.Substring(0,p.Length)) {
            if (dCurrent.ContainsKey(ch))
                dCurrent[ch] += 1;
        }

        for (int i = 0; i+p.Length-1 < s.Length; ++i) {
            // INVARANT: dCurrent should be sync-ed at this point.
            if (Matches(dCurrent, dPattern)) {
                ans.Add(i);
            }
            // sliding window, but only focus on pattern chars
            if (i+p.Length < s.Length) {
                var oldCh = s[i];
                var newCh = s[i+p.Length];
                if (oldCh == newCh)
                    continue;
                if (dCurrent.ContainsKey(oldCh))
                    dCurrent[oldCh] -= 1;
                if (dCurrent.ContainsKey(newCh))
                    dCurrent[newCh] += 1;
            }
        }

        return ans;
    }

    static void Main(string[] args) {
        var ans = new Solution().FindAnagrams("cbaebabacdabc", "abc");
        Console.WriteLine(string.Join(", ", ans));
    }
}
