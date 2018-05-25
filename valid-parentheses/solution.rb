# Solution: simulate a stack:
# - upon seeing open parens, push it to the stack
# - upon seeing close parens, pop from the stack
#   and ensure open & close parens are matching
# - parens are matching when stack is maintained successfully
#   and it is empty at the end

# @param {String} s
# @return {Boolean}
def is_valid(s)
  valid_parens = ["()", "[]", "{}"]
  xs = s.chars

  # state == nil means error
  state = []
  
  i = 0
  while !state.nil? && i < xs.length
    ch = xs[i]
    case ch
    when "(", "[", "{"
      state.push(ch)
    when ")", "]", "}"
      if state.length == 0
        state = nil
      else
        openParen = state.pop
        pair = "#{openParen}#{ch}"
        unless valid_parens.include? pair
          state = nil
        end
      end
    end
    i += 1
  end

  !state.nil? && state.length == 0
end

puts(is_valid("()") == true)
puts(is_valid("()[]{}") == true)
puts(is_valid("(]") == false)
puts(is_valid("([)]") == false)
puts(is_valid("{[]}") == true)
