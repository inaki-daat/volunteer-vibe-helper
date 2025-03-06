
import React from 'react';
import InvitationCard from '@/components/InvitationCard';

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
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
              Volunteer Connect
            </h1>
            <p className="text-xl text-muted-foreground">
              A platform for non-profits to seamlessly connect with volunteers
            </p>
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
          
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-md">
            <h2 className="text-2xl font-display font-semibold mb-4">Key Features</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1"/><path d="M17 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1"/><path d="M8 21h8"/><path d="M12 3v18"/><path d="M2 8h20"/></svg>
                </div>
                <h3 className="text-lg font-semibold">Simple RSVP</h3>
                <p className="text-sm text-muted-foreground">
                  Volunteers can quickly confirm their attendance with a single click
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 8.5v2a2.5 2.5 0 0 0 5 0v-2a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 0 5 0v-2"/><path d="M8 14.5v2a2.5 2.5 0 0 0 5 0v-2"/></svg>
                </div>
                <h3 className="text-lg font-semibold">QR Code Check-in</h3>
                <p className="text-sm text-muted-foreground">
                  Fast and efficient check-in process for events using scannable QR codes
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="M16.5 9.4 7.55 4.24"/><path d="M3.29 7 12 12l8.71-5"/><circle cx="18.5" cy="15.5" r="2.5"/><path d="M20.27 17.27 22 19"/></svg>
                </div>
                <h3 className="text-lg font-semibold">Built-in Directions</h3>
                <p className="text-sm text-muted-foreground">
                  Integrated maps and directions to help volunteers find the event location
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
