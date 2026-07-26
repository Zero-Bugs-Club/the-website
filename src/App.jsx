import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactSidebar from './components/ContactSidebar';
import Grain from './components/ui/Grain';
import LiquidMetalScrollbar from './components/LiquidMetalScrollbar';
import BinaryStream from './components/BinaryStream';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import DomainsPage from './pages/DomainsPage';
import ToolsPage from './pages/ToolsPage';
import CompilerPage from './pages/CompilerPage';
import GalleryPage from './pages/GalleryPage';
import RecruitmentPage from './pages/RecruitmentPage';

// Helper component to scroll to top and provide location for page transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/domains" element={<DomainsPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/compiler" element={<CompilerPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/recruitment" element={<RecruitmentPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isContactOpen, setIsContactOpen] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans antialiased overflow-x-hidden relative">
        <Grain />

        {/* Side Margin Visuals */}
        <BinaryStream />
        <LiquidMetalScrollbar />

        <Navbar onContactClick={() => setIsContactOpen(true)} />

        <ContactSidebar
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />

        <main>
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;