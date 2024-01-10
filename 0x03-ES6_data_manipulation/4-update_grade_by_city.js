export default function updateStudentGradeByCity(students, city, newGrades) {
  if (!Array.isArray(students)) return [];

  return students
    .filter((student) => student.location === city)
    .map((student) => {
      const grades = newGrades.filter((grade) => grade.studentId === student.id);
      const grade = grades[0] ? grades[0].grade : 'N/A';
      return { ...student, grade };
    });
}
