const TelegramBot = require('node-telegram-bot-api');
const getNextSegment = require('./getNextSegment');
const getPrevSegment = require('./getPrevSegment');
const getTrainInfoBySegment = require('./getTrainInfoBySegment');
const getInlineKeyboardForTrain = require('./getInlineKeyboardForTrain');
const getInlineWithTrains = require('./getInlineWithTrains');
const moment = require('moment');

//const token = '467552538:AAHLmG2WapIlrA-MRAYHl2tdGY-cJFtM39c';
const token = '552915665:AAGV5520Y6yIaw4szf74kOEPc3j-mKbTaYs';


const bot = new TelegramBot(token, {polling: true}); //local
const options = {
    webHook: {
        port: process.env.PORT
    }
};

const url = process.env.APP_URL || 'https://yatrainstimetable.herokuapp.com:443';
// const bot = new TelegramBot(token, {polling: true});
//const bot = new TelegramBot(token, options); //heroku

//bot.setWebHook(`${url}/bot${token}`); //heroku

bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    if (/\/start/.test(msg.text)) {
        bot.sendMessage(chatId, `Бот запущен! \nЧтобы получать расписание отправь боту команду /keyboard и в появившемся списке выбери нужный маршрут😉`);
    }
    if (/\/time/.test(msg.text)) {
        bot.sendMessage(chatId, moment().format())
    }
    if (/\/date/.test(msg.text)) {
        var today = new Date();
            bot.sendMessage(
                chatId, `Дата: ${today}`);
            return;
    }
    //if((msg.text  !== '/keyboard' || msg.sticker))
    //bot.sendMessage(chatId, 'lol');
    if (/\/help/.test(msg.text)) {
        bot.sendMessage(chatId, `помощь`);
    }

    if (/\/keyboard/.test(msg.text)) {
        const params = {
            reply_markup: {
                inline_keyboard: getInlineWithTrains()
            }
        };
        bot.sendMessage(chatId, 'Выбери нужный маршрут:', params);
    }
});

bot.on('callback_query', callbackQuery => {
    bot.answerCallbackQuery(callbackQuery.id, {text: '...'})
    const data = JSON.parse(callbackQuery.data);
    const chatId = callbackQuery.from.id;

    switch (data.do) {
        case 'showTrain':
            getNextSegment(data.f, data.t, +new Date())
                .then(segment => {
                    const inline_keyboard = getInlineKeyboardForTrain({
                        from: data.f,
                        to: data.t
                    }, +new Date(segment.departure));
                    const text = getTrainInfoBySegment(segment);
                    const options = {
                        chat_id: chatId,
                        message_id: callbackQuery.message.message_id,
                        reply_markup: {inline_keyboard: inline_keyboard},
                        parse_mode: 'html'
                    };
                    bot.editMessageText(text, options);
                });
            break;
        case 'prev':
            getPrevSegment(data.f, data.t, data.d)
                .then(segment => {
                    const inline_keyboard = getInlineKeyboardForTrain({
                        from: data.f,
                        to: data.t
                    }, +new Date(segment.departure));//дата относительно которой создаются кнопки
                    const text = getTrainInfoBySegment(segment);
                    const options ={
                        chat_id: chatId,
                        message_id: callbackQuery.message.message_id,
                        reply_markup: {inline_keyboard: inline_keyboard},
                        parse_mode: 'html'
                    };
                    bot.editMessageText(text, options);
                });
            break;
        case 'next':
            getNextSegment(data.f, data.t, data.d)
                .then(segment => {
                    const inline_keyboard = getInlineKeyboardForTrain({
                        from: data.f,
                        to: data.t
                    }, +new Date(segment.departure));
                    const text = getTrainInfoBySegment(segment);
                    const options = {
                        chat_id: chatId,
                        message_id: callbackQuery.message.message_id,
                        reply_markup: {inline_keyboard: inline_keyboard},
                        parse_mode: 'html'
                    };
                    bot.editMessageText(text, options);
                });
            break;
        case 'back':
            const inline_keyboard = getInlineWithTrains();
            const text = 'Выбери направление';
            const options = {
                chat_id: chatId,
                message_id: callbackQuery.message.message_id,
                reply_markup: {inline_keyboard: inline_keyboard}
            };
            bot.editMessageText(text, options);
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
        break;
    }
});