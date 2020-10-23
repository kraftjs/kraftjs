# https://leetcode.com/problems/merge-k-sorted-lists/
# O(n*log(k)) time complexity
# O(k) space complexity, where
# n is the the number of ListNodes
# k is the number of LinkedLists
from heapq import *


def merge_k_lists(lists):
    dummy = prev = ListNode()
    min_heap = []
    for i, node in enumerate(lists):
        if node is not None:
            heappush(min_heap, (node.val, i, node))
    while min_heap:
        _, i, node = heappop(min_heap)
        prev.next = node
        node = node.next
        prev = prev.next
        if node is not None:
            heappush(min_heap, (node.val, i, node))
    return dummy.next


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
