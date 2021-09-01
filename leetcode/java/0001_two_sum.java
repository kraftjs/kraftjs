// https://leetcode.com/problems/two-sum/
// O(n) time complexity
// O(n) space complexity
import java.util.*;
class Solution_0001 {
  public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
      int curr = nums[i];
      int diff = target - curr;
      if (map.containsKey(diff)) {
        return new int[] { map.get(diff), i };
      }
      map.put(curr, i);
    }
    return null;
  }
}
