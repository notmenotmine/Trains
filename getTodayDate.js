module.exports = () => {
    var TodayDate = new Date();
    return TodayDate.getFullYear() + '-' + (TodayDate.getMonth()+1) + '-' + TodayDate.getDate();
}