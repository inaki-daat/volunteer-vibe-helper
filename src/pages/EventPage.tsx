
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';
import DirectionsMap from '@/components/DirectionsMap';

const sampleEvent = {
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
  attendees: 24,
  maxAttendees: 30,
  description: "Join us for our monthly community garden cleanup! Help us maintain this beautiful space while connecting with your community. All tools and refreshments will be provided. No experience necessary - just bring your enthusiasm and a pair of gloves if you have them.",
  schedule: [
    { time: "9:00 AM", activity: "Check-in and welcome" },
    { time: "9:30 AM", activity: "Orientation and safety briefing" },
    { time: "10:00 AM", activity: "Group assignments and tasks" },
    { time: "11:30 AM", activity: "Refreshment break" },
    { time: "12:00 PM", activity: "Wrap-up and thank you" }
  ],
  organizer: {
    name: "Jane Smith",
    role: "Volunteer Coordinator",
    contact: "jane@greenearthfoundation.org"
  },
  imageUrl: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
};

const EventPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, we would fetch the event data based on the ID
  const event = sampleEvent;
  
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-12">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <Link 
            to={`/invitation/${id}/confirmation`}
            className="inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to confirmation
          </Link>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {event.imageUrl && (
              <div className="relative w-full h-64 overflow-hidden">
                <img 
                  src={event.imageUrl}
                  alt={event.eventName}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            )}
            
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-display font-bold">{event.eventName}</h1>
                <p className="text-muted-foreground">{event.organizationName}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-accent" />
                      <span className="text-sm">{formattedDate}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-accent" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm block">{event.location.name}</span>
                        <span className="text-sm text-muted-foreground block">
                          {event.location.address}, {event.location.city}
                        </span>
                        <span className="text-sm text-muted-foreground block">
                          {event.location.state} {event.location.zip}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-accent" />
                      <span className="text-sm">{event.attendees} of {event.maxAttendees} spots filled</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold mb-4">Event Description</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                </div>
                
                <div>
                  <DirectionsMap location={event.location} className="mb-6" />
                  
                  <div className="bg-muted/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Event Schedule</h3>
                    <ul className="space-y-3">
                      {event.schedule.map((item, index) => (
                        <li key={index} className="flex">
                          <span className="text-sm font-medium w-20 flex-shrink-0">{item.time}</span>
                          <span className="text-sm text-muted-foreground">{item.activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-display font-semibold mb-4">About the Organizer</h2>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <span className="text-accent font-medium">{event.organizer.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="font-medium">{event.organizer.name}</h3>
                <p className="text-sm text-muted-foreground">{event.organizer.role}</p>
                <p className="text-sm text-muted-foreground mt-1">{event.organizer.contact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
