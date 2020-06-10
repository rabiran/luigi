const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config");
const axios = require('axios');

const UIport = config.UIport;
const kartingPort = config.kartingPort;
axios.defaults.baseURL = config.kartingServerPth;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/luigi", async (req, res) => {
    // TODO: add validation test on the input
  if (!req.body.personIDsArray || !req.body.dataSource) {
    res.json("there is an error with the input");
  } else {
    await axios.post("/immediateRun" , req.body)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    res.json("successfully added");
  }
});

app.listen(UIport, () => console.log("luigi server run on port:" + UIport));
