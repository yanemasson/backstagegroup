import {ReactNode} from "react";
import {Link} from "react-router";

interface MonthButtonProps {
    isActive: boolean;
    count: number;
    setActive?: () => void;  // теперь опциональный
    href?: string;           // новое свойство для ссылки
    children: ReactNode;
}

const MonthButton = ({isActive, count, setActive, href, children}: MonthButtonProps) => {
    const content = (
        <div className='flex flex-col min-h-10 items-end'>
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

    // Если href задан - это SEO-город, используем Link
    if (href) {
        return <Link to={href}>{content}</Link>;
    }

    // Иначе - обычный onClick для фильтрации
    return <div onClick={setActive}>{content}</div>;
};

export default MonthButton;