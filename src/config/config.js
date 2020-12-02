const authParams = require('./authParams')
const path = require("path");

module.exports = {
    UIport: 9191,
    luigiServerPath: 'http://localHost:8310',
    kartingServerPath: 'http://localHost:3002',
    kartingLogsFolderPath: 'log/karting_logs',
    luigiLogsFolderPath: 'log/added_to_kartoffel',
    dataSourcesNames: {
        dataSources: {
            aka: "aka",
            es: "es_name",
            ads: "ads_name",
            adNN: "adNN_name",
            nvSQL: "nvSQL_name",
            lmn: "lmn_name",
            mdn: "mdn_name",
            mm: "mm_name",
            city: "city_name",
        },
        dataSourcesUI: {
            aka: "aka_UI",
            es: "es_UI",
            ads: "ads_UI",
            adNN: "adNN_UI",
            nvSQL: "nvSQL_UI",
            lmn: "lmn_UI",
            mdn: "mdn_UI",
            mm: "mm_UI",
            city: "city_UI",
        }
    },

    getTokenIntilize: {
        redisHost: 'redis://localhost',
        ClientId: authParams.clientId,
        ClientSecret: authParams.ClientSecret,
        spikeURL: `${authParams.spikeHost}:${authParams.spikePort}${authParams.tokenPath}`,
        tokenGrantType: 'client_credentials',
        tokenAudience: authParams.audience,
        tokenRedisKeyName: 'accessToken',
        spikePublicKeyFullPath: path.join(__dirname, './key.pem'),
        useRedis: true,
        httpsValidation: false,
        hostHeader: false,
    },
    kartoffelUrl: "http://localhost:3000",
};