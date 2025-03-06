
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Check, X } from 'lucide-react';
import QRCodeModal from './QRCodeModal';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface InvitationCardProps {
  invitation: {
    id: string;
    eventName: string;
    organizationName: string;
    date: string;
    time: string;
    location: {
      name: string;
      address: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    description: string;
    imageUrl?: string;
  };
  variant?: 'preview' | 'full';
  className?: string;
}

const InvitationCard: React.FC<InvitationCardProps> = ({ 
  invitation, 
  variant = 'full',
  className = ''
}) => {
  const [rsvpStatus, setRsvpStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRSVP = (status: 'accepted' | 'declined') => {
    setIsAnimating(true);
    
    // Simulate API call
    setTimeout(() => {
      setRsvpStatus(status);
      setIsAnimating(false);
      
      if (status === 'accepted') {
        toast.success("Thank you for confirming your attendance!");
      } else {
        toast.info("Thank you for letting us know you can't attend.");
      }
    }, 600);
  };

  const qrCodeValue = `https://volunteer-vibe.example.com/check-in/${invitation.id}`;
  
  const formattedDate = new Date(invitation.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div 
      className={cn(
        "overflow-hidden bg-white border border-border rounded-xl shadow-lg transition-all",
        "hover:shadow-xl",
        variant === 'preview' ? "max-w-sm" : "w-full max-w-4xl",
        className
      )}
    >
      <div className="relative">
        {invitation.imageUrl ? (
          <div className="relative w-full h-48 md:h-64 overflow-hidden">
            <img 
              src={invitation.imageUrl}
              alt={invitation.eventName}
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        ) : (
          <div className="bg-accent/20 w-full h-48 md:h-64 flex items-center justify-center">
            <span className="text-accent font-display text-2xl">{invitation.organizationName}</span>
          </div>
        )}
        
        <div className="absolute top-4 right-4">
          <div className="rounded-full bg-white px-3 py-1 text-xs font-medium text-primary shadow-md">
            Volunteer Event
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="space-y-3 mb-6">
          <div className="space-y-1">
            <h5 className="text-sm font-medium text-accent">{invitation.organizationName}</h5>
            <h3 className="text-2xl md:text-3xl font-display font-semibold tracking-tight">
              {invitation.eventName}
            </h3>
          </div>
          
          <p className="text-muted-foreground leading-relaxed">
            {variant === 'preview' 
              ? `${invitation.description.substring(0, 100)}${invitation.description.length > 100 ? '...' : ''}`
              : invitation.description
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-accent" />
              <span className="text-sm text-muted-foreground">{formattedDate}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-accent" />
              <span className="text-sm text-muted-foreground">{invitation.time}</span>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-sm text-muted-foreground block">{invitation.location.name}</span>
                <span className="text-sm text-muted-foreground block">
                  {invitation.location.address}, {invitation.location.city}
                </span>
                <span className="text-sm text-muted-foreground block">
                  {invitation.location.state} {invitation.location.zip}
                </span>
              </div>
            </div>
          </div>
          
          {variant === 'full' && (
            <div className="flex flex-col items-center justify-center">
              <QRCodeModal 
                value={qrCodeValue} 
                title={`Check-in for ${invitation.eventName}`}
                triggerClassName="hover-lift"
              />
              <span className="text-xs text-muted-foreground mt-2">Click to view QR code for check-in</span>
            </div>
          )}
        </div>

        {variant === 'full' && rsvpStatus === 'pending' && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => handleRSVP('accepted')}
              disabled={isAnimating}
              className={cn(
                "flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium",
                "bg-accent text-white hover:bg-accent/90 transition-colors",
                isAnimating ? "opacity-50" : "",
                "hover-lift"
              )}
            >
              <Check className="w-4 h-4 mr-2" />
              Accept
            </button>
            
            <button
              onClick={() => handleRSVP('declined')}
              disabled={isAnimating}
              className={cn(
                "flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium",
                "bg-muted text-muted-foreground hover:bg-muted/80 transition-colors",
                isAnimating ? "opacity-50" : "",
                "hover-lift"
              )}
            >
              <X className="w-4 h-4 mr-2" />
              Decline
            </button>
          </div>
        )}
        
        {variant === 'full' && rsvpStatus === 'accepted' && (
          <div className="mt-6">
            <Link 
              to={`/invitation/${invitation.id}/confirmation`}
              className={cn(
                "flex items-center justify-center w-full px-4 py-2 rounded-md text-sm font-medium",
                "bg-accent text-white hover:bg-accent/90 transition-colors",
                "hover-lift"
              )}
            >
              <Check className="w-4 h-4 mr-2" />
              View Event Details
            </Link>
          </div>
        )}
        
        {variant === 'full' && rsvpStatus === 'declined' && (
          <div className="mt-6 p-3 bg-muted rounded-md text-center text-sm text-muted-foreground">
            Thank you for your response. We hope to see you at a future event!
          </div>
        )}
        
        {variant === 'preview' && (
          <div className="mt-6">
            <Link 
              to={`/invitation/${invitation.id}`}
              className={cn(
                "flex items-center justify-center w-full px-4 py-2 rounded-md text-sm font-medium",
                "bg-accent text-white hover:bg-accent/90 transition-colors",
                "hover-lift"
              )}
            >
              View Invitation
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitationCard;
