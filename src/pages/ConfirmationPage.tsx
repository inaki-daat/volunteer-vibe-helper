
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import QRCodeModal from '@/components/QRCodeModal';
import DirectionsMap from '@/components/DirectionsMap';
import { Calendar, Clock, MapPin, Download, ArrowLeft } from 'lucide-react';

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
  imageUrl: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
  contactPerson: {
    name: "Jane Smith",
    phone: "(555) 123-4567",
    email: "jane@greenearthfoundation.org"
  }
};

const ConfirmationPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, we would fetch the invitation data based on the ID
  const invitation = sampleInvitation;
  
  const qrCodeValue = `https://volunteer-vibe.example.com/check-in/${invitation.id}`;
  
  const formattedDate = new Date(invitation.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const addToCalendar = () => {
    // In a real app, this would generate an ICS file or open calendar options
    alert('Calendar integration would go here in a real app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-12">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <Link 
            to={`/invitation/${id}`}
            className="inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to invitation
          </Link>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-display font-bold">{invitation.eventName}</h1>
                  <p className="text-muted-foreground">{invitation.organizationName}</p>
                </div>
                <div className="bg-accent/10 text-accent font-medium px-4 py-1.5 rounded-full text-sm">
                  Confirmed
                </div>
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
                      <span className="text-sm">{invitation.time}</span>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm block">{invitation.location.name}</span>
                        <span className="text-sm text-muted-foreground block">
                          {invitation.location.address}, {invitation.location.city}
                        </span>
                        <span className="text-sm text-muted-foreground block">
                          {invitation.location.state} {invitation.location.zip}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={addToCalendar}
                    className="inline-flex items-center justify-center px-4 py-2 bg-accent/10 text-accent rounded-md text-sm font-medium hover:bg-accent/20 transition-colors hover-lift"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </button>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold mb-2">Contact Person</h3>
                    <p className="text-sm">{invitation.contactPerson.name}</p>
                    <p className="text-sm text-muted-foreground">{invitation.contactPerson.phone}</p>
                    <p className="text-sm text-muted-foreground">{invitation.contactPerson.email}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-xl p-6 flex flex-col items-center">
                    <h3 className="text-lg font-semibold mb-4">Your Check-in QR Code</h3>
                    <QRCodeModal 
                      value={qrCodeValue} 
                      title="Your Check-in QR Code"
                      size={200}
                      triggerClassName="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 hover-lift"
                    />
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Click to view your QR code for quick check-in at the event
                    </p>
                  </div>
                  
                  <DirectionsMap location={invitation.location} className="mt-6" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-display font-semibold mb-4">What to Expect</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Thank you for volunteering with {invitation.organizationName}! Here's what you can expect at the {invitation.eventName}:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Please arrive 15 minutes early to check in</li>
                <li>Orientation will be provided for all volunteers</li>
                <li>Refreshments and snacks will be available</li>
                <li>The event will take place rain or shine (unless severe weather)</li>
                <li>Parking is available on-site</li>
              </ul>
              <p className="pt-2">
                If you have any questions or need to update your RSVP, please contact {invitation.contactPerson.name} at {invitation.contactPerson.email} or {invitation.contactPerson.phone}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
