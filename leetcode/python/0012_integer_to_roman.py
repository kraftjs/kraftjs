# https://leetcode.com/problems/integer-to-roman/
# O(1) time complexity because numbers constrained to between 1 and 4000
# O(1) space complexity
def integer_to_roman(num: int) -> str:
    NUMERAL_MAPPING = {
        1000: ('_', '_', 'M'),
        100: ('M', 'D', 'C'),
        10: ('C', 'L', 'X'),
        1: ('X', 'V', 'I')
    }

    list_of_numerals = []
    for factor in [1000, 100, 10, 1]:
        numerals = NUMERAL_MAPPING[factor]
        while num >= factor:
            if num >= 9 * factor:
                list_of_numerals.append(numerals[2] + numerals[0])
                num -= 9 * factor
            elif num >= 5 * factor:
                list_of_numerals.append(numerals[1])
                num -= 5 * factor
            elif num >= 4 * factor:
                list_of_numerals.append(numerals[2] + numerals[1])
                num -= 4 * factor
            else:
                list_of_numerals.append(numerals[2])
                num -= factor

    return ''.join(list_of_numerals)
