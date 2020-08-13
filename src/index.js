const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config");
const axios = require("axios");
const shortid = require("shortid");
const failsDetector = require("./util/failsDetector");
const idValidation = require("./util/idValidation");

require("dotenv").config();

const UIport = config.UIport;
axios.defaults.baseURL = config.kartingServerPth;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/luigi", async (req, res) => {
    if (!req.body.personIDsArray || !req.body.dataSource) {
        res.json("the fields you sent are empty");
    } else {
        let { isValid, resArray } = idValidation(req.body.personIDsArray);
        if (isValid) {
            let runUID = shortid.generate();
            req.body.uid = runUID;
            await axios
            .post("/immediateRun", req.body)
            .then(async (res) => {
                resArray = await failsDetector(
                    req.body.personIDsArray,
                    req.body.dataSource,
                    runUID, 
                    res.data
                );
            })
            .catch((err) => {
                console.log('error: '+ err.message);
                resArray.push(`${err}`);
            });
        }
        res.json(resArray);
    }
});

app.listen(UIport, () => console.log("luigi server run on port:" + UIport));
