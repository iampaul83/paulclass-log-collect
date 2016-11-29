var fs = require('fs');
var path = require('path');
var v = require('./values')
/*
v.LOG_PATH
v.LOG_FILENAME_STUDENT
v.LOG_FILENAME_TEACHER
*/

var studentWS = fs.createWriteStream(path.join(v.LOG_PATH, v.LOG_FILENAME_STUDENT), {flags: 'a'});
var teacherWS = fs.createWriteStream(path.join(v.LOG_PATH, v.LOG_FILENAME_TEACHER), {flags: 'a'});

studentWS.on('error', errorHandler);
teacherWS.on('error', errorHandler);

function errorHandler(err) {
  console.log(err);
}

function write(type, jsonString) {
  var s = jsonString + '\n';
  if (type === 'student') {
    studentWS.write(s);
  }
  else if (type === 'teacher') {
    teacherWS.write(s)
  }
  else {
    console.log(`unknown log type: ${type}`);
  }
}

module.exports = {
  write: write
};
