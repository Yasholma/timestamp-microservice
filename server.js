// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/timestamp/:date_string?", function (req, res) {
    let dateString = req.params["date_string"];
    let datetime = "";
    if (!dateString) {
        datetime = new Date();
    } else {
        datetime = new Date(dateString);
    }
    if (!datetime.getTime()) {
        res.send({ error: datetime.toUTCString() });
        return;
    }
    res.json({ unix: datetime.getTime(), utc: datetime.toUTCString() });
});

// listen for requests :)
const PORT = 5000;
// process.env.PORT
var listener = app.listen(PORT, function () {
    // console.log("Your app is listening on port " + listener.address().port);
    console.log("Your app is listening on port " + PORT);
});
