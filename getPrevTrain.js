module.exports = (segments, timestamp) => {
    // const index = segments.reduce((index, segment, i) => {
    //     if (segment.departure === timestamp) index = i;
    //     return index;
    // }, null);

    let index = null;
    for (let i = 0; i < segments.length; i++) {
        if (+new Date(segments[i].departure) === timestamp) {
            index = i;
        }
    }

    if (index > 0) index--;
    return segments[index];


    segments.find((segment, i) => {
        const departure = +new Date(segment.departure);
        return +new Date(segment.departure) < timestamp;
    });
    return segments.find(segment => {
        const departure = +new Date(segment.departure);
        // console.log('departure', departure);
        // console.log('timestamp', timestamp);
    return +new Date(segment.departure) < timestamp;
    });
}