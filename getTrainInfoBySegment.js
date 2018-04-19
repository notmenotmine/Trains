const moment = require('moment');
const declOfNum = require('./declOfNum');

module.exports = (segment) => {
   // const trainType = JSON.stringify(segment.thread.express_type);
        var train_title = JSON.stringify(segment.thread.short_title);
        train_title = train_title.substring(1, train_title.lastIndexOf('"'));
        const departure = moment(segment.departure).format('HH:mm');

        var diffToReturn;
        var curTime = moment();
        var depTime = moment(segment.departure);
        var difference = {
            h: depTime.diff(curTime, 'hours'),
            m: Math.ceil(depTime.diff(curTime, 'seconds') / 60)
        };
        var trainType = JSON.stringify(segment.thread.express_type);

            if(trainType == '"express"')
                trainType = "экспресс";
            else
                trainType = "обычный";

        if (depTime.diff(curTime) <= 0)
            diffToReturn = "Поезд ушёл";
        else {
            diffToReturn = 'Через ';
            if (difference.h) {
                diffToReturn += `${difference.h} ${declOfNum(difference.h, ['час', 'часа', 'часов'])} `
            }
            if (difference.m) {
                diffToReturn += `${difference.m} ${declOfNum(difference.m, ['минуту', 'минуты', 'минут'])}`
            }
        }


         //    var param;
         //    if (depTime.diff(curTime) <= 0)
         //        param = 0;
         //
         //        if (depTime.diff(curTime) == 1)
         //            param = 1;
         //
         //            if (depTime.diff(curTime) > 1)
         //                param = 2;
         //
         // switch(param){
         //     case '0':
         //         diffToReturn = "Поезд уже ушёл";
         //         break;
         //     case '1':
         //         diffToReturn = "Отправление сейчас";
         //         break;
         //     case '2':
         //         diffToReturn = 'Через ';
         //             if (difference.h) {
         //                 diffToReturn += `${difference.h} ${declOfNum(difference.h, ['час', 'часа', 'часов'])} `
         //             }
         //             if (difference.m) {
         //                 diffToReturn += `${difference.m} ${declOfNum(difference.m, ['минуту', 'минуты', 'минут'])}`
         //             }
         //         break;
         // }


        const arrival = moment(segment.arrival).format('HH:mm');
        // return train_title + "\nОтправление: " + departure + "\nПрибытие: " + arrival + "\n" + diffToReturn;
    // if(trainType == "экспресс")
    //     return `<b>${train_title} (${trainType})</b>\nОтправление: ${departure} \nПрибытие: ${arrival} \n\n${diffToReturn}`;
    // else
    //     return `<b>${train_title}</b>\nОтправление: ${departure} \nПрибытие: ${arrival} \n\n${diffToReturn} `;

    if(trainType == "обычный")
        return `<b>${train_title}</b>\nОтправление: ${departure} \nПрибытие: ${arrival} \n\n${diffToReturn} `;
    else if (trainType == "экспресс")
        return `<b>${train_title}</b>\nОтправление: ${departure} \nПрибытие: ${arrival} \n\n${diffToReturn} `;
};
