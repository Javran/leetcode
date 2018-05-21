using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

public class Solution {
    static readonly Dictionary<int, List<char>> digitToLetters;

    static Solution() {
        digitToLetters = new Dictionary<int, List<char>>();
        Action<int, string> def = (int i, string s) =>
            digitToLetters[i] = s.ToList();

        def(2, "abc");
        def(3, "def");
        def(4, "ghi");
        def(5, "jkl");
        def(6, "mno");
        def(7, "pqrs");
        def(8, "tuv");
        def(9, "wxyz");
    }

    static List<int> GetDigits(string s) {
        return s.Select(x => Int32.Parse(x.ToString())).ToList();
    }

    static List<List<char>> Sequence(List<List<char>> xs) {
        if (xs.Count() == 0) {
            return new List<List<char>>{new List<char>{} };
        } else {
            var y = xs.First();
            var ys = xs.Skip(1);
            return y.SelectMany(yResult => Sequence(ys.ToList()).SelectMany(ysResult => {
                        List<char> result = new List<char>(ysResult.Count() + 1);
                        result.Add(yResult);
                        foreach (var ysR in ysResult)
                            result.Add(ysR);
                        return new List<List<char>>{result};
                    })).ToList();
        }
    }

    public IList<string> LetterCombinations(string digitsRaw) {
        /*

          the problem setter apparently says nothing about what to do
          if the input is empty.

          An empty string can be interpreted as:
          - "no input at all" (like null), in which case {} should be the answer.
          - or "input is an empty string", in which case {""} should be used.

          this decision is so random that getting this right first time is pure luck.
          
        */
        if (digitsRaw == "")
            return new List<string>{};

        var letters = GetDigits(digitsRaw).Select(d => digitToLetters[d]).ToList();
        var results = Sequence(letters);
        return results.Select(xs => String.Join("", xs)).ToList();
    }

    static void Main(string[] args) {
        var s = new Solution();
        var result = s.LetterCombinations("23");
        foreach (var r in result) {
            Console.WriteLine(r);
        }
    }

}
