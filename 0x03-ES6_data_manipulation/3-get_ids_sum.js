export default function getStudentIdsSum(students) {
  if (!Array.isArray(students)) return [];

  return students.reduce((sum, student) => student.id, 0);
}
