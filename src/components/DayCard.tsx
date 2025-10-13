import React from 'react';
import { motion } from 'framer-motion';
import { getWeatherInfo } from '../lib/weatherCode';
import { WeatherIcon } from './WeatherIcon';

export const DayCard: React.FC<{
  date: string;
  weatherCode: number;
  maxTemp: number;
  minTemp: number;
  precipProb: number;
  precipSum: number;
  index: number;
  unit: 'C' | 'F';
}> = ({ date, weatherCode, maxTemp, minTemp, precipProb, precipSum, index, unit }) => {
  const { label, icon } = getWeatherInfo(weatherCode);
  const dateObj = new Date(date);
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const monthDay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const displayMaxTemp = unit === 'F' ? Math.round(maxTemp * 9/5 + 32) : Math.round(maxTemp);
  const displayMinTemp = unit === 'F' ? Math.round(minTemp * 9/5 + 32) : Math.round(minTemp);
  const displayPrecip = unit === 'F' ? (precipSum / 25.4).toFixed(2) : precipSum.toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
    >
      <div className="text-center">
        <div className="text-white/80 font-semibold text-lg mb-1">{dayName}</div>
        <div className="text-white/60 text-sm mb-4">{monthDay}</div>

        <div className="flex justify-center mb-4">
          <WeatherIcon iconType={icon} className="w-12 h-12 text-white" />
        </div>

        <div className="text-white/90 text-sm mb-4 min-h-[40px] flex items-center justify-center">{label}</div>

        <div className="flex justify-center gap-2 mb-4">
          <span className="text-white text-2xl font-bold">{displayMaxTemp}°</span>
          <span className="text-white/60 text-2xl">{displayMinTemp}°</span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-white/70">
            <span>Rain:</span>
            <span className="font-medium text-white">{precipProb}%</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Total:</span>
            <span className="font-medium text-white">{displayPrecip} {unit === 'F' ? 'in' : 'mm'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};