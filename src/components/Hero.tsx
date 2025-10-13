import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-8"
  >
    <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">Weekly Weather</h1>
    <p className="text-white/80 text-lg">Your weekly forecast, please search for a place</p>
  </motion.div>
);
