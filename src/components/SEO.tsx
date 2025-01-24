// components/SEO.tsx
import { Helmet } from 'react-helmet-async';


interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
}

export const SEO = ({title, description, keywords, image = '/src/assets/logo.svg', url = 'https://backstagegroup.ru'}: SEOProps) => {
    return (
        <Helmet>
            {/* Основные метатеги */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Open Graph метатеги для соцсетей */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />

            {/* Twitter метатеги */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Дополнительные метатеги */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta charSet="UTF-8" />
        </Helmet>
    );
};
