var express = require("express");
var app = express();
var bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const empData = require('./employee.json');

const empRecord = require('./emp-record.json');

const chartData = require('./chart-data.json');

app.listen(3000, () => {
 console.log("Server running on port 3000");
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
