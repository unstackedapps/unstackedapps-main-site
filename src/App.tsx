import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContactChat } from "./components/ContactChat";
import { MarketingLayout } from "./components/MarketingLayout";
import { ScrollToTop } from "./components/ScrollToTop";
import { ContactForm } from "./pages/ContactForm";
import { Home } from "./pages/Home";
import { ResumeDemo } from "./pages/ResumeDemo";
import { SPAShowcase } from "./pages/SPAShowcase";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MarketingLayout>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<SPAShowcase />} path="/spa-showcase" />
          <Route element={<ContactForm />} path="/contact" />
          <Route element={<ResumeDemo />} path="/resume-demo" />
        </Routes>
        <ContactChat />
      </MarketingLayout>
    </BrowserRouter>
  );
}

export default App;
