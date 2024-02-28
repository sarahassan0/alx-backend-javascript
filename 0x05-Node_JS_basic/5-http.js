const http = require('http');
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
  let printedData = `Number of students: ${data.length}\n`;

  const fieldsData = getFieldsData(data);
  for (const field in fieldsData) {
    if (fieldsData[field]) {
      const fieldData = fieldsData[field];
      printedData += `Number of students in ${field}: ${fieldData.length}. List: ${fieldData.join(', ')}\n`;
    }
  }
  return (printedData.slice(0, -1));
}

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      if (data) {
        const feildData = data.split('\n').filter((ele, i) => ele !== '' && i !== 0);
        const printedData = printData(feildData);
        resolve(printedData);
      }
    });
  });
}

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const databasePath = process.argv[2];
    countStudents(databasePath)
      .then((data) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        const data2 = `This is the list of our students\n${data}`;
        res.end(data2);
      })
      .catch((error) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`This is the list of our students\n${error.message}`);
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found\n');
  }
});

app.listen(1245);

module.exports = app;
