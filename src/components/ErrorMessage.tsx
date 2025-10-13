import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorMessage: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="max-w-md mx-auto bg-red-500/20 backdrop-blur-md border border-red-300/30 rounded-2xl p-6 text-center"
  >
    <AlertCircle className="w-12 h-12 text-red-300 mx-auto mb-4" />
    <p className="text-white text-lg mb-4">{message}</p>
    <button
      onClick={onRetry}
      className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl text-white font-medium transition-colors"
    >
      <RefreshCw className="w-4 h-4" />
      Try Again
    </button>
  </motion.div>
);
