const request = require('request');
const TelegramBot = require('node-telegram-bot-api');
const token = '467552538:AAHLmG2WapIlrA-MRAYHl2tdGY-cJFtM39c';

const bot = new TelegramBot(token, {polling: true});


bot.on("message", (msg) =>{
    const chatId = msg.chat.id;
    const stations= {
        StZheldor: 's9601675',
        StNovogireevo: 's9601737'
    }
    function getDate() {
        var TodayDate = new Date();
        return TodayDate.getFullYear() + '-' + (TodayDate.getMonth()+1) + '-' + TodayDate.getDate();
    }

    if(/\/request/.test(msg.text)) {
        return requestSend();
    }
    function requestSend() {
        let today = getDate();
       let short_title; let arrival; let train_title; let total_segments; let departure;
        const url = 'https://api.rasp.yandex.net/v3.0/search/?apikey=3402ebf0-db6a-43ca-a3bd-1ab0cf7d6fac&' +
            'format=json&from=' + stations.StZheldor + '&to=' + stations.StNovogireevo + '&lang=ru_RU&page=1&date=' + today;

        request(url, (error, response, body) => {
            body = JSON.parse(body);
            segments = JSON.stringify(body.segments);
            /*
            short_title = JSON.stringify(body.segments[0].from.short_title);
            departure = JSON.stringify(body.segments[0].departure);
            train_title = JSON.stringify(body.segments[0].thread.short_title);
            total_segments = JSON.stringify(body.pagination.total);
            arrival = JSON.stringify(body.segments[0].arrival);
            bot.sendMessage(chatId, train_title.substring(1, train_title.lastIndexOf('"')) + "\nОтправление: " + departure.substr(12, 5) + "\nПрибытие: " + arrival.substr(12, 5));
            //bot.sendMessage(chatId, JSON.stringify(body));
            */
            const nextTrain = body.segments.find(function(segment) {
                return +new Date(segment.departure) > +new Date()
            })
            train_title = JSON.stringify(nextTrain.thread.short_title);
            train_title.substring(1, train_title.lastIndexOf('"'));
            departure = JSON.stringify(nextTrain.departure).substr(12, 5);
            arrival = JSON.stringify(nextTrain.arrival).substr(12, 5);
            bot.sendMessage(chatId, train_title + "\nОтправление: " + departure + "\nПрибытие: " + arrival);
        }) //works w/ real time

    }



    if(/date/.test(msg.text)) {
        var today = getDate();
        bot.sendMessage(
            chatId,today);
        return
    }
    bot.sendMessage(chatId,'lol');

    function getStationButtons() {
        let buttons = []
        buttons.push({
            text: 'жд -> новогир',
            callback_data: {action: 'requestZdNovog'}
        })
        return buttons
    }
    if(/\/keyboard/.test(msg.text)) {
        const params = {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Тест',
                        callback_data: 'data'
                    },{
                        text: 'Тест2',
                        callback_data: 'data'
                    }],
                    [{
                        text: 'Тест',
                        callback_data: 'data'
                    }]
                ]
            }
        };
        message = bot.sendMessage(
            chatId,'Клавиатура активирована!', params);
        return {
            inline_keyboard: [
                getStationButtons()
            ]
        }
    }

})


/*
url in promise
  // var url = 'https://api.rasp.yandex.net/v3.0/search/?apikey=3402ebf0-db6a-43ca-a3bd-1ab0cf7d6fac&format=json&from='+stations.StZheldor + '&to='+ stations.StNovogireevo +'&lang=ru_RU&page=1&date='+today;
  //bot.sendMessage(chatId, url);
  //xhr.open('GET', url, true);
*/