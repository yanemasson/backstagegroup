import { parseHTMLToJSX } from '../utils/parseHTMLToJSX';
import { seoContentHTML } from '../data/seoContent';

interface SEOContentProps {
  city: 'krasnoyarsk' | 'novosibirsk';
  pageType: 'main' | 'month' | 'category' | 'subcategory' | 'refund';
  month?: string;
  category?: string;
  subcategory?: string;
}

const SEOContent = ({ city, pageType, month, category, subcategory }: SEOContentProps) => {
  let htmlContent: string | null = null;

  if (pageType === 'main') {
    htmlContent = seoContentHTML[city].main;
  } else if (pageType === 'month' && month) {
    htmlContent = seoContentHTML[city].months[month];
  } else if (pageType === 'category' && category) {
    htmlContent = seoContentHTML[city].categories[category];
  } else if (pageType === 'subcategory' && subcategory) {
    htmlContent = seoContentHTML[city].subcategories[subcategory];
  } else if (pageType === 'refund') {
    htmlContent = seoContentHTML[city].refund;
  }

  if (!htmlContent) return null;

  return (
    <section className='flex flex-col w-[90vw] md:w-[1166px] gap-[30px] mb-[120px]'>
      {parseHTMLToJSX(htmlContent)}
    </section>
  );
};

export default SEOContent;