
import React, { useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface DirectionsMapProps {
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  className?: string;
}

const DirectionsMap: React.FC<DirectionsMapProps> = ({ location, className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);

  const fullAddress = encodeURIComponent(
    `${location.address}, ${location.city}, ${location.state} ${location.zip}, ${location.country}`
  );
  
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${fullAddress}`;
  
  // Placeholder image for actual map integration
  const mapPlaceholderUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" + 
    fullAddress + 
    "&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7C" + 
    (location.coordinates ? 
      `${location.coordinates.lat},${location.coordinates.lng}` : 
      fullAddress) + 
    "&key=YOUR_API_KEY";
  
  return (
    <div className={`rounded-xl overflow-hidden shadow-lg ${className}`}>
      <div className="relative w-full h-48 md:h-64 bg-muted animate-fade-in">
        {/* Placeholder for map - in a real implementation this would use a map library */}
        <div className="absolute inset-0 flex items-center justify-center bg-accent/10">
          <div className="text-center p-4">
            <MapPin className="w-12 h-12 text-accent mx-auto mb-2 animate-bounce" />
            <p className="text-sm font-medium text-muted-foreground">
              {location.address}, {location.city}
            </p>
            <p className="text-sm font-medium text-muted-foreground">
              {location.state} {location.zip}, {location.country}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-card">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-accent hover:bg-accent/90 rounded-md shadow hover-lift"
        >
          Get Directions
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>
    </div>
  );
};

export default DirectionsMap;
