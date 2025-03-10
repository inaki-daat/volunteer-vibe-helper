
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EventCard from './EventCard';

type EventsListProps = {
  events: any[];
};

const EventsList = ({ events }: EventsListProps) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Your Events</CardTitle>
          <CardDescription>Manage your upcoming volunteer opportunities</CardDescription>
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No events created yet</p>
              <Link to="/nonprofit/events/new">
                <Button variant="outline" className="mt-4">Create Your First Event</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.slice(0, 4).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
          {events.length > 0 && (
            <div className="text-center">
              <Link to="/nonprofit/events">
                <Button variant="outline">View All Events</Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsList;
