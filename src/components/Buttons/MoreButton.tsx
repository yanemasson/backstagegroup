import Button, {ButtonVariant} from "./Button.tsx";
import DownArrow from "./DownArrow.tsx";
import {useState} from "react";

const MoreButton = () => {
    const [isButtonOutlineHovered, setIsButtonOutlineHovered] = useState(false)

    return (
        <div>
            <a href={'#information'}
               onMouseEnter={() => setIsButtonOutlineHovered(true)}
               onMouseLeave={() => setIsButtonOutlineHovered(false)}>
                <Button variant={ButtonVariant.outline}>
                    <div className='flex items-center justify-center gap-5'>
                        Подробнее
                        <div className={'-translate-y-2'}>
                            <DownArrow hover={isButtonOutlineHovered}/>
                        </div>
                    </div>
                </Button>
            </a>
        </div>
    );
};

export default MoreButton;