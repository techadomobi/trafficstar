import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { useLocation } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Verticals from "@/pages/verticals";
import Blog from "@/pages/blog";
import BlogDetail from "@/pages/blog-detail";
import AdFormats from "@/pages/ad-formats";
import Platform from "@/pages/platform";
import SignIn from "@/pages/signin";
import Start from "@/pages/start";
import Advertiser from "@/pages/advertiser";
import Publisher from "@/pages/publisher";
import { LanguageProvider, useLanguage } from "@/lib/language-context";
import { setPageMeta } from "@/lib/seo";
import routeSeo from "../route-seo.json";

const queryClient = new QueryClient();
const DEFAULT_ROUTE = "/";
const ROUTE_SEO = routeSeo as Record<string, { title: string; description: string }>;

function TranslationRouteSync() {
  const [location] = useLocation();
  const { activeLanguage, setLanguage } = useLanguage();

  useEffect(() => {
    if (activeLanguage !== "EN") {
      setLanguage(activeLanguage);
    }
  }, [location, activeLanguage, setLanguage]);

  return null;
}

function RouteMetaSync() {
  const [location] = useLocation();

  useEffect(() => {
    if (typeof document === "undefined") return;

    const meta = ROUTE_SEO[location] ?? ROUTE_SEO[DEFAULT_ROUTE];
    setPageMeta(meta.title, meta.description);
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/verticals" component={Verticals} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogDetail} />
      <Route path="/ad-formats" component={AdFormats} />
      <Route path="/platform" component={Platform} />
      <Route path="/advertiser" component={Advertiser} />
      <Route path="/publisher" component={Publisher} />
      <Route path="/login" component={SignIn} />
      <Route path="/start" component={Start} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "") }>
            <TranslationRouteSync />
            <RouteMetaSync />
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
