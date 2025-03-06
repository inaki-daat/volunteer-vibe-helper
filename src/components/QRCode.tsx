
import React, { useEffect, useState } from 'react';
import QRCodeLib from 'qrcode';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

const QRCode: React.FC<QRCodeProps> = ({ value, size = 150, className }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        setIsLoading(true);
        const dataUrl = await QRCodeLib.toDataURL(value, {
          width: size,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
        setQrCodeUrl(dataUrl);
        setIsLoading(false);
      } catch (error) {
        console.error('Error generating QR code:', error);
        setIsLoading(false);
      }
    };

    generateQRCode();
  }, [value, size]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center w-[${size}px] h-[${size}px] ${className}`}>
        <div className="animate-pulse bg-gray-200 rounded-md w-full h-full"></div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img 
        src={qrCodeUrl} 
        alt="QR Code" 
        className="rounded-lg shadow-md animate-fade-in"
        width={size}
        height={size}
      />
    </div>
  );
};

export default QRCode;
