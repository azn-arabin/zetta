"use client";

import { motion } from "framer-motion";

interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export default function Loading({ text = "Loading...", size = "md" }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-gray-300 border-t-blue-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <p className={`${textSizeClasses[size]} text-gray-600 dark:text-gray-400`}>
        {text}
      </p>
    </div>
  );
}