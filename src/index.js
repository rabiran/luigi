const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config");
const axios = require("axios");
const shortid = require("shortid");
var cors = require('cors');
const failsDetector = require("./util/failsDetector");
const idValidation = require("./util/idValidation");
const searchInKartoffel = require("./util/searchInKartoffel")

require("dotenv").config();

const UIport = config.UIport;
axios.defaults.baseURL = config.kartingServerPath;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./client/build'))

app.post("/luigi", async (req, res) => {
    if (!req.body.personIDsArray || !req.body.dataSource) {
        res.json("the fields you sent are empty");
    } else {
        let { isValid, resArray } = idValidation(req.body.personIDsArray);
        if (isValid) {
            let runUID = shortid.generate();
            req.body.uid = runUID;
            let kartoffelResultsArray = [];
            for (const idObj of req.body.personIDsArray) kartoffelResultsArray.push(await searchInKartoffel(idObj));
            await axios.post(`/immediateRun`, req.body, {headers: { 'authorization' : process.env.KARTING_TOKEN}})
            .then(async (res) => {
                resArray = await failsDetector(
                    req.body.personIDsArray,
                    req.body.dataSource,
                    res.data, 
                    kartoffelResultsArray
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

app.get("/dataSourcesNames",  (req, res) => {
    res.send(config.dataSourcesNames)
})

app.listen(UIport, () => console.log("luigi server run on port:" + UIport));
