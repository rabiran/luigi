const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config");
const axios = require('axios');
const validator = require('./config/validators');
const shortid = require('shortid');
const collectLogs = require('./util/collectLogs')
const failsDetector = require('./util/failsDetector')

const UIport = config.UIport;
axios.defaults.baseURL = config.kartingServerPth;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/luigi", async (req, res) => {
  if (!req.body.personIDsArray || !req.body.dataSource) {
    res.json("the fields you sent are empty");
  } else {
    let resArray = []; //not Necessarily needed
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
      let runUID = shortid.generate();
      req.body.uid = runUID;
      await axios.post("/immediateRun", req.body)
        .then(async (res) => {
          console.log(res.data);
          let failsArray = await failsDetector(req.body.personIDsArray, req.body.dataSource, runUID);
          for(failRes of failsArray){
            resArray.push(failRes);
          }
        }).catch((err) => {
          console.log(err);
          resArray.push(`${err}`);
        })
    }
    
    res.json(resArray);
  }
});

app.listen(UIport, () => console.log("luigi server run on port:" + UIport));
