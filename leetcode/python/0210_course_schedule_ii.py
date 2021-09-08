# https://leetcode.com/problems/course-schedule/
# O(V + E) time complexity
# O(V + E) space complexity,
# where V is the number of courses and E is the number of dependencies
from collections import defaultdict, deque


def find_order(num_courses, prerequisites):
    prereqs = defaultdict(list)
    courses_with_prereqs = defaultdict(int)

    for course, prereq in prerequisites:
        prereqs[prereq].append(course)
        courses_with_prereqs[course] += 1

    courses_without_prereqs = deque(
        [course for course in range(num_courses) if course not in courses_with_prereqs])
    course_order = []

    while courses_without_prereqs:
        course = courses_without_prereqs.popleft()
        course_order.append(course)

        for child in prereqs[course]:
            courses_with_prereqs[child] -= 1
            if courses_with_prereqs[child] == 0:
                courses_without_prereqs.append(child)

    return course_order if len(course_order) == num_courses else []
