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
        }
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
        }]
    ];
}