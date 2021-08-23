// https://leetcode.com/problems/max-consecutive-ones/
// O(n) time complexity
// O(1) space complexity
class Solution {
  public int findMaxConsecutiveOnes(int[] nums) {
    int currentSubarrayLength = 0;
    int maxSubarrayLength = 0;
    for (int i = 0; i < nums.length; i++) {
      if (nums[i] != 1) {
        currentSubarrayLength = 0;
      } else {
        currentSubarrayLength += 1;
        maxSubarrayLength = Math.max(currentSubarrayLength, maxSubarrayLength);
      }
    }
    return maxSubarrayLength;
  }
}