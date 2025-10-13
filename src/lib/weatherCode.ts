export const weatherCodeMap: Record<number, { label: string; icon: string }> = {
    0: { label: 'Clear sky', icon: 'sun' },
    1: { label: 'Mainly clear', icon: 'sun' },
    2: { label: 'Partly cloudy', icon: 'cloud' },
    3: { label: 'Overcast', icon: 'cloud' },
    45: { label: 'Foggy', icon: 'cloud' },
    48: { label: 'Fog', icon: 'cloud' },
    51: { label: 'Light drizzle', icon: 'drizzle' },
    53: { label: 'Drizzle', icon: 'drizzle' },
    55: { label: 'Heavy drizzle', icon: 'drizzle' },
    61: { label: 'Light rain', icon: 'rain' },
    63: { label: 'Rain', icon: 'rain' },
    65: { label: 'Heavy rain', icon: 'rain' },
    71: { label: 'Light snow', icon: 'snow' },
    73: { label: 'Snow', icon: 'snow' },
    75: { label: 'Heavy snow', icon: 'snow' },
    77: { label: 'Snow grains', icon: 'snow' },
    80: { label: 'Light showers', icon: 'rain' },
    81: { label: 'Showers', icon: 'rain' },
    82: { label: 'Heavy showers', icon: 'rain' },
    85: { label: 'Light snow showers', icon: 'snow' },
    86: { label: 'Snow showers', icon: 'snow' },
    95: { label: 'Thunderstorm', icon: 'storm' },
    96: { label: 'Thunderstorm with hail', icon: 'storm' },
    99: { label: 'Severe thunderstorm', icon: 'storm' },
  };
  
  export const getWeatherInfo = (code: number) =>
    weatherCodeMap[code] || { label: 'Unknown', icon: 'cloud' };
  