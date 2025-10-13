import { CachedData, ForecastResponse, GeoLocation } from './types';

const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

// In-memory cache instead of localStorage
let memoryCache: CachedData | null = null;

export const saveToCache = (location: GeoLocation, forecast: ForecastResponse) => {
  memoryCache = {
    location,
    forecast,
    timestamp: Date.now(),
  };
};

export const loadFromCache = (): CachedData | null => {
  if (!memoryCache) return null;

  if (Date.now() - memoryCache.timestamp > CACHE_TTL) {
    memoryCache = null;
    return null;
  }
  
  return memoryCache;
};