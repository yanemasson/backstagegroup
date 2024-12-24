import './App.css'
import Header from "./layouts/Header/Header.tsx";
import Footer from "./layouts/Footer/Footer.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import {CityProvider} from "./contexts/CityContext.tsx";
import { Suspense, lazy } from 'react';
import LoadingSpinner from "./components/LoadingSpinner.tsx";

const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const ConcertListPage = lazy(() => import('./pages/ConcertListPage/ConcertListPage'));
const ConcertPage = lazy(() => import('./pages/ConcertPage/ConcertPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  return (
      <CityProvider>
          <BrowserRouter>
              <Header/>
              <Suspense fallback={<LoadingSpinner/>}>
                  <Routes>
                      <Route index element={<MainPage/>}/>
                      <Route path={'events'} element={<ConcertListPage/>}/>
                      <Route path={'events/:id'} element={<ConcertPage/>}/>
                      <Route path={'*'} element={<NotFoundPage/>}/>
                  </Routes>
              </Suspense>
              <Footer/>
          </BrowserRouter>
      </CityProvider>
  )
}

export default App
