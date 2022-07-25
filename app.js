const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const JSONData = JSON.stringify(data);

  const url = "https://us18.api.mailchimp.com/3.0/lists/49914c3855";
  const options = {
    method: "POST",
    auth: "fellah:c4f9c3bdc37964f71882c9be69721df8-us1",
  };

  const request = https.request(url, options, function (response) {
    const statusCode = response.statusCode;

    if (statusCode === 200) {
      // res.send("<h1>Successfuly subscribed</h1>");
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    // console.log("statusCode:", response.statusCode);
    response.on("data", function (data) {
      // console.log(JSON.parse(data));
    });
  });

  request.write(JSONData);
  request.end();
});

app.listen(3000, function () {
  console.log("Started to listen on port 3000");
});

// the endpoint
// https://<dc>.api.mailchimp.com/3.0/

// Api key
// c4f9c3bdc37964f71882c9be69721df8-us18

// list id
// 49914c3855
