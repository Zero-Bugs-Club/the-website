import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactSidebar from './components/ContactSidebar';
import Grain from './components/ui/Grain';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import DepartmentPage from './pages/DepartmentPage';
import DomainsPage from './pages/DomainsPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import MemberProfilePage from './pages/MemberProfilePage';
import RecruitmentPage from './pages/RecruitmentPage';
import LeadProfilePage from './pages/LeadProfilePage';
import BoardProfilePage from './pages/BoardProfilePage';

// Scroll restoration that preserves positions between routes and supports browser back
import { useNavigationType } from 'react-router-dom';

const SCROLL_KEY = 'zbc-scroll-positions';

const ScrollRestoration = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const prevLocation = React.useRef(location);

  // Helper to get a stable key for a location (pathname + search)
  const locKey = loc => `${loc.pathname}${loc.search || ''}`;

  // Load map from sessionStorage
  const readMap = () => {
    try {
      return JSON.parse(sessionStorage.getItem(SCROLL_KEY) || '{}');
    } catch {
      return {};
    }
  };
  const writeMap = map => sessionStorage.setItem(SCROLL_KEY, JSON.stringify(map));

  // Save previous location scroll when location changes
  React.useEffect(() => {
    const prev = prevLocation.current;
    if (prev) {
      const map = readMap();
      map[locKey(prev)] = window.scrollY || 0;
      writeMap(map);
    }
    prevLocation.current = location;
  }, [location]);

  // Restore on POP navigation; otherwise scroll to top
  React.useLayoutEffect(() => {
    const map = readMap();
    const key = locKey(location);
    const saved = map[key];

    if (navigationType === 'POP' && typeof saved === 'number') {
      window.scrollTo(0, saved);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, navigationType]);

  // Persist current scroll before unload (safety)
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      const map = readMap();
      map[locKey(location)] = window.scrollY || 0;
      writeMap(map);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [location]);

  return null;
}

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <Router>
      <ScrollRestoration />
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans antialiased overflow-x-hidden">
        <Grain />
        <Navbar onContactClick={() => setIsContactOpen(true)} />

        <ContactSidebar
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />

        <main>
          <AnimatePresence mode='wait'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/:deptName" element={<DepartmentPage />} />
              <Route path="/about/:deptName/lead" element={<LeadProfilePage />} />
              <Route path="/about/:deptName/:memberName" element={<MemberProfilePage />} />
              <Route path="/board/:memberName" element={<BoardProfilePage />} />
              <Route path="/domains" element={<DomainsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/recruitment" element={<RecruitmentPage />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
