import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ContactChat } from "./components/ContactChat";
import { MarketingLayout } from "./components/MarketingLayout";
import { ScrollToTop } from "./components/ScrollToTop";
import { ContactForm } from "./pages/ContactForm";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MarketingLayout>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<ContactForm />} path="/contact" />
          {/* retired demo pages; old links land on the portfolio */}
          {["/spa-showcase", "/resume-demo"].map((path) => (
            <Route
              element={<Navigate replace to="/#projects" />}
              key={path}
              path={path}
            />
          ))}
        </Routes>
        <ContactChat />
      </MarketingLayout>
    </BrowserRouter>
  );
}

export default App;
