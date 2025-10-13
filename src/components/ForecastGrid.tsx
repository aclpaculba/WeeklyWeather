import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { ForecastResponse, GeoLocation } from '../types';
import { DayCard } from './DayCard';

export const ForecastGrid: React.FC<{
  forecast: ForecastResponse;
  location: GeoLocation;
  unit: 'C' | 'F';
}> = ({ forecast, location, unit }) => {
  const { daily } = forecast;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-white" />
          <h2 className="text-3xl font-bold text-white">
            {location.name}, {location.country}
          </h2>
        </div>
        <p className="text-white/80">7-Day Forecast</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {daily.time.map((date, index) => (
          <DayCard
            key={date}
            date={date}
            weatherCode={daily.weathercode[index]}
            maxTemp={daily.temperature_2m_max[index]}
            minTemp={daily.temperature_2m_min[index]}
            precipProb={daily.precipitation_probability_max[index]}
            precipSum={daily.precipitation_sum[index]}
            index={index}
            unit={unit}
          />
        ))}
      </div>
    </motion.div>
  );
};
