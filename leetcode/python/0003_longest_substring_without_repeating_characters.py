# https://leetcode.com/problems/longest-substring-without-repeating-characters/
# O(n) time complexity
# O(min(n,m)) space complexity
# n is the length of input string
# m is the size of the charset
def length_of_longest_substring(s):
    left_bound = max_length = 0
    dictionary = {}
    for right_bound, char in enumerate(s):
        if char in dictionary:
            left_bound = max(left_bound, dictionary[char] + 1)
        dictionary[char] = right_bound
        max_length = max(max_length, right_bound - left_bound + 1)
    return max_length
