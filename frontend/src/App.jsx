import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import Courseware from './pages/Courseware.jsx';
import Pricing from './pages/Pricing.jsx';
import Contact from './pages/Contact.jsx';
import PreRegistration from './pages/PreRegistration.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/courseware" element={<Courseware />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pre-registration" element={<PreRegistration />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Analytics />
    </>
  );
}
