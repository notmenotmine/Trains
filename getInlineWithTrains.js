const stations = require('./stationslist');
module.exports = () => {
    const callbackData = [
        {
            do: 'showTrain',
            f: stations.StZheldor,
            t: stations.StNovogireevo
        }, {
            do: 'showTrain',
            f: stations.StNovogireevo,
            t: stations.StZheldor
        }, {
            do: 'showTrain',
            f: stations.StZheldor,
            t: stations.StKurskya
        }, {
            do: 'showTrain',
            f: stations.StKurskya,
            t: stations.StZheldor
        }, {
            do: 'showTrain',
            f: stations.StZheldor,
            t: stations.StKuchino
        }, {
            do: 'showTrain',
            f: stations.StKuchino,
            t: stations.StZheldor
        }, {
            do: 'showTrain',
            f: stations.StZheldor,
            t: stations.StReutov
        }, {
            do: 'showTrain',
            f: stations.StReutov,
            t: stations.StZheldor
        }, {
            do: 'showTrain',
            f: stations.StZheldor,
            t: stations.StChukhlinka
        }, {
            do: 'showTrain',
            f: stations.StChukhlinka,
            t: stations.StZheldor
        }, {
            do: 'showTrain',
            f: stations.StZheldor,
            t: stations.StSerpMolot
        }, {
            do: 'showTrain',
            f: stations.StSerpMolot,
            t: stations.StZheldor
        },
    ];
    return [
        [{
            text: 'Жлдр => Новогир',
            callback_data: JSON.stringify(callbackData[0])
        }, {
            text: 'Обратно',
            callback_data: JSON.stringify(callbackData[1])
        }],
        [{
            text: 'Жлдр => Курская',
            callback_data: JSON.stringify(callbackData[2])
        }, {
            text: 'Обратно',
            callback_data: JSON.stringify(callbackData[3])
        }],
        [{
            text: 'Жлдр => Кучино',
            callback_data: JSON.stringify(callbackData[4])
        }, {
            text: 'Обратно',
            callback_data: JSON.stringify(callbackData[5])
        }],
        [{
            text: 'Жлдр => Реутово',
            callback_data: JSON.stringify(callbackData[6])
        }, {
            text: 'Обратно',
            callback_data: JSON.stringify(callbackData[7])
        }],
        [{
            text: 'Жлдр => Чухлинка',
            callback_data: JSON.stringify(callbackData[8])
        }, {
            text: 'Обратно',
            callback_data: JSON.stringify(callbackData[9])
        }],
        [{
            text: 'Жлдр => СерпМол',
            callback_data: JSON.stringify(callbackData[10])
        }, {
            text: 'Обратно',
            callback_data: JSON.stringify(callbackData[11])
        }]
    ];
};