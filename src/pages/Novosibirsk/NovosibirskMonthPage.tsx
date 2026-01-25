import { useEffect } from 'react';
import { useCity } from '../../hooks/geolocation/useCity';
import { getSEOData } from '../../data/seoData';
import { SEO } from '../../components/SEO';
import SEOContent from '../../components/SEOContent';
import Hero from '../MainPage/sections/Hero/Hero';
import EventList from '../MainPage/sections/EventList/EventList';
import AboutUs from '../MainPage/sections/AboutUs/AboutUs';
import Reviews from '../EventPage/sections/ReviewsSection.tsx';
import News from '../MainPage/sections/News/NewsSection.tsx';
import Faq from '../MainPage/sections/FAQ/FAQ';

interface MonthPageProps {
    month: string;
}

const NovosibirskMonthPage = ({ month }: MonthPageProps) => {
    const seoInfo = getSEOData('krasnoyarsk', 'month', month);
    const { setSelectedCity } = useCity();

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
            <SEOContent city="novosibirsk" pageType="month" month={month} />
        </div>
    );
};

export default NovosibirskMonthPage;