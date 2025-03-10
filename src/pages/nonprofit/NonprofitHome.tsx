
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Users, Clock, Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NonprofitHome = () => {
  const { profile } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [pendingApplications, setPendingApplications] = useState<any[]>([]);
  const [recentApplications, setRecentApplications] = useState<any[]>([]);

  useEffect(() => {
    if (profile) {
      fetchEvents();
      fetchApplications();
    }
  }, [profile]);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('nonprofit_id', profile.id)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching events:', error);
      return;
    }

    setEvents(data || []);
  };

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        volunteer:profiles!volunteer_id(*),
        event:events(*)
      `)
      .in('event.nonprofit_id', [profile.id]);

    if (error) {
      console.error('Error fetching applications:', error);
      return;
    }

    const allApplications = data || [];
    const pending = allApplications.filter(app => app.status === 'pending');
    const recent = allApplications.sort((a, b) => 
      new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime()
    ).slice(0, 5);

    setApplications(allApplications);
    setPendingApplications(pending);
    setRecentApplications(recent);
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    const { error } = await supabase
      .from('applications')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', applicationId);

    if (error) {
      console.error('Error updating application:', error);
      return;
    }

    // Refresh the applications
    fetchApplications();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {profile?.full_name}</h1>
          <p className="text-muted-foreground">Nonprofit Dashboard</p>
        </div>
        <Link to="/nonprofit/events/new">
          <Button>Create New Event</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Volunteers waiting for approval</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingApplications.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">No pending approvals</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingApplications.slice(0, 5).map((application) => (
                  <div key={application.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{application.volunteer.full_name?.charAt(0) || 'V'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{application.volunteer.full_name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          Applied for: {application.event.event_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => updateApplicationStatus(application.id, 'declined')}
                      >
                        Decline
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => updateApplicationStatus(application.id, 'confirmed')}
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {pendingApplications.length > 5 && (
              <div className="text-center mt-4">
                <Link to="/nonprofit/applications">
                  <Button variant="link">View All</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Volunteer Applications</CardTitle>
            <CardDescription>See your latest volunteer applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="declined">Declined</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                {renderApplicationsList(recentApplications)}
              </TabsContent>
              
              <TabsContent value="confirmed">
                {renderApplicationsList(recentApplications.filter(app => app.status === 'confirmed'))}
              </TabsContent>
              
              <TabsContent value="pending">
                {renderApplicationsList(recentApplications.filter(app => app.status === 'pending'))}
              </TabsContent>
              
              <TabsContent value="declined">
                {renderApplicationsList(recentApplications.filter(app => app.status === 'declined'))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const renderApplicationsList = (applications: any[]) => {
  if (applications.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">No applications found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">Volunteer</th>
            <th className="text-left py-3 px-4">Event</th>
            <th className="text-left py-3 px-4">Applied Date</th>
            <th className="text-left py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id} className="border-b">
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{application.volunteer.full_name?.charAt(0) || 'V'}</AvatarFallback>
                  </Avatar>
                  <span>{application.volunteer.full_name}</span>
                </div>
              </td>
              <td className="py-3 px-4">{application.event.event_name}</td>
              <td className="py-3 px-4">{format(new Date(application.applied_at), 'MMM d, yyyy')}</td>
              <td className="py-3 px-4">
                <StatusBadge status={application.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'confirmed':
      return <Badge className="bg-green-500">Confirmed</Badge>;
    case 'pending':
      return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>;
    case 'declined':
      return <Badge variant="destructive">Declined</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default NonprofitHome;
