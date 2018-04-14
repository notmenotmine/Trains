const request = require('request');
const TelegramBot = require('node-telegram-bot-api');
const getSegments = require('./getSegments');
const getNextTrain = require('./getNextTrain');
const getPrevTrain = require('./getPrevTrain');
const getNextSegment = require('./getNextSegment');
const getPrevSegment = require('./getPrevSegment');
const getTodayDate = require('./getTodayDate');
const getTrainInfoBySegment = require('./getTrainInfoBySegment');
const getInlineKeyboardForTrain = require('./getInlineKeyboardForTrain');

const token = '467552538:AAHLmG2WapIlrA-MRAYHl2tdGY-cJFtM39c';
// 123

const bot = new TelegramBot(token, {polling: true});

bot.on('callback_query', callbackQuery => {
    bot.answerCallbackQuery(callbackQuery.id, {text: '...'})
    const data = JSON.parse(callbackQuery.data);
    const chatId = callbackQuery.from.id

    switch (data.do) {
        case 'showTrain':
            getNextSegment(data.f, data.t, +new Date())
                .then(segment => {
                    const inline_keyboard = getInlineKeyboardForTrain({ from: data.f, to: data.t }, +new Date(segment.departure));
                    bot.sendMessage(chatId, getTrainInfoBySegment(segment), { reply_markup: { inline_keyboard: inline_keyboard } });
                });
            break;
        case 'prev':
            getPrevSegment(data.f, data.t, data.d)
                .then(segment => {
                const inline_keyboard = getInlineKeyboardForTrain({ from: data.f, to: data.t }, +new Date(segment.departure));//дата относительно которой создаются кнопки
                const text = getTrainInfoBySegment(segment);
                const options = {
                    chat_id: chatId,
                    message_id: callbackQuery.message.message_id,
                    reply_markup: { inline_keyboard: inline_keyboard }
                };
                bot.editMessageText(text, options);
            });
            break;



            // getPrevSegment(data.f, data.t).then(segments => {
            //     const segment = getPrevTrain(segments, data.d);
            //     const inline_keyboard = getInlineKeyboardForTrain({ from: data.f, to: data.t }, +new Date(segment.departure));
            //     const text = getTrainInfoBySegment(segment);
            //     const options = {
            //         chat_id: chatId,
            //         message_id: callbackQuery.message.message_id,
            //         reply_markup: { inline_keyboard: inline_keyboard }
            //     }
            //     bot.editMessageText(text, options);
            // });
            // break;
        case 'next':
            getNextSegment(data.f, data.t, data.d)
                .then(segment => {
                    const inline_keyboard = getInlineKeyboardForTrain({ from: data.f, to: data.t }, +new Date(segment.departure));
                    const text = getTrainInfoBySegment(segment);
                    const options = {
                        chat_id: chatId,
                        message_id: callbackQuery.message.message_id,
                        reply_markup: { inline_keyboard: inline_keyboard }
                    };
                    bot.editMessageText(text, options);
                });
            break;

            // getSegments(data.f, data.t).then(segments => {
            //     const segment = getNextTrain(segments, data.d);
            //     const inline_keyboard = getInlineKeyboardForTrain({ from: data.f, to: data.t }, +new Date(segment.departure));
            //     const text = getTrainInfoBySegment(segment);
            //     const options = {
            //         chat_id: chatId,
            //         message_id: callbackQuery.message.message_id,
            //         reply_markup: { inline_keyboard: inline_keyboard }
            //     }
            //     bot.editMessageText(text, options);
            // });
            // break;


    }
})


