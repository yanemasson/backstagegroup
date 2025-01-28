const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

export const getDate = (date:string)=> {
    const dateArr = date.split(' ')[0].split('-')
    const time = date.split(' ')[1]
    return Number(dateArr[2]) + ' ' + months[Number(dateArr[1]) - 1] + ' в ' + time
}