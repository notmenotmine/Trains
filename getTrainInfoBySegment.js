module.exports = (segment) => {
    let train_title = JSON.stringify(segment.thread.short_title);
    train_title.substring(1, train_title.lastIndexOf('"'));
    const departure = JSON.stringify(segment.departure).substr(12, 5);
    const arrival = JSON.stringify(segment.arrival).substr(12, 5);
    return train_title + "\nОтправление: " + departure + "\nПрибытие: " + arrival
}
