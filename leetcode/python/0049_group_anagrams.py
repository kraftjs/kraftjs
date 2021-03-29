# https://leetcode.com/problems/group-anagrams/
# O(n*k) time complexity, where n is number of words and k is max word length
# O(n*k) space complexity
def group_anagrams(words):
    dictionary = {}
    for word in words:
        letter_frequency = [0] * 26
        for ch in word:
            letter_frequency[ord(ch) - ord('a')] += 1
        key = tuple(letter_frequency)
        dictionary.setdefault(key, [])
        dictionary[key].append(word)
    return dictionary.values()
