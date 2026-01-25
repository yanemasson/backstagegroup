import {lazy, Suspense, useEffect} from 'react';
import { useParams } from 'react-router';
import { useCity } from '../../hooks/geolocation/useCity';
import { getSEOData } from '../../data/seoData';
import { SEO } from '../../components/SEO';
import SEOContent from '../../components/SEOContent';
import LoadingSpinner from "../../components/LoadingSpinner.tsx";

const Hero = lazy(() => import('../MainPage/sections/Hero/Hero'));
const EventList = lazy(() => import('../MainPage/sections/EventList/EventList'));
const ReviewsSection = lazy(() => import('../MainPage/sections/Reviews/ReviewsSection'));
const AboutUsSection = lazy(() => import('../MainPage/sections/AboutUs/AboutUs'));
const NewsSection = lazy(() => import('../MainPage/sections/News/NewsSection'));
const Faq = lazy(() => import('../MainPage/sections/FAQ/FAQ'));

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
            <div className='flex flex-col items-center gap-24 xl:w-[1152px]'>
                <Suspense fallback={<LoadingSpinner />}><Hero/></Suspense>
                <Suspense fallback={<LoadingSpinner />}><EventList/></Suspense>
                <Suspense fallback={<LoadingSpinner />}><ReviewsSection/></Suspense>
                <Suspense fallback={<LoadingSpinner />}><AboutUsSection/></Suspense>
                <Suspense fallback={<LoadingSpinner />}><NewsSection/></Suspense>
                <Suspense fallback={<LoadingSpinner />}><Faq/></Suspense>
                <SEOContent city="novosibirsk" pageType="subcategory" category={category} subcategory={subcategory} />
            </div>
        </div>
    );
};

export default NovosibirskSubcategoryPage;