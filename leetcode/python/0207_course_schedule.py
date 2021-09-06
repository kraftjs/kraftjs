# https://leetcode.com/problems/course-schedule/
# O(V + E) time complexity
# O(V + E) space complexity,
# where V is the number of courses and E is the number of dependencies
from collections import defaultdict


class Solution:
    def can_finish(self, num_courses, prereqs):
        course_dict = defaultdict(list)

        for prereq in prereqs:
            blocked, required = prereq[0], prereq[1]
            course_dict[required].append(blocked)

        checked = [False] * num_courses
        path = [False] * num_courses

        for course in range(num_courses):
            if self.is_cyclic(course, course_dict, checked, path):
                return False
        return True

    def is_cyclic(self, course, course_dict, checked, path):
        if checked[course]:
            return False

        if path[course]:
            return True

        path[course] = True
        is_path_cyclic = False
        for child in course_dict[course]:
            is_path_cyclic = self.is_cyclic(child, course_dict, checked, path)
            if is_path_cyclic:
                break

        path[course] = False
        checked[course] = True
        return is_path_cyclic
