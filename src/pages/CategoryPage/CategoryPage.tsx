import {SEO} from "../../components/SEO.tsx";
import EventList from "../MainPage/sections/EventList/EventList.tsx";
import {lazy, Suspense} from "react";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import SEOContent from "../../components/SEOContent.tsx";
import {useParams} from "react-router";
import {getSEOData} from "../../data/seoData.ts"; 

const Hero = lazy(() => import('../MainPage/sections/Hero/Hero'));
const AboutUsSection = lazy(() => import('../MainPage/sections/AboutUs/AboutUs'));
const ReviewsSection = lazy(() => import('../EventPage/sections/ReviewsSection'));
const NewsSection = lazy(() => import('../MainPage/sections/News/NewsSection'));
const Faq = lazy(() => import('../MainPage/sections/FAQ/FAQ'));

const CategoryPage = () => {
  const { category } = useParams();
  
  const seoInfo = getSEOData('krasnoyarsk', 'category', category);

  return (
    <div className='flex flex-col items-center'>
      <SEO
        title={seoInfo.title}
        description={seoInfo.description}
        keywords={seoInfo.keywords}
      />
      <div className='flex flex-col items-center gap-[100px] xl:gap-30'>
        <Suspense fallback={<LoadingSpinner />}><Hero/></Suspense>
        <Suspense fallback={<LoadingSpinner />}><EventList /></Suspense>
        <Suspense fallback={<LoadingSpinner />}><AboutUsSection/></Suspense>
        <Suspense fallback={<LoadingSpinner />}><ReviewsSection/></Suspense>
        <Suspense fallback={<LoadingSpinner />}><NewsSection/></Suspense>
        <Suspense fallback={<LoadingSpinner />}><Faq/></Suspense>

        {/* SEO-текст для категории */}
        <SEOContent city="krasnoyarsk" pageType="category" category={category} />
      </div>
    </div>
  );
};

export default CategoryPage;