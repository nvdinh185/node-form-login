var xlsxtojson = require("xlsx-to-json-lc");

var filename = './excel/danhsachmau.xlsx';

var arrData = [];

try {
    xlsxtojson({
        input: filename,
        output: null,
        lowerCaseHeaders: true,
        sheet: "dsdinh"
    }, (err, result) => {
        if (err) {
            console.log('err', err);
        }
        arrData = result;
    });
} catch (e) {
    console.log("Corupted excel file", e);
}

const getUsers = (req, res, next) => {
    let returnArray = arrData;

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(returnArray, (key, value) => {
        if (value === null) { return undefined; }
        return value;
    }
    ));
}

module.exports = {
    getUsers: getUsers,
};