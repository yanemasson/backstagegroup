const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const weekdaysShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

export const getDate = (datetime: string) => {
    const date = datetime.split('-')
    date[3] = date[2].split(/[ T]/)[1]
    date[2] = date[2].split(/[ T]/)[0]

    let formattedTime = '';
    if (date[3]) {
        formattedTime = date[3].split(':').slice(0, 2).join(':');
    }

    const jsDate = new Date(
        parseInt(date[0]),
        parseInt(date[1]) - 1,
        parseInt(date[2])
    );
    const weekday = weekdays[jsDate.getDay()]
    const weekdayShort = weekdaysShort[jsDate.getDay()]

    return {
        year: date[0],
        monthNum: Number(date[1]),
        monthStr: months[Number(date[1]) - 1],
        day: date[2],
        weekday: weekday,
        weekdayShort: weekdayShort,
        time: formattedTime,
        get formattedDate() {
            return this.day + '.' + this.monthNum + '.' + this.year;
        }
    }
};
