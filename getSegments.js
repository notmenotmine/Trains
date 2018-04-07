const request = require('request');
const getTodayDate = require('./getTodayDate')

module.exports = (from, to) => {
    const url = 'https://api.rasp.yandex.net/v3.0/search/?apikey=3402ebf0-db6a-43ca-a3bd-1ab0cf7d6fac&' +
        'format=json&from=' + from + '&to=' + to + '&lang=ru_RU&page=1&date=' + getTodayDate();

    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) return reject(error)
            body = JSON.parse(body);
            return resolve(body.segments);
        });
    });
}