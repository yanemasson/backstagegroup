import Header from "./layouts/Header/Header.tsx";
import Footer from "./layouts/Footer/Footer.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import {CityProvider} from "./contexts/CityContext.tsx";
import { Suspense, lazy } from 'react';
import LoadingSpinner from "./components/LoadingSpinner.tsx";
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "./components/ScrollToTop.tsx";

const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const ConcertListPage = lazy(() => import('./pages/ConcertListPage/ConcertListPage'));
const ConcertPage = lazy(() => import('./pages/ConcertPage/ConcertPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
// const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'))

function App() {
  return (
      <HelmetProvider>
          <CityProvider>
              <BrowserRouter>
                  <ScrollToTop />
                  <div className="flex flex-col bg-black min-h-screen">
                      <Header/>
                      <main className="flex-grow">
                          <Suspense fallback={<LoadingSpinner/>}>
                              <Routes>
                                  <Route index element={<MainPage/>}/>
                                  {/*<Route path={'about'} element={<AboutPage/>}/>*/}
                                  <Route path={'events'} element={<ConcertListPage/>}/>
                                  <Route path={'events/:id'} element={<ConcertPage/>}/>
                                  <Route path={'*'} element={<NotFoundPage/>}/>
                              </Routes>
                          </Suspense>
                      </main>
                      <Footer/>
                  </div>
              </BrowserRouter>
          </CityProvider>
      </HelmetProvider>

  )
}

export default App
