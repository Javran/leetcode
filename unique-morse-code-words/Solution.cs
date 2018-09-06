using System;
using System.Linq;
using System.Collections.Generic;

public class Solution {
    static readonly string[] table = {
        ".-","-...","-.-.","-..",".","..-.","--.","....",
        "..",".---","-.-",".-..","--","-.","---",".--.",
        "--.-",".-.","...","-","..-","...-",".--","-..-",
        "-.--","--..",
    };

    string MorseEncode(string word) {
        return new string(word.ToCharArray().SelectMany(ch => {
          var offset = ch - 'a';
          return table[offset];
        }).ToArray());
    }

    public int UniqueMorseRepresentations(string[] words) {
        var s = new HashSet<string>();
        foreach (var w in words) {
            s.Add(MorseEncode(w));
        }
        return s.Count;
    }

    static void Main(string[] args) {
        var s = new Solution();
        Console.WriteLine(
            s.UniqueMorseRepresenatations(new string [] {"gin", "zen", "gig", "msg"})
        );
    }
}
