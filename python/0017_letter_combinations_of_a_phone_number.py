# https://leetcode.com/problems/letter-combinations-of-a-phone-number/
# O(3^N * 4^M) time complexity
# O(3^N * 4^M) space complexity, where
# N is the number of digits in the input that map to 3 letters
# M is the number of digits in the input that map to 4 letters
def find_letter_combinations(digits):
    mapping = {
        '2': ('a', 'b', 'c'),
        '3': ('d', 'e', 'f'),
        '4': ('g', 'h', 'i'),
        '5': ('j', 'k', 'l'),
        '6': ('m', 'n', 'o'),
        '7': ('p', 'q', 'r', 's'),
        '8': ('t', 'u', 'v'),
        '9': ('w', 'x', 'y', 'z')
    }

    def backtrack(start=0, combination=[]):
        if start == len(digits):
            output.append(''.join(combination))
            return
        for letter in mapping[digits[start]]:
            combination.append(letter)
            backtrack(start+1, combination)
            combination.pop()

    output = []
    backtrack()
    return output
