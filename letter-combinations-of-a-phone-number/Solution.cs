using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

public class Solution {
    static List<string> MakeLetters(string s) {
        List<char> cs = new List<char>();
        cs.AddRange(s);
        return cs.Select(x => x.ToString()).ToList();
    }

    static List<int> GetDigits(string s) {
        return MakeLetters(s).Select(x => Int32.Parse(x)).ToList();
    }

    public IList<string> LetterCombinations(string digitsRaw) {
        var digitToLetters = new Dictionary<int, List<string>>
        {
            { 2, MakeLetters("abc") },
            { 3, MakeLetters("def") },
            { 4, MakeLetters("ghi") },
            { 5, MakeLetters("jkl") },
            { 6, MakeLetters("mno") },
            { 7, MakeLetters("pqrs") },
            { 8, MakeLetters("tuv") },
            { 9, MakeLetters("wxyz") },
        };

        var digits = GetDigits(digitsRaw);

        // TODO
        return new List<string>();
    }

    static void Main(string[] args) {
        // var s = new Solution();
    }

}
