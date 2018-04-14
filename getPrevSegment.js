const getSegments = require('./getSegments');
const getDate = require('./getDate');
const moment = require('moment');

module.exports = (from, to, timestamp) => {
    return getSegments(from, to, getDate(timestamp))
        .then(segments => {
            let indexOfCurrentSegment = null;
            for (let i = 0; i < segments.length; i++) {
                if (+new Date(segments[i].departure) === timestamp) {
                    indexOfCurrentSegment = i;
                }
            }

            if (indexOfCurrentSegment > 0)  {
                const indexOfPrevSegment = indexOfCurrentSegment - 1;
                const segment = segments[indexOfPrevSegment];
                return Promise.resolve(segment);
            }

            const yesterday = +moment(timestamp).subtract(1,'days').endOf('day');
            return getSegments(from, to, getDate(yesterday))
                .then(segments => {
                    return Promise.resolve(segments[segments.length-2]);
                })
        })
};