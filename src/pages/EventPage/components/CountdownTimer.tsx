import {useState, useEffect, ReactNode} from 'react';

export const DatetimeCell = ({children} : {children: ReactNode}) => {
    return (
        <div className='w-[71px] h-[56px] border-solid border-y-0 border-l-0 border-r-[1px] border-lightgray
            text-[24px] flex items-center justify-center '>
            {children}
        </div>
    )
}

const CountdownTimer = ({ dateString }: {dateString: string}) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const targetDate = new Date(dateString.replace(' ', 'T'));
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [dateString]);

    return (
        <div className='flex'>
            <DatetimeCell>{timeLeft.days}д</DatetimeCell>
            <DatetimeCell>{timeLeft.hours}ч</DatetimeCell>
            <DatetimeCell>{timeLeft.minutes}м</DatetimeCell>
            <div className='w-[71px] h-[56px] text-[24px] flex items-center justify-center'>{timeLeft.seconds}с</div>
        </div>
    );
};

export default CountdownTimer;


