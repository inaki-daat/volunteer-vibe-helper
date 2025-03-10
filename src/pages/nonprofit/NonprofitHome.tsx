
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import EventsList from '@/components/nonprofit/EventsList';
import PendingApplications from '@/components/nonprofit/PendingApplications';
import ApplicationsTabs from '@/components/nonprofit/ApplicationsTabs';

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
    const recent = [...allApplications].sort((a, b) => 
      new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime()
    ).slice(0, 5);

    setApplications(allApplications);
    setPendingApplications(pending);
    setRecentApplications(recent);
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    const { error } = await supabase
      .from('applications')
      .update({ 
        status: status, 
        updated_at: new Date().toISOString() 
      } as any)
      .eq('id', applicationId as any);

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
        <EventsList events={events} />
        <PendingApplications 
          applications={pendingApplications} 
          onUpdateStatus={updateApplicationStatus} 
        />
      </div>

      <div className="mt-8">
        <ApplicationsTabs applications={recentApplications} />
      </div>
    </div>
  );
};

export default NonprofitHome;
