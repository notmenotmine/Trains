module.exports = (timestamp) => {
    var TodayDate = new Date(timestamp);
    return TodayDate.getFullYear() + '-' + (TodayDate.getMonth()+1) + '-' + TodayDate.getDate();
};