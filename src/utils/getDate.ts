const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

export const getDate = (date:string)=> {
    const parsedDateTime = date.split(' ')
    const parsedDateWithoutTime = parsedDateTime[0].split('-')
    const dateTime = {
        day: parsedDateWithoutTime[2],
        month: parsedDateWithoutTime[1],
        year: parsedDateWithoutTime[2],
        time: parsedDateTime[1]
    }
    return `${dateTime.day} ${months[Number(dateTime.month) - 1]}, в ${dateTime.time}`;

}
