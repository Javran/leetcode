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

    static List<List<string>> Sequence(List<List<string>> xs) {
        if (xs.Count() == 0) {
            return new List<List<string>>{new List<string>{} };
        } else {
            var y = xs.First();
            var ys = xs.Skip(1);
            return y.SelectMany(yResult => Sequence(ys.ToList()).SelectMany(ysResult => {
                        List<string> result = new List<string>(ysResult.Count() + 1);
                        result.Add(yResult);
                        foreach (var ysR in ysResult)
                            result.Add(ysR);
                        return new List<List<string>>{result};
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
