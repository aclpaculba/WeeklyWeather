import React from 'react';
import { Sun, Cloud, CloudRain, CloudDrizzle, CloudSnow, Zap, Wind } from 'lucide-react';

export const WeatherIcon: React.FC<{ iconType: string; className?: string }> = ({ iconType, className = 'w-8 h-8' }) => {
  const icons: Record<string, React.ReactNode> = {
    sun: <Sun className={className} />,
    cloud: <Cloud className={className} />,
    rain: <CloudRain className={className} />,
    drizzle: <CloudDrizzle className={className} />,
    snow: <CloudSnow className={className} />,
    storm: <Zap className={className} />,
    wind: <Wind className={className} />,
  };

  return <>{icons[iconType] || icons.cloud}</>;
};
