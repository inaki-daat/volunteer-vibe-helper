
import React from 'react';
import { Badge } from '@/components/ui/badge';

type StatusBadgeProps = {
  status: string;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
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

export default StatusBadge;
