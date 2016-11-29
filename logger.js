var fs = require('fs');
var path = require('path');
var moment = require('moment');
var v = require('./values')
var schedule = require('node-schedule');

// daily
var j = schedule.scheduleJob('0 0 * * *', createWriteStreams);

/*
v.LOG_PATH
v.LOG_FILENAME_STUDENT
v.LOG_FILENAME_TEACHER
*/

if (!fs.existsSync(v.LOG_PATH)){
  fs.mkdirSync(v.LOG_PATH);
}

var studentWS;
var teacherWS;

createWriteStreams();

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

function todayString() {
  return moment().format('YYYYMMDD');
}

function createWriteStreams() {
  var today = todayString();
  var oldStudentWS = studentWS;
  var oldTeacherWS = teacherWS;
  studentWS = fs.createWriteStream(path.join(v.LOG_PATH, `${v.LOG_FILENAME_STUDENT}.${today}`), {flags: 'a'});
  teacherWS = fs.createWriteStream(path.join(v.LOG_PATH, `${v.LOG_FILENAME_TEACHER}.${today}`), {flags: 'a'});
  oldStudentWS.end();
  oldTeacherWS.end();
}

module.exports = {
  write: write
};
