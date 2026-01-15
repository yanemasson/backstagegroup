import Text, {TextVariant} from "../../../components/Text.tsx";
import CheckboxIcon from '../../../assets/icons/checkbox/ic_checkbox.svg?react'
import BoxIcon from '../../../assets/icons/checkbox/ic_box.svg?react'
import CloseIcon from '../../../assets/icons/ic_close.svg?react'
import {CookiePreferences} from "../../../types/cookie.ts";


interface CookieCustomizeModalProps {
    onClose: () => void;
    preferences: CookiePreferences;
    setPreferences: (preferences: CookiePreferences) => void;
}

const CookieCustomizeModal = ({onClose, preferences, setPreferences}: CookieCustomizeModalProps) => {
    return (
        <>
            <div
                className="fixed inset-0 bg-bg-overlay z-40"
                onClick={onClose}
            />
            <div className='fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-bg-island z-50 flex flex-col w-[90vw] xl:w-[560px]'>
                <div className='h-12 px-3.5 flex items-center justify-between'>
                    <Text variant={TextVariant.Subtitle_M}>Выберите данные</Text>
                    <div className='cursor-pointer' onClick={onClose}><CloseIcon/></div>
                </div>

                <div className='h-[52px] inset-0 px-4 flex gap-2 items-center hover:bg-button-tertiary-hover transition-colors'>
                    <div className='text-button-primary-active'>
                        <CheckboxIcon />
                    </div>
                    <div>
                        <Text className='inline text-button-primary-active' variant={TextVariant.Checkbox_L}>Необходимые куки</Text>
                        <Text className='text-text-tertiary inline' variant={TextVariant.Checkbox_S}> для базовой функциональности сайта (сессии, безопасность)</Text>
                    </div>
                </div>

                <div className='h-[52px] px-4 flex gap-2 items-center hover:bg-button-tertiary-hover transition-colors group'
                     onClick={() => setPreferences({...preferences, analytics: !preferences.analytics})}
                >
                    <div
                        className={`transition-colors ${preferences.analytics 
                            ? 'text-button-primary-active' 
                            : 'text-ic-primary group-hover:text-button-primary-active'
                        }`}
                    >
                        {preferences.analytics ? <CheckboxIcon /> : <BoxIcon />}
                    </div>
                    <div>
                        <Text className='inline' variant={TextVariant.Checkbox_L}>Аналитические куки</Text>
                        <Text className='text-text-tertiary inline' variant={TextVariant.Checkbox_S}> для сбора статистики (например, Google Analytics)</Text>
                    </div>
                </div>

                <div
                    className='h-[52px] px-4 flex gap-2 items-center hover:bg-button-tertiary-hover transition-colors group'
                    onClick={() => setPreferences({...preferences, marketing: !preferences.marketing})}
                >
                    <div
                        className={`transition-colors ${preferences.marketing
                            ? 'text-button-primary-active'
                            : 'text-ic-primary group-hover:text-button-primary-active'
                        }`}
                    >
                        {preferences.marketing ? <CheckboxIcon /> : <BoxIcon />}
                    </div>
                    <Text className='inline' variant={TextVariant.Checkbox_L}>Маркетинговые куки</Text>
                    <Text className='text-text-tertiary inline' variant={TextVariant.Checkbox_S}> для персонализированной рекламы</Text>
                </div>
            </div>
        </>
    );
};

export default CookieCustomizeModal;