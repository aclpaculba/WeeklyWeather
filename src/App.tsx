import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cloud, Info } from 'lucide-react';

import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { SkeletonCard } from './components/SkeletonCard';
import { ErrorMessage } from './components/ErrorMessage';
import { ForecastGrid } from './components/ForecastGrid';

import { GeoLocation, ForecastResponse } from './lib/types';
import { getAccentColor, getVibeClasses } from './lib/vibe';
import { loadFromCache, saveToCache } from './lib/cache';
import { fetchForecast } from './api/openMeteo';

const WeatherVibesApp: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<GeoLocation | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const cached = loadFromCache();
    if (cached) {
      setSelectedLocation(cached.location);
      setForecast(cached.forecast);
    }
  }, []);

  const handleLocationSelect = async (location: GeoLocation) => {
    setSelectedLocation(location);
    setIsLoading(true);
    setError(null);
    try {
      const forecastData = await fetchForecast(location.latitude, location.longitude);
      setForecast(forecastData);
      saveToCache(location, forecastData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Forecast fetch failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (selectedLocation) {
      void handleLocationSelect(selectedLocation);
    }
  };

  const currentWeatherCode = forecast?.daily.weathercode[0] || 0;
  const vibeClasses = getVibeClasses(currentWeatherCode);
  const accentColor = getAccentColor(currentWeatherCode);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${vibeClasses} transition-all duration-1000 relative overflow-hidden`}>
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header with controls */}
        <div className="flex justify-between items-start mb-8">
          <Hero />
          <div className="flex gap-2">
            <button
              onClick={() => setShowAbout(!showAbout)}
              className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-xl transition-colors"
              aria-label="About"
            >
              <Info className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setUnit(u => u === 'C' ? 'F' : 'C')}
              className="px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-xl text-white font-medium transition-colors"
              aria-label={`Switch to ${unit === 'C' ? 'Fahrenheit' : 'Celsius'}`}
            >
              °{unit}
            </button>
          </div>
        </div>

        {/* About panel */}
        <AnimatePresence>
          {showAbout && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-3">About Weather Vibes</h3>
                <p className="text-white/90 mb-3">
                  A beautifully animated weather app that adapts its design to current conditions.
                  Built with React, TypeScript, Tailwind CSS, and Framer Motion.
                </p>
                <p className="text-white/80 text-sm">
                  Weather data provided by Open-Meteo.com. Forecasts cached for 30 minutes.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <SearchBar onLocationSelect={handleLocationSelect} isLoading={isLoading} />

        {/* Loading state */}
        {isLoading && <div role="status" aria-live="polite" className="sr-only">Loading weather data...</div>}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 max-w-7xl mx-auto">
            {Array.from({ length: 7 }).map((_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div role="alert" aria-live="assertive">
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
        )}

        {/* Forecast display */}
        {forecast && selectedLocation && !isLoading && !error && (
          <ForecastGrid forecast={forecast} location={selectedLocation} unit={unit} />
        )}

        {/* Empty state */}
        {!forecast && !isLoading && !error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white/70 max-w-md mx-auto">
            <Cloud className={`w-24 h-24 mx-auto mb-4 ${accentColor}`} />
            <p className="text-xl">Search for a city to see the 7-day forecast</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WeatherVibesApp;