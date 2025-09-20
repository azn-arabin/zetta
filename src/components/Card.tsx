"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  delay?: number;
  animate?: boolean;
}

export default function Card({
  children,
  className = "",
  href,
  onClick,
  delay = 0,
  animate = true,
}: CardProps) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: [0.4, 0.0, 0.2, 1] as const,
      },
    },
    hover: {
      y: -4,
      transition: {
        duration: 0.2,
        ease: [0.4, 0.0, 0.2, 1] as const,
      },
    },
  };

  const baseClasses = `
    bg-white dark:bg-gray-800 
    rounded-lg 
    shadow-md hover:shadow-lg 
    border border-gray-200 dark:border-gray-700 
    transition-all duration-300 
    cursor-pointer
    ${className}
  `;

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        variants={animate ? cardVariants : undefined}
        initial={animate ? "hidden" : undefined}
        animate={animate ? "visible" : undefined}
        whileHover={animate ? "hover" : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div
      className={baseClasses}
      onClick={onClick}
      variants={animate ? cardVariants : undefined}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
      whileHover={animate ? "hover" : undefined}
    >
      {children}
    </motion.div>
  );
}