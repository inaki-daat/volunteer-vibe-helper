
import React from 'react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import StatusBadge from './StatusBadge';

type ApplicationsListProps = {
  applications: any[];
};

const ApplicationsList = ({ applications }: ApplicationsListProps) => {
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

export default ApplicationsList;
