const moment = require('moment');
const declOfNum = require('./declOfNum');

module.exports = (segment) => {
    var train_title = JSON.stringify(segment.thread.short_title);
    train_title = train_title.substring(1, train_title.lastIndexOf('"'));
    const departure = JSON.stringify(segment.departure).substr(12, 5);

    var diffToReturn;
    var curTime = moment();
    var depTime = moment(segment.departure);
    var difference = {
        h: depTime.diff(curTime, 'hours'),
        m: depTime.diff(curTime, 'minutes') % 60
    };

        if (difference <= 0)
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




    const arrival = JSON.stringify(segment.arrival).substr(12, 5);
    // return train_title + "\nОтправление: " + departure + "\nПрибытие: " + arrival + "\n" + diffToReturn;
    return `<b>${train_title}</b> \nОтправление: ${departure} \nПрибытие: ${arrival} \n\n${diffToReturn}`;
}
