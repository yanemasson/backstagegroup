export const getDuration = (duration:string)=> {
    //01:30
    const durationArr = duration.split(':')
    const hours = Number(durationArr[0])
    const minutes = Number(durationArr[1])
    let durStr = ''
    if (hours === 1) {
        durStr = hours + ' час'
    } else {
        durStr = hours + ' часа'
    }

    if (minutes === 0) {
        return durStr
    }
    return durStr + ' ' + minutes + ' минут'
}


