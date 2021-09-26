function isDue(date, duration) {

    let date2 = new Date(date);
    date2.setDate(date2.getDate() + duration);
  
    let today = new Date();
  
    return today >= date2;
}
  
function returnDate(date, duration) {

    let date2 = new Date(date);
    date2.setDate(date2.getDate() + duration);

    return date2.toDateString();
}

module.exports.isDue = isDue;
module.exports.returnDate = returnDate;