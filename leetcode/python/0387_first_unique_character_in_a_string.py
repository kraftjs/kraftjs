# https://leetcode.com/problems/first-unique-character-in-a-string/
# O(n) time complexity
# O(k) space complexity, where k is the charset
def first_unique_char(s: str) -> int:
    character_frequency = [0] * 26

    for ch in s:
        position = ord(ch) - ord('a')
        character_frequency[position] += 1

    for i, ch in enumerate(s):
        position = ord(ch) - ord('a')
        if character_frequency[position] == 1:
            return i

    return -1
