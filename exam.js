// פונקציה המקבלת מערך של מספרים ומחזירה מערך המכיל רק את המספרים הזוגיים מהמערך הקודם
const Mission1 = (arr) => arr.filter(num => num % 2 === 0);

// פונקציה המקבלת מחרוזת ומחזירה את כמות המילים המכילות ארבעה אותיות
const Mission2 = (str) => str.split(' ').filter(word => word.length === 4).length;

// פונקציה המקבלת מערך דו ממדי והופכת אותו למערך חד מימדי
const Mission3 = (arr) => arr.flat();

// פונקציה המקבלת מערך ובודקת אם המערך עולה, יורד או לא זה ולא זה.
//  אם המערך עולה הפונקציה תחזיר 1 (כמספר)
// אם המערך יורד הפונקציה תחזיר 2 (כמספר) 
// ואם לא זה ולא זה תחזיר 0
const Mission4 = (arr) => {
    const isAscending = arr.every((num, i) => i === 0 || num > arr[i - 1]);
    const isDescending = arr.every((num, i) => i === 0 || num < arr[i - 1]);
    return isAscending ? 1 : isDescending ? 2 : 0;
};


module.exports = {
    Mission1,
    Mission2,
    Mission3,
    Mission4
};