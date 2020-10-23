# https://leetcode.com/problems/valid-parentheses/
# O(n) time complexity
# O(n) space complexity
def is_valid(s):
    open_brackets = ('(', '{', '[')
    closed_brackets = (')', '}', ']')
    valid_brackets = ('()', '{}', '[]')
    stack = []
    for ch in s:
        if ch in open_brackets:
            stack.append(ch)
        elif ch in closed_brackets:
            if not stack or (stack.pop() + ch) not in valid_brackets:
                return False
    return True if not stack else False
