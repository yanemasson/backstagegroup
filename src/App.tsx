import Header from "./layouts/Header/Header.tsx";
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
                      <div className="flex flex-col bg-black min-h-screen">
                          <Header/>
                          <main className="flex-grow">
                              <AppRoutes/>
                          </main>
                          <Footer/>
                      </div>
                  </BrowserRouter>
              </CityProvider>
          </MetricsProvider>
      </HelmetProvider>

  )
}

export default App
