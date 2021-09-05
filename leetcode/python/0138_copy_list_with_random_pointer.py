# https://leetcode.com/problems/copy-list-with-random-pointer/
# O(n) time complexity
# O(n) space complexity
class Node:
  def __init__(self, val, next, random):
    self.val = val
    self.next = next
    self.random = random


class Solution:
  def __init__(self, mapping):
    self.mapping = mapping


  def recursive_copy_list(self, head):
    if head is None:
      return None

    if head in self.mapping:
      return self.mapping[head]
    
    node = Node(head.val)
    self.mapping[head] = node

    node.next = self.recursive_copy_list(head.next)
    node.random = self.recursive_copy_list(head.random)
    return node