import {Concert} from "../types/event.ts";

const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

export const getDatesString = (concerts:Concert[])=> {
    const parsedDates = concerts.map((item) => {
        const dateObj = new Date(item.date);
        return {
            day: dateObj.getDate(),
            month: dateObj.getMonth()
        };
    });
    const isSameMonth = parsedDates.every(d => d.month === parsedDates[0].month);
    if (isSameMonth) {
        const dayString = parsedDates.map(d => d.day).join(', ').replace(/, (\d+)$/, ' и $1');
        const monthString = months[parsedDates[0].month];
        return `${dayString} ${monthString}`;
    } else {
        const dateStrings = parsedDates.map(d => `${d.day} ${months[d.month]}`);
        return dateStrings.join(', ').replace(/, ([^,]+)$/, ' и $1');
    }
}
