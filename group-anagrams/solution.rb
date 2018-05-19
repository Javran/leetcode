# normalize a string by breaking all of its chars
# and sorting them in order
def norm_string(s)
  s.chars.sort!
end

# @param {String[]} strs
# @return {String[][]}
def group_anagrams(strs)
  # simply grouping all values by their normalized ones
  #   is all we have to do.
  strs.group_by{ |s| norm_string(s) }.values
end

print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
