# https://leetcode.com/problems/binary-tree-maximum-path-sum/
# O(n) time complexity
# O(H) space complexity (worst case O(n), average case O(log(n))
# where n is the number of nodes and H is the height of the binary tree
def max_path_sum(root):
    def recursive_value_check(node, max_val):
        if node is None:
            return 0

        left = recursive_value_check(node.left, max_val)
        right = recursive_value_check(node.right, max_val)
        local_max = max(node.val, node.val + left, node.val +
                        right, node.val + left + right)
        max_val[0] = max(local_max, max_val[0])
        return max(node.val, node.val + left, node.val + right)

    max_val = [float('-inf')]
    recursive_value_check(root, max_val)
    return max_val[0]
