# install

```
npm isntall
```

# start

```
node index.js
```

# post json

```
curl -H "Content-Type: application/json" -X POST -d '{"iam":"paul83"}' http://localhost:3000/student
curl -H "Content-Type: application/json" -X POST -d '{"iam":"hanqqq.com"}' http://localhost:3000/teacher
```

# bad requests

```
// no "Content-Type: application/json" header(可以透過bodyParser.json設定允許)
curl -X POST -d '{"iam":"paul83"}' http://localhost:3000/student

// only POST method is accepted
curl -H "Content-Type: application/json" -X GET -d '{"iam":"paul83"}' http://localhost:3000/student

// bad json
curl -H "Content-Type: application/json" -X GET -d '{"iam":"paul83"QQ}' http://localhost:3000/student
```

# log file

- log/student
- log/teacher

# @TODO

- create a new log file every day
