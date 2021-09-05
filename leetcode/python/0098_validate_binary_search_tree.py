# https://leetcode.com/problems/validate-binary-search-tree/
# O(n) time complexity
# O(n) space complexity
class TreeNode:
  def __init__(self, val=0, left=None, right=None):
    self.val = val
    self.left = left
    self.right = right


def is_valid_BST(root):
  def validate(node, low=float('-inf'), high=float('inf')):
    if node is None:
      return True
    
    is_curr_valid = node.val > low and node.val < high
    is_left_valid = validate(node.left, low, node.val)
    is_right_valid = validate(node.right, node.val, high)

    return is_curr_valid and is_left_valid and is_right_valid
  
  return validate(root)
