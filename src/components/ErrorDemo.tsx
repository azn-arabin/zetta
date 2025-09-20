"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Card from "@/components/Card";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useErrorDemo } from "@/hooks/useFetch";

export default function ErrorDemo() {
  const { data, loading, error, refetch } = useErrorDemo();
  const [showDemo, setShowDemo] = useState(false);

  const handleTriggerError = () => {
    setShowDemo(true);
    refetch();
  };

  const handleReset = () => {
    setShowDemo(false);
  };

  return (
    <Card className="mb-8">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          🧪 Error Handling Demonstration
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Click the button below to simulate various API error scenarios and see how the application handles them gracefully.
        </p>

        <div className="flex gap-4 mb-6">
          <motion.button
            onClick={handleTriggerError}
            disabled={loading}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-medium transition-colors"
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? "Triggering Error..." : "Trigger Random Error"}
          </motion.button>

          {showDemo && (
            <motion.button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset Demo
            </motion.button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {showDemo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {loading && <Loading text="Simulating API call..." size="sm" />}
              {error && (
                <Error 
                  message={error} 
                  onRetry={refetch}
                />
              )}
              {data !== null && (
                <motion.div
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="flex items-center">
                    <div className="text-green-500 text-2xl mr-3">✅</div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                        Success!
                      </h3>
                      <p className="text-green-600 dark:text-green-300">
                        API call completed successfully (this shouldn&apos;t happen in this demo!)
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p className="font-medium mb-2">This demo showcases:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Network error handling with retry functionality</li>
            <li>HTTP error status handling (404, 500, etc.)</li>
            <li>Loading states during API calls</li>
            <li>User-friendly error messages</li>
            <li>Smooth animations for state transitions</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}