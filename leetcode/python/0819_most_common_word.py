# https://leetcode.com/problems/most-common-word/
# O(n + m) time complexity, where n is number of characters in paragraph, and
#          m is number of characters in banned.
# O(n + m) space complexity, where n is number of characters in paragraph, and
#          m is number of characters in banned.
import collections


def most_common_word(paragraph, banned):
    normalized_paragraph = ''.join(
        [ch.lower() if ch.isalpha() else ' ' for ch in paragraph])
    words = normalized_paragraph.split()

    banned_lookup = set(banned)
    word_frequency = collections.defaultdict(int)

    for word in words:
        if word not in banned_lookup:
            word_frequency[word] += 1

    return max(word_frequency, key=word_frequency.get)
