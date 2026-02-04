import { useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useInvitation } from "@/context/InvitationContext";
import staticConfig from "@/config/config";

const Layout = lazy(() => import("@/components/Layout"));
const MainContent = lazy(() => import("@/pages/MainContent"));
const LandingPage = lazy(() => import("@/pages/LandingPage"));

function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const { config, isLoading, error } = useInvitation();
  const activeConfig = config || staticConfig.data;

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-sand-100 to-sand-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-sand-200 border-t-terracotta-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-sand-100 to-sand-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-terracotta-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-serif text-gray-800 mb-2">
            Invitation Not Found
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Please check your URL or contact the hosts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{activeConfig.title}</title>
        <meta name="title" content={activeConfig.title} />
        <meta name="description" content={activeConfig.description} />
        <meta name="robots" content="noindex, nofollow, noarchive, nocache" />
        <meta name="googlebot" content="noindex, nofollow, noarchive" />
        <meta name="bingbot" content="noindex, nofollow, noarchive" />
        <meta name="archive" content="no" />
        <meta
          name="cache-control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={activeConfig.title} />
        <meta property="og:description" content={activeConfig.description} />
        <meta property="og:image" content={activeConfig.ogImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content={activeConfig.title} />
        <meta
          property="twitter:description"
          content={activeConfig.description}
        />
        <meta property="twitter:image" content={activeConfig.ogImage} />
        <link rel="icon" type="image/x-icon" href={activeConfig.favicon} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FDA4AF" />
      </Helmet>

      <Suspense
        fallback={
          <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-sand-100 to-sand-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-sand-200 border-t-terracotta-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        }
      >
        <AnimatePresence mode="wait">
          {!isInvitationOpen ? (
            <LandingPage onOpenInvitation={() => setIsInvitationOpen(true)} />
          ) : (
            <Layout>
              <MainContent />
            </Layout>
          )}
        </AnimatePresence>
      </Suspense>
    </HelmetProvider>
  );
}

export default App;
