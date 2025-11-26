import Text, {TextVariant} from "../../../components/Text.tsx";
import {ReactNode, useState} from "react";

interface DisclaimerProps {
    firstArticle: ReactNode;
    secondArticle: ReactNode;
}

const Disclaimer = ({firstArticle, secondArticle}: DisclaimerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex flex-col gap-5'>
            <Text variant={TextVariant.H2}>ДИСКЛЕЙМЕР</Text>
            <Text className='inline' variant={TextVariant.P}>
                {firstArticle}
                {!isOpen &&
                    <div
                        onClick={() => setIsOpen(true)}
                        className='inline-block cursor-pointer ml-1'
                    >
                        <Text className='text-lightgray' variant={TextVariant.P}>Еще</Text>
                    </div>
                }
            </Text>
            {isOpen &&
                <>
                    <Text variant={TextVariant.P} className='inline'>
                        {secondArticle}
                    </Text>
                    <div
                        onClick={() => setIsOpen(false)}
                        className='inline-block cursor-pointer ml-1'
                    >
                        <Text className='text-lightgray -mt-5' variant={TextVariant.P}>Закрыть</Text>
                    </div>
                </>
            }
        </div>
    );
};

export default Disclaimer;