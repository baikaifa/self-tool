const { writeFile, readFile } = require('fs');
const { parseString } = require('xml2js');
const { resolve } = require('path');
module.exports = {
    getUserDataAsync(req) {
        return new Promise((resolve, reject) => {
            let xmlData = '';
            req.on('data', data => {
                xmlData += data.toString();
            })
                .on('end', () => {
                    resolve(xmlData);
                })
        })
    },
    parseXMLAsync(xmlData) {
        return new Promise((resolve, reject) => {
            parseString(xmlData, { trim: true }, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject('parseXMLAsync方法出了问题' + err);
                }
            })
        })
    },
    formatMessage(jsData) {
        let message = {};
        jsData = jsData.xml;
        for (let key in jsData) {
            let value = jsData[key];
            message[key] = value[0];
        }
        return message;
    },
    writeFileAsync(data, fileName) {
        data = JSON.stringify(data);
        const filePath = resolve(__dirname, fileName);
        return new Promise((resolve, reject) => {
            writeFile(filePath, data, err => {
                if (!err) {
                    console.log(fileName, '文件保存成功');
                    resolve();
                } else {
                    reject(fileName + 'writeFileAsync出现了' + err);
                }
            })
        })
    },
    readFileAsync(fileName) {
        const filePath = resolve(__dirname, fileName);
        return new Promise((resolve, reject) => {
            readFile(filePath, (err, data) => {
                if (!err) {
                    console.log(fileName, '文件读取成功');
                    data = JSON.parse(data);
                    resolve(data);
                } else {
                    reject('readFileAsync方法出了问题' + err);
                }
            })
        })
    }
}