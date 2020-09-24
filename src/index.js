const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config");
const axios = require("axios");
var cors = require('cors');
const failsDetector = require("./util/failsDetector");
const idValidation = require("./util/idValidation");

require("dotenv").config();

const UIport = config.UIport;
axios.defaults.baseURL = config.kartingServerPath;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/luigi", async (req, res) => {
    if (!req.body.personIDsArray || !req.body.dataSource) {
        res.json("the fields you sent are empty");
    } else {
        let { isValid, resArray } = idValidation(req.body.personIDsArray);
        if (isValid) {
            await axios
            .post(`/luigiRun`, req.body, {headers: { 'authorization' : process.env.KARTING_TOKEN}})
            .then(async (res) => {
                resArray = await failsDetector(
                    req.body.personIDsArray,
                    req.body.dataSource,
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
