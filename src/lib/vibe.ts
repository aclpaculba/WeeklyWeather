export const getVibeClasses = (weatherCode: number): string => {
    const code = weatherCode || 0;
    if (code === 0 || code === 1) return 'from-blue-400 via-cyan-300 to-yellow-200';
    if (code === 2 || code === 3 || code === 45 || code === 48) return 'from-gray-400 via-gray-300 to-blue-200';
    if (code >= 51 && code <= 65) return 'from-slate-600 via-blue-400 to-cyan-300';
    if (code >= 71 && code <= 86) return 'from-blue-300 via-indigo-200 to-purple-100';
    if (code >= 95) return 'from-slate-700 via-purple-600 to-indigo-500';
    return 'from-blue-400 via-purple-300 to-pink-300';
  };
  
  export const getAccentColor = (weatherCode: number): string => {
    const code = weatherCode || 0;
    if (code === 0 || code === 1) return 'text-yellow-400';
    if (code === 2 || code === 3) return 'text-gray-300';
    if (code >= 51 && code <= 65) return 'text-blue-400';
    if (code >= 71 && code <= 86) return 'text-purple-300';
    if (code >= 95) return 'text-purple-400';
    return 'text-pink-300';
  };
  