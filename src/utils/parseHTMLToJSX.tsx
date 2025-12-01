import Text, { TextVariant } from '../components/Text';
import { Fragment } from 'react';

export const parseHTMLToJSX = (htmlString: string): JSX.Element => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const convertNodeToJSX = (node: ChildNode, index: number): JSX.Element | null => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      return text ? <Fragment key={index}>{text}</Fragment> : null;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const children = Array.from(element.childNodes).map((child, i) =>
        convertNodeToJSX(child, i)
      ).filter(Boolean);

      switch (element.tagName.toLowerCase()) {
        case 'h2':
          return <Text key={index} variant={TextVariant.H2}>{children}</Text>;
        case 'p':
          return <Text key={index} variant={TextVariant.P}>{children}</Text>;
        case 'ul':
          return (
            <ul key={index} className='list-disc pl-6 flex flex-col gap-2'>
              {children}
            </ul>
          );
        case 'li':
          return <li key={index}>{children}</li>;
        default:
          return <Fragment key={index}>{children}</Fragment>;
      }
    }

    return null;
  };

  const bodyChildren = Array.from(doc.body.childNodes).map((node, i) =>
    convertNodeToJSX(node, i)
  ).filter(Boolean);

  return <>{bodyChildren}</>;
};