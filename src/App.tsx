import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import InvitationPage from "./pages/InvitationPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import EventPage from "./pages/EventPage";
import MyEventsPage from "./pages/MyEventsPage";
import NonprofitHome from "./pages/nonprofit/NonprofitHome";
import NonprofitEvents from "./pages/nonprofit/NonprofitEvents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Make AuthPage the default landing page */}
            <Route path="/" element={<AuthPage />} />
            
            {/* Move the old index page to a new route */}
            <Route path="/home" element={<Index />} />
            
            {/* Keep other routes the same */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/invitation/:id" element={<InvitationPage />} />
            <Route path="/invitation/:id/confirmation" element={<ConfirmationPage />} />
            <Route path="/invitation/:id/event" element={<EventPage />} />
            
            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/my-events" element={<MyEventsPage />} />
            </Route>
            
            {/* Nonprofit protected routes */}
            <Route element={<PrivateRoute requireNonprofit={true} />}>
              <Route path="/nonprofit/home" element={<NonprofitHome />} />
              <Route path="/nonprofit/events" element={<NonprofitEvents />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
