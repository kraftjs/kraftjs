# https://leetcode.com/problems/reverse-nodes-in-k-group/
# O(n) time complexity
# O(1) space complexity
class ListNode:
  def __init__(self, val: int = 0, next: 'ListNode' = None):
    self.val = val
    self.next = next


class Solution:
  def reverse_kgroup(self, head: ListNode, k: int) -> ListNode:
    dummy = prev = ListNode(0, head)
    curr = scout = head
    tail = None

    while curr:

      i = 0
      while scout and i < k:
        if i == k - 1:
          tail = scout
        scout = scout.next
        i += 1

      if i != k:
        break

      tail.next = None
      newHead = self.reverse(curr)
      prev.next = newHead
      curr.next = scout
      prev = curr
      curr = curr.next

    return dummy.next


  def reverse(self, head: ListNode) -> ListNode:
    prev = None
    while head:
      next = head.next
      head.next = prev
      prev = head
      head = next
    return prev
