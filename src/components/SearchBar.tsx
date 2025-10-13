import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { GeoLocation } from '../lib/types';
import { searchLocations } from '../api/openMeteo';

export const SearchBar: React.FC<{
  onLocationSelect: (location: GeoLocation) => void;
  isLoading: boolean;
}> = ({ onLocationSelect, isLoading }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const locations = await searchLocations(q);
      setResults(locations);
      setIsOpen(true);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (query.trim()) {
      timeoutRef.current = window.setTimeout(() => search(query), 300);
    } else {
      setResults([]);
      setIsOpen(false);
    }
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [query, search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isOpen && results.length > 0) {
        const indexToSelect = selectedIndex >= 0 ? selectedIndex : 0;
        handleSelect(results[indexToSelect]);
      } else if (query.trim()) {
        search(query);
      }
      return;
    }
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (location: GeoLocation) => {
    onLocationSelect(location);
    setQuery(`${location.name}, ${location.country}`);
    setIsOpen(false);
    setResults([]);
    inputRef.current?.blur();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-12">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a city..."
          disabled={isLoading}
          aria-label="Search for a city"
          aria-expanded={isOpen}
          aria-controls="search-results"
          className="w-full pl-12 pr-12 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all disabled:opacity-50"
        />
        {isSearching && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 animate-spin" />
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            id="search-results"
            role="listbox"
            className="absolute top-full mt-2 w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden shadow-2xl z-50"
          >
            {results.map((location, index) => (
              <button
                key={location.id}
                role="option"
                aria-selected={selectedIndex === index}
                onClick={() => handleSelect(location)}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/30 transition-colors ${
                  selectedIndex === index ? 'bg-white/30' : ''
                }`}
              >
                <MapPin className="w-4 h-4 text-white/80 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{location.name}</div>
                  <div className="text-white/70 text-sm truncate">
                    {[location.admin1, location.country].filter(Boolean).join(', ')}
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};