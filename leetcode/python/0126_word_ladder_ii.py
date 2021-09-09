# https://leetcode.com/problems/word-ladder-ii/
# O(M^2 * N) time complexity
# O(M * N) space complexity,
# where M is the length of words and N is the number of words
from collections import defaultdict
import string


def find_ladders(begin_word, end_word, word_list):
    result = []
    words = set(word_list)
    layer = defaultdict(list)
    layer[begin_word].append([begin_word])

    while layer:
        new_layer = defaultdict(list)
        for word in layer:
            if word == end_word:
                result.extend(k for k in layer[word])
            else:
                for i in range(len(word)):
                    for ch in string.ascii_lowercase:
                        new_word = word[:i] + ch + word[i + 1:]
                        if new_word in words:
                            new_layer[new_word] += [j + [new_word] for j in layer[word]]

        words -= set(new_layer.keys())
        layer = new_layer

    return result
