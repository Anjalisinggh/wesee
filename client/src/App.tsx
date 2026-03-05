import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import { useLenis } from "./hooks/useLenis";
import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "wouter";

const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const Careers = lazy(() => import("./pages/Careers"));

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <span style={{ fontSize: 11, fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888888" }}>
        Loading...
      </span>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/services/:slug" component={ServiceDetail} />
        <Route path="/about" component={About} />
        <Route path="/team" component={Team} />
        <Route path="/contact" component={Contact} />
        <Route path="/blog" component={Blog} />
        <Route path="/careers" component={Careers} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  useLenis();
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("wesee-loaded")) {
      setLoadingDone(true);
    }
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <CustomCursor />
          <LoadingScreen onComplete={() => setLoadingDone(true)} />
          <div
            className={loadingDone ? "page-enter" : ""}
            style={{ opacity: loadingDone ? 1 : 0 }}
          >
            <ScrollToTop />
            <Header />
            <main>
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
