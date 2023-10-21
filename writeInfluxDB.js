const { InfluxDB } = require('@influxdata/influxdb-client')
const { Point } = require('@influxdata/influxdb-client')
const fs = require('fs');
require('dotenv').config()
const files = fs.readdirSync('./allure-results');

const results = files.filter((obj) => obj.includes('result'));

let arrayResultAT = [];

for (const namaFile of results) {
    const rawDataAT = fs.readFileSync(`./allure-results/${namaFile}`);
    const resultAT = JSON.parse(rawDataAT);
    arrayResultAT.push(resultAT);
}

let newListSTE = arrayResultAT.map(arr => {
    const uidSTE = arr.name.split(' ');
    if (!uidSTE[1].includes('@TDOSS') && uidSTE[1].includes('@')) {
        return uidSTE[1];
    }
});

newListSTE = newListSTE.filter(function (element) {
    return element !== undefined;
});

const uniqueListSTE = [...new Set(newListSTE)]

let summaryTC = {};

const countPassed = arrayResultAT.reduce((acc, obj) => {
    if (obj.status == 'passed') {
        return acc + 1;
    }
    return acc;
}, 0);

const countFailed = arrayResultAT.reduce((acc, obj) => {
    if (obj.status == 'failed') {
        return acc + 1;
    }
    return acc;
}, 0);

const countSkipped = arrayResultAT.reduce((acc, obj) => {
    if (obj.status == 'skipped') {
        return acc + 1;
    }
    return acc;
}, 0);

summaryTC['totalTC'] = countPassed + countFailed + countSkipped;
summaryTC['passed'] = countPassed;
summaryTC['failed'] = countFailed;
summaryTC['skipped'] = countSkipped;


let summarySTE = [];

for (const ste of uniqueListSTE) {
    let objSTE = {};
    const count = arrayResultAT.reduce((acc, obj) => {
        if (obj.name.includes(ste)) {
            return acc + 1;
        }
        return acc;
    }, 0);

    const countPassed = arrayResultAT.reduce((acc, obj) => {
        if (obj.name.includes(ste) && obj.status == 'passed') {
            return acc + 1;
        }
        return acc;
    }, 0);

    const countFailed = arrayResultAT.reduce((acc, obj) => {
        if (obj.name.includes(ste) && obj.status == 'failed') {
            return acc + 1;
        }
        return acc;
    }, 0);

    const countSkipped = arrayResultAT.reduce((acc, obj) => {
        if (obj.name.includes(ste) && obj.status == 'skipped') {
            return acc + 1;
        }
        return acc;
    }, 0);

    objSTE['uid'] = ste;
    objSTE['totalTC'] = count;
    objSTE['passed'] = countPassed;
    objSTE['failed'] = countFailed;
    objSTE['skipped'] = countSkipped;

    summarySTE.push(objSTE);
}

// Set up connection information
const token = process.env.TOKEN;
const influxOrg = process.env.INFLUX_ORG;
const influxBucket = process.env.INFLUX_BUCKET;

// Create InfluxDB client instance
const influxDBClient = new InfluxDB({ url: process.env.INFLUX_URL, token: token })

const timestamp = new Date();

// Write JSON data to InfluxDB using Flux
const writeArrayJSONToInfluxDB = async (jsonArray) => {
    const writeApi = influxDBClient.getWriteApi(influxOrg, influxBucket)

    for (const json of jsonArray) {
        const point = new Point(json.measurement)
            .tag('tag', json.tags)
            .floatField(json.field, json.value)
            .timestamp(timestamp)
        writeApi.writePoint(point)
    }

    await writeApi.close()
}

const jsonArraySummary = [
    { measurement: 'summary', field: 'totalTC', value: summaryTC['totalTC'] },
    { measurement: 'summary', field: 'passed', value: summaryTC['passed'] },
    { measurement: 'summary', field: 'failed', value: summaryTC['failed'] },
    { measurement: 'summary', field: 'skipped', value: summaryTC['skipped'] }
]

writeArrayJSONToInfluxDB(jsonArraySummary)
    .then(() => console.log('JSON Summary data written to InfluxDB!'))
    .catch(error => console.error(error))

let jsonArraySummarySTE = [];

for( const summSTE of summarySTE){
    jsonArraySummarySTE.push({ measurement: 'summarySTE', tags: summSTE['uid'], field: 'totalTC', value: summSTE['totalTC'] });
    jsonArraySummarySTE.push({ measurement: 'summarySTE', tags: summSTE['uid'], field: 'passed', value: summSTE['passed'] });
    jsonArraySummarySTE.push({ measurement: 'summarySTE', tags: summSTE['uid'], field: 'failed', value: summSTE['failed'] });
    jsonArraySummarySTE.push({ measurement: 'summarySTE', tags: summSTE['uid'], field: 'skipped', value: summSTE['skipped'] });
}

writeArrayJSONToInfluxDB(jsonArraySummarySTE)
  .then(() => console.log('JSON Detail data written to InfluxDB!'))
  .catch(error => console.error(error))