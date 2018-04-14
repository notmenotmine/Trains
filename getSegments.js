const request = require('request');
const getTodayDate = require('./getTodayDate')

module.exports = (from, to, date) => {
    const url = 'https://api.rasp.yandex.net/v3.0/search/?apikey=3402ebf0-db6a-43ca-a3bd-1ab0cf7d6fac&' +
        'format=json&from=' + from + '&to=' + to + '&lang=ru_RU&limit=200&date=' + date;
    console.log(url);
    return new Promise((resolve, reject) => {// объявлен промис
        request(url, (error, response, body) => { // отправляется запрос и вешаются колбэки
            if (error) return reject(error) //если что=то не так, то возвр тект ошибки
            body = JSON.parse(body);
            return resolve(body.segments); // "иначе" при успешном выполнении текст ответа запроса
        });
    });
};
/*
return new Promise(function(resolve, reject){
        request(url, function(error, response, body){
            if (error) return reject(error)
            body = JSON.parse(body);
            return resolve(body.segments);
        });
    });
*/