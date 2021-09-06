# https://leetcode.com/problems/roman-to-integer/
# O(1) time complexity because numbers constrained between 1 and 4000
# O(1) space complexity
def roman_to_integer(s: str) -> int:
    values = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }
    total = prev = 0
    for numeral in reversed(s):
        curr = values[numeral]
        if curr < prev:
            total -= curr
        else:
            total += curr
        prev = curr

    return total
