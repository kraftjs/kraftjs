# https://leetcode.com/problems/word-ladder/solution/
# O(M^2 * N) time complexity
# O(M * N) space complexity
import string
import collections


class Solution:
    def ladder_length(self, begin_word, end_word, word_list):
        queue = collections.deque()
        words = set(word_list)
        depth = 0

        if begin_word in words:
            words.remove(begin_word)
        queue.append(begin_word)

        while queue:
            depth += 1
            for _ in range(len(queue)):
                current_word = queue.popleft()
                if current_word == end_word:
                    return depth
                neighbors = self.find_neighbors(current_word)
                for neighbor in neighbors:
                    if neighbor in words:
                        words.remove(neighbor)
                        queue.append(neighbor)
        return 0

    def find_neighbors(self, word):
        neighbors = []
        for i, _ in enumerate(word):
            for letter in string.ascii_lowercase:
                neighbors.append(word[:i] + letter + word[i+1:])
        return neighbors
