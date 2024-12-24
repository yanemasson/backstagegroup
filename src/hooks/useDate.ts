const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

export const useDate = (date:Date)=> {
    const dateString = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear() + ', '
    const timeString = 'в ' + date.getHours() + ':' + ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes()
    return dateString + timeString
}