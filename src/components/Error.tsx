"use client";

import { motion } from "framer-motion";

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export default function Error({ message, onRetry }: ErrorProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-4 p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-red-500 text-5xl">⚠️</div>
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 text-center">
        Something went wrong
      </h3>
      <p className="text-red-600 dark:text-red-300 text-center">{message}</p>
      {onRetry && (
        <motion.button
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
}