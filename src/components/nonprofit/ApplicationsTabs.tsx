
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ApplicationsList from './ApplicationsList';

type ApplicationsTabsProps = {
  applications: any[];
};

const ApplicationsTabs = ({ applications }: ApplicationsTabsProps) => {
  return (
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
            <ApplicationsList applications={applications} />
          </TabsContent>
          
          <TabsContent value="confirmed">
            <ApplicationsList applications={applications.filter(app => app.status === 'confirmed')} />
          </TabsContent>
          
          <TabsContent value="pending">
            <ApplicationsList applications={applications.filter(app => app.status === 'pending')} />
          </TabsContent>
          
          <TabsContent value="declined">
            <ApplicationsList applications={applications.filter(app => app.status === 'declined')} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApplicationsTabs;
