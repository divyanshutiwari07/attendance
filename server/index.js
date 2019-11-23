var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

var empData = require('./employee.json');

app.listen(3000, () => {
 console.log("Server running on port 3000");
});


app.post("/employee-attendance", (req, res, next) => {
    console.log("=========== BOdy Payload =============");
    console.log(req.body);

    console.log("============ Header ==============");
    console.log(JSON.stringify(req.headers));
    res.json(empData);
});