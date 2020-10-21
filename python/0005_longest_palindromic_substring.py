# https://leetcode.com/problems/longest-palindromic-substring/
# O(n^2) time complexity
# O(1) space complexity
def find_longest_palindrome(s):
    def find_palindrome(s, i, j):
        while i >= 0 and j < len(s):
            if s[i] != s[j]:
                break
            i -= 1
            j += 1
        return [i + 1, j]

    longest_palindrome = [0, 1]
    for i in range(1, len(s)):
        odd_palindrome = find_palindrome(s, i - 1, i + 1)
        even_palindrome = find_palindrome(s, i - 1, i)
        palindrome = max(odd_palindrome, even_palindrome, key=lambda x: x[1] - x[0])
        longest_palindrome = max(longest_palindrome, palindrome, key=lambda x: x[1] - x[0])
    return s[longest_palindrome[0]: longest_palindrome[1]]
