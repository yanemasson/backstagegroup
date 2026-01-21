import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useCity } from '../../hooks/geolocation/useCity';
import { getSEOData } from '../../data/seoData';
import { SEO } from '../../components/SEO';
import { SEOContent } from '../../components/SEOContent';
import Hero from '../MainPage/sections/Hero/Hero';
import EventList from '../MainPage/sections/EventList/EventList';
import AboutUs from '../MainPage/sections/AboutUs/AboutUs';
import Reviews from '../MainPage/sections/Reviews/Reviews';
import News from '../MainPage/sections/News/News';
import Faq from '../MainPage/sections/FAQ/FAQ';

const NovosibirskSubcategoryPage = () => {
    const { category, subcategory } = useParams();
    const { setSelectedCity } = useCity();
    const seoInfo = getSEOData('novosibirsk', 'subcategory', subcategory);

    useEffect(() => {
        setSelectedCity('Новосибирск');
    }, [setSelectedCity]);

    return (
        <div className='flex flex-col items-center'>
            <SEO 
                title={seoInfo.title} 
                description={seoInfo.description} 
                keywords={seoInfo.keywords} 
            />
            <Hero />
            <EventList />
            <AboutUs />
            <Reviews />
            <News />
            <Faq />
            <SEOContent city="novosibirsk" pageType="subcategory" category={category} subcategory={subcategory} />
        </div>
    );
};

export default NovosibirskSubcategoryPage;