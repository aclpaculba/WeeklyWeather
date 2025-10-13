import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonCard: React.FC<{ index: number }> = ({ index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl"
  >
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-white/20 rounded w-16 mx-auto" />
      <div className="h-3 bg-white/20 rounded w-20 mx-auto" />
      <div className="h-12 w-12 bg-white/20 rounded-full mx-auto" />
      <div className="h-8 bg-white/20 rounded w-24 mx-auto" />
      <div className="h-6 bg-white/20 rounded w-16 mx-auto" />
      <div className="space-y-2">
        <div className="h-3 bg-white/20 rounded" />
        <div className="h-3 bg-white/20 rounded" />
      </div>
    </div>
  </motion.div>
);
