import { ForecastResponse, GeoLocation } from '../lib/types';

export const searchLocations = async (query: string): Promise<GeoLocation[]> => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results || [];
};

export const fetchForecast = async (lat: number, lon: number): Promise<ForecastResponse> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weathercode&timezone=auto`;
  const response = await fetch(url);
  return response.json();
};