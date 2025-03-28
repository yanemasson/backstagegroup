import Navbar from "./layouts/Navbar/Navbar.tsx";
import Footer from "./layouts/Footer/Footer.tsx";
import {BrowserRouter} from "react-router";
import {CityProvider} from "./contexts/CityContext.tsx";
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "./components/ScrollToTop.tsx";
import AppRoutes from "./components/AppRoutes.tsx";
import MetricsProvider from "./components/Metrika/MetricsProvider.tsx";

function App() {
  return (
      <HelmetProvider>
          <MetricsProvider>
              <CityProvider>
                  <BrowserRouter>
                      <ScrollToTop />
                      <div className='bg-darkgray text-white flex flex-col justify-center items-center'>
                          <div className="flex flex-col items-center min-h-screen w-[90vw] xl:w-[1166px] ">
                              <Navbar/>
                              <main className="flex-grow py-[64px] xl:py-[84px]">
                                  <AppRoutes/>
                              </main>
                              <Footer/>
                          </div>
                      </div>
                  </BrowserRouter>
              </CityProvider>
          </MetricsProvider>
      </HelmetProvider>

  )
}

export default App
