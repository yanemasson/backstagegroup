import parse, {DOMNode, domToReact, Element, HTMLReactParserOptions} from 'html-react-parser';
import Button, {ButtonVariant} from './Buttons/Button';
import Quote from './Quote';
import Text, {TextVariant} from "./Text.tsx";

interface WordPressContentProps {
    content: string;
    className?: string;
}

const WordPressContent = ({ content, className } : WordPressContentProps) => {
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element) {

                // Кнопка со ссылкой
                if ((domNode.name === 'div' && domNode.attribs.class?.includes('wp-block-button')) ||
                    (domNode.name === 'a' && (
                        domNode.attribs.class?.includes('wp-block-button__link') ||
                        domNode.attribs.class?.includes('wp-element-button')
                    ))
                ) {
                    return (
                        <div className="mb-[30px] last:mb-0">
                            <a href={domNode.attribs.href}>
                                <Button className='w-full md:w-[200px] h-[45px]' variant={ButtonVariant.primary}>
                                    {domToReact(domNode.children as DOMNode[], options)}
                                </Button>
                            </a>
                        </div>
                    );
                }

                // Разделитель
                if ((domNode.name === 'hr' && domNode.attribs.class?.includes('wp-block-separator'))) {
                    return (
                        <div className="h-[2px] w-full bg-light-brown mb-[30px] last:mb-0"></div>
                    );
                }

                // Изображение
                if (domNode.name === 'img') {
                    return (
                        <img
                            src={domNode.attribs.src}
                            alt={domNode.attribs.alt || ''}
                            className="mb-[30px]"
                        />
                    );
                }

                // Параграф
                if (domNode.name === 'p') {
                    return (
                        <Text variant={TextVariant.P} className="mb-[30px] last:mb-0 whitespace-pre-wrap">
                            {domToReact(domNode.children as DOMNode[], options)}
                        </Text>
                    );
                }

                // Жирный текст
                if (domNode.name === 'strong' || domNode.name === 'b') {
                    return (
                        <Text className='text-light-brown mb-[30px] last:mb-0' variant={TextVariant.B}>
                            {domToReact(domNode.children as DOMNode[], options)}
                        </Text>
                    );
                }

                //Заголовки
                if (domNode.name === 'h2' || domNode.name === 'h3' || domNode.name === 'h4') {
                    const headingMap = {
                        'h2': TextVariant.H2,
                        'h3': TextVariant.H3,
                        'h4': TextVariant.H4
                    };
                    const variant = headingMap[domNode.name];
                    return (
                        <Text
                            variant={variant}
                            className="mb-[30px] last:mb-0 text-light-brown"
                        >
                            {domToReact(domNode.children as DOMNode[], options)}
                        </Text>
                    );
                }

                // Список
                if (domNode.name === 'ol' || domNode.name === 'ul') {
                    return (
                        <ul className="list-none mb-[30px]">
                            {domToReact(domNode.children as DOMNode[], options)}
                        </ul>
                    );
                }
                if (domNode.name === 'li') {
                    return (
                        <li className="relative pl-5 mb-2">
                            <div className="absolute left-0 top-1.5">
                                <svg
                                    className='-rotate-90 text-light-brown'
                                    width="12"
                                    height="9"
                                    viewBox="0 0 12 9"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M6 9L0 0H12L6 9Z" fill="currentColor"/>
                                </svg>
                            </div>

                            <Text variant={TextVariant.P}>
                                {domToReact(domNode.children as DOMNode[], options)}
                            </Text>
                        </li>
                    );
                }

                // Цитата
                if (domNode.name === 'blockquote') {
                    return (
                        <Quote className='mb-[30px] last:mb-0'>
                            {domToReact(domNode.children as DOMNode[], options)}
                        </Quote>
                    );
                }
            }
        }
    };

    return (
        <div className={className}>
            {parse(content, options)}
        </div>
    );
};

export default WordPressContent;