import {ReactNode} from "react";

interface MonthButtonProps {
    isActive: boolean;
    count: number;
    setActive: () => void;
    children: ReactNode;
}

const MonthButton = ({isActive, count, setActive, children}: MonthButtonProps) => {
    return (
        <div className='flex flex-col min-h-10 items-end' onClick={setActive}>
            <p className={`text-[14px] transition-colors duration-100
            ${!isActive ? 'text-gray' : 'text-white'}`}
            >
                {count}
            </p>
            <p className={`font-medium text-[18px] md:text-[24px] tracking-[0em] leading-none hover:cursor-pointer 
            ${!isActive ? 'text-gray' : ''} transition-colors duration-100`}
            >
                {children}
            </p>
        </div>

    );
};

export default MonthButton;