
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type PendingApplicationsProps = {
  applications: any[];
  onUpdateStatus: (applicationId: string, status: string) => void;
};

const PendingApplications = ({ applications, onUpdateStatus }: PendingApplicationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
        <CardDescription>Volunteers waiting for approval</CardDescription>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">No pending approvals</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.slice(0, 5).map((application) => (
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
                    onClick={() => onUpdateStatus(application.id, 'declined')}
                  >
                    Decline
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => onUpdateStatus(application.id, 'confirmed')}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {applications.length > 5 && (
          <div className="text-center mt-4">
            <Link to="/nonprofit/applications">
              <Button variant="link">View All</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PendingApplications;
