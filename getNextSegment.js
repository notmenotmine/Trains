const getSegments = require('./getSegments');
const getDate = require('./getDate');
const moment = require('moment');

module.exports = (from, to, timestamp) => {
    return getSegments(from, to, getDate(timestamp))
        .then(segments => {

            const segment = segments.find(segment =>{
               return +new Date(segment.departure) > timestamp
            });
            if (segment) return Promise.resolve(segment);

            const tomorrow = +moment(timestamp).add(1,'days').startOf('day');
            return getSegments(from, to, getDate(tomorrow))
                .then(segments => {
                    return Promise.resolve(segments[0]);
                })
        })
};