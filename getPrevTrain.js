module.exports = (segments, timestamp) => {
    return segments.find(segment => +new Date(segment.departure) > timestamp )
}