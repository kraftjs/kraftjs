# https://leetcode.com/problems/string-to-integer-atoi/
# O(n) space complexity
# O(1) time complexity
def string_to_integer(s: str) -> int:
    MAX_NUM = 2 ** 31 - 1
    MIN_NUM = -2 ** 31

    total = 0
    index = 0
    sign = 1

    while index < len(s) and s[index] == ' ':
        index += 1

    if index < len(s) and (s[index] == '-' or s[index] == '+'):
        sign = -1 if s[index] == '-' else 1
        index += 1

    while index < len(s) and s[index].isdigit():
        digit = ord(s[index]) - ord('0')
        if total > (MAX_NUM - digit) / 10:
            return MAX_NUM if sign > 0 else MIN_NUM
        total = total * 10 + digit
        index += 1

    return total * sign