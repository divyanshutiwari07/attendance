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

const listOfRegisteredUsers = require('./list-of-register-user.json');

// app.listen(3000, () => {
//  console.log("Server running on port 3000");
// });

// Initialize our websocket server on port 5000
server.listen(3000, () => {
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
        res.json(empRecord);
    } else if( req.body.awi_chart_data ) {
        console.log("===================== Serving chart data ======================= ");
        res.json(chartData);
    } else {
        console.log("===================== Serving normal data ======================= ");
        res.json(empData);
    }

});

app.post('/list_of_registered_users', (req, res, next) => {
    console.log("=========== Serving list_of_registered_users =============");
    res.json(listOfRegisteredUsers);
})

io.on('connection', function (socket) {
    console.log('user connected');

    socket.emit('news', { hello: 'world' });
    socket.on('my-event', function (data) {
        console.log(data);
    });
});




// let app = require("express")();
// let http = require("http").Server(app);
// let io = require("socket.io")(http);

// io.on("connection", socket => {
//   // Log whenever a user connects
//   console.log("user connected");

//   // Log whenever a client disconnects from our websocket server
//   socket.on("disconnect", function() {
//     console.log("user disconnected");
//   });

// //   socket.on("message", message => {
// //     console.log("Message Received: " + message);
// //     io.emit("message", { type: "new-message from divyanshu", text: message });
// //   });
//   socket.on("message", () => {
//     console.log("Message Received: " );
//     io.emit("message", { type: "new-message from divyanshu" });
//   });
// });

// // Initialize our websocket server on port 5000
// http.listen(5000, () => {
//   console.log("started on port 5000");
// });

