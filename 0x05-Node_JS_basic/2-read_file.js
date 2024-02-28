const fs = require('fs');

function getFieldsData(data) {
  const students = {};

  for (let row of data) {
    row = row.split(',');
    const field = row[3];
    const firstname = row[0];
    if (students[field]) {
      students[field].push(firstname);
    } else {
      students[field] = [firstname];
    }
  }
  return (students);
}

function printData(data) {
  console.log(`Number of students: ${data.length}`);

  const fieldsData = getFieldsData(data);
  for (const field in fieldsData) {
    if (fieldsData[field]) {
      const fieldData = fieldsData[field];
      console.log(`Number of students in ${field}: ${fieldData.length}. List: ${fieldData.join(', ')}`);
    }
  }
}

function countStudents(path) {
  try {
    let data = fs.readFileSync(path, 'utf-8');
    if (data) {
      data = data.split('\n').filter((ele, i) => ele !== '' && i !== 0);
      printData(data);
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
