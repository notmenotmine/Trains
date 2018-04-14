module.exports = (segments, timestamp) => {
    return segments.find(segment => {
        const departure = +new Date(segment.departure);
        return departure > timestamp;
    })
}