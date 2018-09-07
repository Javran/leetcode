using System;

public class Solution {
    public string ReverseWords(string s) {
        var xs = s.ToCharArray();
        var startInd = 0;
        while (startInd < xs.Length) {
            var endInd = startInd;
            while (endInd < xs.Length && xs[endInd] != ' ') {
                ++endInd;
            }
            --endInd;
            for (int i = startInd, j = endInd; i < j; ++i, --j) {
                var tmp = xs[i];
                xs[i] = xs[j];
                xs[j] = tmp;
            }
            startInd = endInd + 2;
        }
        return new string(xs);
    }
    static void Main(string[] args) {
        var s = new Solution();
        Console.WriteLine(s.ReverseWords(""));
        Console.WriteLine(s.ReverseWords("Let's take LeetCode contest"));
        Console.WriteLine(s.ReverseWords("Letssft"));
        Console.WriteLine(s.ReverseWords("aa bb"));
    }
}
