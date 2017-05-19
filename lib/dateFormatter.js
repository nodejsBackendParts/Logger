'use strict';

const addLeadingZeros2 = (n) => {
    const r = n.toString();
    return (n<10) ? `0${r}` : r;
};

const addLeadingZeros3 = (n) => {
    const r = n.toString();
    return (n<10) ? `00${r}` : (n<100) ? `0${r}` : r;
};

module.exports = (date, format) => {

    const yyyy = date.getFullYear();
    const MM = addLeadingZeros2(date.getMonth() + 1);
    const dd = addLeadingZeros2(date.getDate());
    const hh = addLeadingZeros2(date.getHours());
    const mm = addLeadingZeros2(date.getMinutes());
    const ss = addLeadingZeros2(date.getSeconds());
    const SSS = addLeadingZeros3(date.getMilliseconds());

    return format
        .replace(/yyyy/g, yyyy)
        .replace(/MM/g, MM)
        .replace(/dd/g, dd)
        .replace(/hh/g, hh)
        .replace(/mm/g, mm)
        .replace(/ss/g, ss)
        .replace(/SSS/g, SSS);

};
