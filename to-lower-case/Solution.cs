using System;

public class Solution {
    public string ToLowerCase(string str) {
        /*
          hm, I'm not gonna cheat with ToLower
         */
        var chs = str.ToCharArray();
        for (var i = 0; i < str.Length; ++i) {
            if ('A' <= chs[i] && chs[i] <= 'Z') {
                chs[i] = (char)('a' + chs[i] - 'A');
            }
        }
        return new string(chs);
    }

    static void Main(string[] args) {
        var s = new Solution();
        Console.WriteLine(s.ToLowerCase("LovelLLY"));
    }
}
