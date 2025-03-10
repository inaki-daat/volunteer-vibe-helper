
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Clock, Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type EventCardProps = {
  event: {
    id: string;
    event_name: string;
    location: string;
    date: string;
  };
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card key={event.id} className="overflow-hidden">
      <div className="bg-accent h-24 flex items-center justify-center">
        <Calendar className="h-10 w-10 text-accent-foreground opacity-50" />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold line-clamp-1">{event.event_name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{event.location}</p>
            <div className="flex items-center gap-2 mt-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs">{format(new Date(event.date), 'MMM d, yyyy - h:mm a')}</span>
            </div>
          </div>
          <Link to={`/nonprofit/events/${event.id}`}>
            <Button size="icon" variant="ghost">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