bot.on("message", (msg) =>{
    const chatId = msg.chat.id;
    const stations= {
        StZheldor: 's9601675',
        StNovogireevo: 's9601737',
        StKurskya: 's2000001',
        StReutov: 's9600796'
    }

    if(/\/keyboard/.test(msg.text)) {
        const callbackData = [
            {
                do: 'showTrain',
                f: stations.StZheldor,
                t: stations.StNovogireevo
            },{
                do: 'showTrain',
                f: stations.StNovogireevo,
                t: stations.StZheldor
            },{
                do: 'showTrain',
                f: stations.StZheldor,
                t: stations.StKurskya
            },{
                do: 'showTrain',
                f: stations.StKurskya,
                t: stations.StZheldor
            }
        ]
        const params = {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Жлдр => Новогир',
                        callback_data: JSON.stringify(callbackData[0])
                    },{
                        text: 'Обратно',
                        callback_data: JSON.stringify(callbackData[1])
                    }],
                    [{
                        text: 'Жлдр => Курская',
                        callback_data: JSON.stringify(callbackData[2])
                    },{
                        text: 'Обратно',
                        callback_data: JSON.stringify(callbackData[3])
                    }]
                ]
            }
        };
        bot.sendMessage(chatId, 'Клавиатура активирована!', params);
        // return {
        //     inline_keyboard: [
        //         getStationButtons()
        //     ]
        // }
    }

    function getDate() {
        var TodayDate = new Date();
        return TodayDate.getFullYear() + '-' + (TodayDate.getMonth()+1) + '-' + TodayDate.getDate();
    }

    if(/\/request/.test(msg.text)) {
        return requestSend();
    }
    //
    // function requestSend(from, to) {
    //     let today = getDate();
    //    let short_title; let arrival; let train_title; let total_segments; let departure;
    //     const url = 'https://api.rasp.yandex.net/v3.0/search/?apikey=3402ebf0-db6a-43ca-a3bd-1ab0cf7d6fac&' +
    //         'format=json&from=' + from + '&to=' + to + '&lang=ru_RU&page=1&date=' + today;
    //
    //     request(url, (error, response, body) => {
    //         body = JSON.parse(body);
    //         segments = JSON.stringify(body.segments);
    //         /*
    //         short_title = JSON.stringify(body.segments[0].from.short_title);
    //         departure = JSON.stringify(body.segments[0].departure);
    //         train_title = JSON.stringify(body.segments[0].thread.short_title);
    //         total_segments = JSON.stringify(body.pagination.total);
    //         arrival = JSON.stringify(body.segments[0].arrival);
    //         bot.sendMessage(chatId, train_title.substring(1, train_title.lastIndexOf('"')) + "\nОтправление: " + departure.substr(12, 5) + "\nПрибытие: " + arrival.substr(12, 5));
    //         //bot.sendMessage(chatId, JSON.stringify(body));
    //         */
    //         const nextTrain = body.segments.find(function(segment) {
    //             return +new Date(segment.departure) > +new Date()
    //         })
    //         train_title = JSON.stringify(nextTrain.thread.short_title);
    //         train_title.substring(1, train_title.lastIndexOf('"'));
    //         departure = JSON.stringify(nextTrain.departure).substr(12, 5);
    //         arrival = JSON.stringify(nextTrain.arrival).substr(12, 5);
    //         bot.sendMessage(chatId, train_title + "\nОтправление: " + departure + "\nПрибытие: " + arrival);
    //     }) //works w/ real time
    // }

    if(/date/.test(msg.text)) {
        var today = getDate();
        bot.sendMessage(
            chatId,today);
        return
    }
    // убрать лол
    bot.sendMessage(chatId,'lol');

    // function getStationButtons() {
    //     let buttons = []
    //     buttons.push({
    //         text: 'жд -> новогир',
    //         callback_data: {action: 'requestZdNovog'}
    //     })
    //     return buttons
    // }

})


/*
url in promise
  // var url = 'https://api.rasp.yandex.net/v3.0/search/?apikey=3402ebf0-db6a-43ca-a3bd-1ab0cf7d6fac&format=json&from='+stations.StZheldor + '&to='+ stations.StNovogireevo +'&lang=ru_RU&page=1&date='+today;
  //bot.sendMessage(chatId, url);
  //xhr.open('GET', url, true);
*/