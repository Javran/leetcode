using System;
using System.Collections.Generic;
using System.Linq;

using TyDigest = System.Collections.Generic.Dictionary<char, int>;

public class Solution {
    public static TyDigest Digest(string s) {
        var ret = new Dictionary<char, int>();
        foreach (var ch in s) {
            if (ret.ContainsKey(ch)) {
                ret[ch] += 1;
            } else {
                ret[ch] = 1;
            }
        }
        return ret;
    }

    public static bool Matches(TyDigest d, TyDigest pat) {
        foreach (var k in pat.Keys) {
            if (!d.ContainsKey(k) || d[k] != pat[k])
                return false;
        }
        return true;
    }

    public static void NextDigest(char oldCh, char newCh, TyDigest dCurrent, TyDigest pat) {
        if (oldCh == newCh)
            return;
        if (dCurrent.ContainsKey(oldCh))
            dCurrent[oldCh] -= 1;
        if (dCurrent.ContainsKey(newCh))
            dCurrent[newCh] += 1;
    }

    public IList<int> FindAnagrams(string s, string p) {
        var ans = new List<int>();
        if (s.Length < p.Length)
            return ans;

        // digest pattern
        var dPattern = Digest(p);
        // digest current part
        var dCurrent = new Dictionary<char, int>();
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
            if (i+p.Length < s.Length)
                NextDigest(s[i], s[i+p.Length], dCurrent, dPattern);
        }

        return ans;
    }

    static void Main(string[] args) {
        var ans = new Solution().FindAnagrams("cbaebabacdabc", "abc");
        Console.WriteLine(string.Join(", ", ans));
    }
}
