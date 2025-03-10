
import React from 'react';
import { Link } from 'react-router-dom';
import InvitationCard from '@/components/InvitationCard';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Building2, User } from 'lucide-react';

const sampleInvitation = {
  id: "inv-123456",
  eventName: "Community Garden Cleanup",
  organizationName: "Green Earth Foundation",
  date: "2023-09-15",
  time: "9:00 AM - 12:00 PM",
  location: {
    name: "Sunshine Community Garden",
    address: "123 Park Avenue",
    city: "San Francisco",
    state: "CA",
    zip: "94107",
    country: "USA"
  },
  description: "Join us for our monthly community garden cleanup! Help us maintain this beautiful space while connecting with your community. All tools and refreshments will be provided. No experience necessary - just bring your enthusiasm and a pair of gloves if you have them.",
  imageUrl: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
};

const Index = () => {
  const { user, signOut, isNonprofit } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="container px-4 py-12 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            Volunteer Connect
          </h1>
          <div className="flex gap-2">
            {user ? (
              <>
                <Button variant="outline" onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
                {isNonprofit ? (
                  <Link to="/nonprofit/home">
                    <Button>
                      <Building2 className="mr-2 h-4 w-4" /> Nonprofit Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/my-events">
                    <Button>
                      <User className="mr-2 h-4 w-4" /> My Events
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <Link to="/auth">
                <Button>
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <p className="text-xl text-muted-foreground">
              A platform for non-profits to seamlessly connect with volunteers
            </p>
            <div className="flex justify-center gap-4 mt-4">
              {!user && (
                <Link 
                  to="/auth" 
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-accent hover:bg-accent/90 rounded-md shadow hover-lift"
                >
                  Get Started
                </Link>
              )}
              <Link 
                to="/my-events" 
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors rounded-md shadow hover-lift"
              >
                View Events
              </Link>
            </div>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-md">
            <h2 className="text-2xl font-display font-semibold mb-6">Sample Volunteer Invitation</h2>
            <p className="text-muted-foreground mb-8">
              Below is an example of how an invitation to volunteers would look. It includes RSVP functionality, 
              a QR code for check-in, and directions to the event.
            </p>
            
            <div className="flex justify-center">
              <InvitationCard invitation={sampleInvitation} variant="preview" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
