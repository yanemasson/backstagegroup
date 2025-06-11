const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

export const getDate = (datetime: string) => {
    const date = datetime.split('-')
    date[3] = date[2].split(/[ T]/)[1]
    date[2] = date[2].split(/[ T]/)[0]
    return {
        year: date[0],
        monthNum: date[1],
        monthStr: months[Number(date[1]) - 1],
        day: date[2],
        time: date[3],
        get formattedDate() {
            return this.day + '.' + this.monthNum + '.' + this.year;
        }
    }
};
