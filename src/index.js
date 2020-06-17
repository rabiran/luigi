const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config");
const axios = require('axios');
const validator = require('./config/validators');
const collectLogs = require('./utils/collectLogs')

const UIport = config.UIport;
axios.defaults.baseURL = config.kartingServerPth;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/luigi", async (req, res) => {
  if (!req.body.personIDsArray || !req.body.dataSource) {
    res.json("the fields you sent are empty");
  } else {
    let resArray = [];
    let validationCheckFlag = true;
    req.body.personIDsArray.forEach(async idObj => {
      if (idObj.identityCard != undefined && !validator(idObj.identityCard).identityCard) {
        resArray.push(`${idObj.identityCard}:  this field is incorrect\n`);
        validationCheckFlag = false;
      }
      if(idObj.personalNumber != undefined && !validator(idObj.personalNumber).personalNumber){
        resArray.push(`${idObj.personalNumber}:  this field is incorrect\n`);
        validationCheckFlag = false;
      }
    });

    if (validationCheckFlag) {
      await axios.post("/immediateRun", req.body)
        .then((res) => {
          console.log(res.data);
          
          resArray.push(`successfully added`);
        }).catch((err) => {
          console.log(err);
          resArray.push(`${err}`);
        })
    }
    collectLogs(req.body.personIDsArray);
    res.json(resArray);
  }
});

app.listen(UIport, () => console.log("luigi server run on port:" + UIport));