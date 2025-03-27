const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

export const getDate = (datetime:string)=> {
    //2025-03-02 18:00
    const datetimeArr = datetime.split(' ')
    const dateArr= datetimeArr[0].split('-')
    const monthNum= Number(dateArr[1])
    return {
        year: dateArr[0],
        monthNum: monthNum < 10 ? '0' + String(monthNum) : String(monthNum),
        monthStr: months[monthNum - 1],
        day: dateArr[2],
        time: datetimeArr[1]
    };
}
