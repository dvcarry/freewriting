const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

const todayDate = new Date();
let curMonth = todayDate.getMonth() + 1

if (curMonth < 10) {
    curMonth = '0' + String(curMonth)
}

const currMonthWord = months[curMonth];
const currDay = todayDate.getDate();
const currYear = todayDate.getFullYear();
export const today = `${currDay}-${curMonth}-${currYear}`