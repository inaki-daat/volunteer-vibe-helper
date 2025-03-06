
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import QRCode from './QRCode';
import { QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QRCodeModalProps {
  value: string;
  title?: string;
  triggerClassName?: string;
  size?: number;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ 
  value, 
  title = "QR Code", 
  triggerClassName,
  size = 200
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button 
          className={cn(
            "inline-flex items-center justify-center text-sm font-medium transition-colors", 
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2",
            triggerClassName
          )}
        >
          <QrCode className="w-5 h-5 mr-2" />
          <span>Show QR Code</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center p-6">
          <QRCode value={value} size={size} />
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Present this QR code when you arrive at the event for quick check-in
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
