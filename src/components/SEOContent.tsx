import { useEffect, useMemo, useState } from 'react';
import { parseHTMLToJSX } from '../utils/parseHTMLToJSX';

interface SEOContentProps {
  city: 'krasnoyarsk' | 'novosibirsk';
  pageType: 'main' | 'month' | 'refund';
  month?: string;
}

/**
 * Каждый SEO-текст лежит в отдельном модуле и грузится отдельным чанком:
 * страница тянет только свой фрагмент, а не всю базу текстов обоих городов.
 */
const seoModules = import.meta.glob<{ default: string }>('../data/seo/**/*.ts');

const modulePath = ({ city, pageType, month }: SEOContentProps): string | null => {
  switch (pageType) {
    case 'main':
      return `../data/seo/${city}/main.ts`;
    case 'refund':
      return `../data/seo/${city}/refund.ts`;
    case 'month':
      return month ? `../data/seo/${city}/months/${month}.ts` : null;
    default:
      return null;
  }
};

const SEOContent = ({ city, pageType, month }: SEOContentProps) => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    const path = modulePath({ city, pageType, month });
    const load = path ? seoModules[path] : undefined;

    if (!load) {
      setHtmlContent(null);
      return;
    }

    let cancelled = false;
    load().then(module => {
      if (!cancelled) setHtmlContent(module.default);
    });

    return () => {
      cancelled = true;
    };
  }, [city, pageType, month]);

  // Разбор HTML через DOMParser — дорогая операция, держим её вне рендера
  const content = useMemo(
    () => (htmlContent ? parseHTMLToJSX(htmlContent) : null),
    [htmlContent]
  );

  if (!content) return null;

  return (
    <section className='flex flex-col w-[90vw] md:w-[1166px] gap-[30px] mb-[120px]'>
      {content}
    </section>
  );
};

export default SEOContent;
