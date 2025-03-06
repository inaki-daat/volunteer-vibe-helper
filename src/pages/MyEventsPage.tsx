
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import InvitationCard from '@/components/InvitationCard';

// Sample data - in a real app, this would come from an API
const sampleInvitations = [
  {
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
    description: "Join us for our monthly community garden cleanup! Help us maintain this beautiful space while connecting with your community.",
    imageUrl: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
    status: "confirmed"
  },
  {
    id: "inv-789012",
    eventName: "Food Bank Volunteer Day",
    organizationName: "Community Helpers",
    date: "2023-09-20",
    time: "10:00 AM - 2:00 PM",
    location: {
      name: "Downtown Food Bank",
      address: "456 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "USA"
    },
    description: "Help us sort and pack food donations for distribution to those in need throughout our community.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    status: "pending"
  },
  {
    id: "inv-345678",
    eventName: "Beach Cleanup Initiative",
    organizationName: "Ocean Preservation Society",
    date: "2023-10-05",
    time: "8:00 AM - 11:00 AM",
    location: {
      name: "Ocean Beach",
      address: "Great Highway",
      city: "San Francisco",
      state: "CA",
      zip: "94122",
      country: "USA"
    },
    description: "Join us for a morning of community service as we clean up our beautiful coastline and protect marine life.",
    imageUrl: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    status: "confirmed"
  }
];

const MyEventsPage = () => {
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending'>('all');
  
  const filteredEvents = sampleInvitations.filter(event => {
    if (filter === 'all') return true;
    return event.status === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-12">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          <Link 
            to={`/`}
            className="inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to home
          </Link>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-display font-bold">My Volunteer Events</h1>
            <p className="text-muted-foreground">
              View all your upcoming volunteer opportunities in one place.
            </p>
          </div>
          
          <div className="flex justify-center space-x-4 mb-8">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-accent text-white' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All Events
            </button>
            <button 
              onClick={() => setFilter('confirmed')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'confirmed' 
                  ? 'bg-accent text-white' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Confirmed
            </button>
            <button 
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'pending' 
                  ? 'bg-accent text-white' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Pending
            </button>
          </div>
          
          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <Calendar className="w-12 h-12 mx-auto text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground">
                There are no events matching your current filter.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((invitation) => (
                <InvitationCard 
                  key={invitation.id} 
                  invitation={invitation} 
                  variant="preview"
                  className="h-full"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEventsPage;
