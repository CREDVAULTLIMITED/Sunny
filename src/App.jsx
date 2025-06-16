import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/mega-menu.css';
import { ThemeProvider } from './ui/components/ThemeProvider';
import HomePage from './components/homepage/HomePage';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import './App.css';
import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
// Auth callback components
const MicrosoftAuthCallback = lazy(() => import('./pages/MicrosoftAuthCallback'));
const AppleAuthCallback = lazy(() => import('./pages/AppleAuthCallback'));
const SlackAuthCallback = lazy(() => import('./pages/SlackAuthCallback'));

// Lazy load DeveloperTerminal
const DeveloperTerminal = lazy(() => import('./components/developer/DeveloperTerminal'));

// Lazy load page components
const PaymentsPage = lazy(() => import('./pages/products/PaymentsPage'));
const CheckoutPage = lazy(() => import('./pages/products/CheckoutPage'));
const PaymentLinksPage = lazy(() => import('./pages/products/PaymentLinksPage'));
const TerminalPage = lazy(() => import('./pages/products/TerminalPage'));
const InvoicingPage = lazy(() => import('./pages/products/InvoicingPage'));
const BillingPage = lazy(() => import('./pages/products/BillingPage'));
const TaxPage = lazy(() => import('./pages/products/TaxPage'));

const EcommercePage = lazy(() => import('./pages/solutions/EcommercePage'));
const SaasPage = lazy(() => import('./pages/solutions/SaasPage'));
const MarketplacesPage = lazy(() => import('./pages/solutions/MarketplacesPage'));
const EnterprisePage = lazy(() => import('./pages/solutions/EnterprisePage'));

const DocsPage = lazy(() => import('./pages/developers/DocsPage'));
const ApiPage = lazy(() => import('./pages/developers/ApiPage'));
const SdksPage = lazy(() => import('./pages/developers/SdksPage'));
const ComponentsPage = lazy(() => import('./pages/developers/ComponentsPage'));
const CommunityPage = lazy(() => import('./pages/community/CommunityPage'));
const MarketplacePage = lazy(() => import('./pages/marketplace/MarketplacePage'));

const BlogPage = lazy(() => import('./pages/resources/BlogPage'));
const CustomersPage = lazy(() => import('./pages/resources/CustomersPage'));
const GuidesPage = lazy(() => import('./pages/resources/GuidesPage'));
const SupportPage = lazy(() => import('./pages/resources/SupportPage'));

const PricingPage = lazy(() => import('./pages/PricingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

// AI Pages
const AILandingPage = lazy(() => import('./pages/AILandingPage'));
const HeliosChatPage = lazy(() => import('./pages/HeliosChatPage'));

// Dashboard Components
const DashboardLayout = lazy(() => import('./pages/dashboard/DashboardLayout'));
const DashboardOverview = lazy(() => import('./pages/dashboard/DashboardOverview'));
const DashboardPayments = lazy(() => import('./pages/dashboard/DashboardPayments'));
const DashboardCustomers = lazy(() => import('./pages/dashboard/DashboardCustomers'));
const DashboardProducts = lazy(() => import('./pages/dashboard/DashboardProducts'));
const DashboardSubscriptions = lazy(() => import('./pages/dashboard/DashboardSubscriptions'));
const DashboardInvoices = lazy(() => import('./pages/dashboard/DashboardInvoices'));
const DashboardBalance = lazy(() => import('./pages/dashboard/DashboardBalance'));
const DashboardPayouts = lazy(() => import('./pages/dashboard/DashboardPayouts'));
const DashboardAcceptPayments = lazy(() => import('./pages/dashboard/DashboardAcceptPayments'));
const DashboardOrders = lazy(() => import('./pages/dashboard/DashboardOrders'));
const DashboardConnect = lazy(() => import('./pages/dashboard/DashboardConnect'));
const DashboardRadar = lazy(() => import('./pages/dashboard/DashboardRadar'));
const DashboardReports = lazy(() => import('./pages/dashboard/DashboardReports'));
const DashboardDevelopers = lazy(() => import('./pages/dashboard/DashboardDevelopers'));
const DashboardSettings = lazy(() => import('./pages/dashboard/DashboardSettings'));

const App = () => {
  // Loading component for Suspense
  const Loading = () => (
    <div className="loading-screen">
      <div className="loader"></div>
    </div>
  );

  return (
    <AuthProvider>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <Router>
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                
                {/* Product Routes */}
                <Route path="/products/payments" element={<PaymentsPage />} />
                <Route path="/products/checkout" element={<CheckoutPage />} />
                <Route path="/products/payment-links" element={<PaymentLinksPage />} />
                <Route path="/products/terminal" element={<TerminalPage />} />
                <Route path="/products/invoicing" element={<InvoicingPage />} />
                <Route path="/products/billing" element={<BillingPage />} />
                <Route path="/products/tax" element={<TaxPage />} />
                
                {/* Solution Routes */}
                <Route path="/solutions/ecommerce" element={<EcommercePage />} />
                <Route path="/solutions/saas" element={<SaasPage />} />
                <Route path="/solutions/marketplaces" element={<MarketplacesPage />} />
                <Route path="/solutions/enterprise" element={<EnterprisePage />} />
                
                {/* Community & Developer Routes */}
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                
                {/* Developer Routes */}
                <Route path="/developers/docs" element={<DocsPage />} />
                <Route path="/developers/api" element={<ApiPage />} />
                <Route path="/developers/sdks" element={<SdksPage />} />
                <Route path="/developers/components" element={<ComponentsPage />} />
                <Route path="/developers/terminal" element={<DeveloperTerminal />} />
                
                {/* Resource Routes */}
                <Route path="/resources/blog" element={<BlogPage />} />
                <Route path="/resources/customers" element={<CustomersPage />} />
                <Route path="/resources/guides" element={<GuidesPage />} />
                <Route path="/support" element={<SupportPage />} />
                
                {/* AI Routes */}
                <Route path="/ai" element={<AILandingPage />} />
                <Route path="/ai/chat" element={
                  <ProtectedRoute>
                    <HeliosChatPage />
                  </ProtectedRoute>
                } />
                
                {/* Auth Callback Routes */}
                <Route path="/auth/microsoft/callback" element={<MicrosoftAuthCallback />} />
                <Route path="/auth/apple/callback" element={<AppleAuthCallback />} />
                <Route path="/auth/slack/callback" element={<SlackAuthCallback />} />

                {/* Protected Dashboard Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardOverview />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/payments" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardPayments />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/customers" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardCustomers />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/products" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardProducts />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/subscriptions" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardSubscriptions />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/invoices" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardInvoices />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/balance" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardBalance />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/payouts" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardPayouts />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/accept-payments" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardAcceptPayments />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/orders" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardOrders />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/radar" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardRadar />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/connect" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardConnect />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/reports" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardReports />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/settings" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardSettings />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/developers" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardDevelopers />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
              </Routes>
            </Suspense>
          </Router>
        </I18nextProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;