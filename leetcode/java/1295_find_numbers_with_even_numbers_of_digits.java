// https://leetcode.com/problems/find-numbers-with-even-number-of-digits/
// O(n) time complexity
// O(1) space complexity
class Solution_1295 {
  public int findNumbers(int[] nums) {
    int count = 0;
    for (final int num : nums) {
      int digits = (int)Math.floor(Math.log10(Math.abs(num))) + 1;
      if (digits % 2 == 0)
        count += 1;
    }
    return count;
  }
}
