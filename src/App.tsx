
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InvitationPage from "./pages/InvitationPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import EventPage from "./pages/EventPage";
import MyEventsPage from "./pages/MyEventsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/invitation/:id" element={<InvitationPage />} />
          <Route path="/invitation/:id/confirmation" element={<ConfirmationPage />} />
          <Route path="/invitation/:id/event" element={<EventPage />} />
          <Route path="/my-events" element={<MyEventsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
