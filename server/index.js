var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var server = require('http').Server(app);
var io = require('socket.io')(server);



const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const empData = require('./employee.json');

const empRecord = require('./emp-record.json');

const chartData = require('./chart-data.json');
const chartData1 = require('./chart-data1.json');
    
const listOfRegisteredUsers = require('./list-of-register-user.json');
const newEmpCameInFrontOfCamera = require('./new-emp-data.json');
const login = require('./login.json');
const rejectAttendance = require('./reject-attendance.json');
const listOfSources = require('./list-of-sources.json');

const arrivedVisitors = require("./arrived-visitors");
const expectedVisitors = require("./expected-visitors");

// app.listen(3000, () => {
//  console.log("Server running on port 3000");
// });

// Initialize our websocket server on port 5000
server.listen(5000, () => {
    console.log("started on port 5000");
});

app.post("/employee-attendance", (req, res, next) => {
    console.log("=========== BOdy Payload =============");
    console.log(req.body);

    console.log("============ Header ==============");
    console.log(JSON.stringify(req.headers));

    console.log(req.body.awi_label);

    if( req.body.awi_label ) {
        console.log("===================== Serving employee data ======================= ");
        setTimeout(() => {
            res.json(empRecord);
        }, 2000);
    } else if( req.body.awi_chart_data ) {
        console.log("===================== Serving chart data ======================= ");
        res.json(chartData);
        // res.json(chartData1);
    } else {
        console.log("===================== Serving normal data ======================= ");
        res.json(empData);
    }

});

app.post('/login', (req, res, next) => {
    console.log(res.body);
    console.log("=========== Serving login =============");
    res.json(login);
})

app.post('/list_of_registered_users', (req, res, next) => {
    console.log("=========== Serving list_of_registered_users =============");
    res.json(listOfRegisteredUsers);
})

app.post('/rejectAttendance', (req, res, next) => {
    console.log("=========== Serving reject attendance response=============");
    res.json(rejectAttendance);
})

app.post('/list_of_sources', (req, res, next) => {
    console.log(res.body);
    console.log("=========== Serving list of sources =============");
    res.json(listOfSources);
})

app.post('/arrived-visitors', (req, res, next) => {
    console.log("=========== Serving arrived visitors =============");
    res.json(arrivedVisitors);
});

app.post('/expected-visitors', (req, res, next) => {
    console.log("=========== Serving expected visitors=============");
    res.json(expectedVisitors);
});
// io.on('connection', function (socket) {
//     console.log('user connected');

//     socket.emit('news', { hello: 'world' });
//     socket.on('my-event', function (data) {
//         console.log(data);
//     });
// });

io.on("connection", socket => {
    // Log whenever a user connects
    console.log("user connected");
  
    // Log whenever a client disconnects from our websocket server
    socket.on("disconnect", function() {
      console.log("user disconnected");
    });
  
  //   socket.on("message", message => {
  //     console.log("Message Received: " + message);
  //     io.emit("message", { type: "new-message from divyanshu", text: message });
  //   });
  
    socket.on("message", () => {
        setTimeout(() => {
        console.log("Message Received: " );
            io.emit("message", newEmpCameInFrontOfCamera);
        }, 5000);
      });
  
    
});
