// https://leetcode.com/problems/squares-of-a-sorted-array/
// O(n) time complexity
// O(n) space complexity to store output
class Solution_0977 {
  public int[] sortedSquares(int[] nums) {
    int[] sortedSquareArray = new int[nums.length];
    int left = 0, right = nums.length - 1;
    for (int i = nums.length - 1; i >= 0; i--) {
      int largerMagnitude;
      if (Math.abs(nums[left]) < Math.abs(nums[right])) {
        largerMagnitude = nums[right];
        right--;
      } else {
        largerMagnitude = nums[left];
        left++;
      }
      sortedSquareArray[i] = largerMagnitude * largerMagnitude;
    }
    return sortedSquareArray;
  }
}