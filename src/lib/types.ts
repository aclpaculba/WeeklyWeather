export interface GeoLocation {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
  }
  
  export interface DailyForecast {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
    weathercode: number[];
  }
  
  export interface ForecastResponse {
    daily: DailyForecast;
    timezone: string;
  }
  
  export interface CachedData {
    location: GeoLocation;
    forecast: ForecastResponse;
    timestamp: number;
  }
  