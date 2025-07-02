const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

export const getDate = (datetime: string) => {
    const date = datetime.split('-')
    date[3] = date[2].split(/[ T]/)[1]
    date[2] = date[2].split(/[ T]/)[0]

    let formattedTime = '';
    if (date[3]) {
        formattedTime = date[3].split(':').slice(0, 2).join(':');
    }


    return {
        year: date[0],
        monthNum: date[1],
        monthStr: months[Number(date[1]) - 1],
        day: date[2],
        time: formattedTime,
        get formattedDate() {
            return this.day + '.' + this.monthNum + '.' + this.year;
        }
    }
};
