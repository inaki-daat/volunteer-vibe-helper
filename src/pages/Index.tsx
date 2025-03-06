
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
        </div>
      </div>
    </div>
  );
};

export default Index;
