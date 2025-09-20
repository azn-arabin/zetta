"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AnimatedSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnimatedSidebar({ isOpen, onClose }: AnimatedSidebarProps) {
  const pathname = usePathname();

  const sidebarVariants: Variants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const menuItems = [
    { href: "/", label: "Dashboard", icon: "🏠", description: "Overview & Stats" },
    { href: "/posts", label: "Posts", icon: "📝", description: "Manage Posts" },
    { href: "/users", label: "Users", icon: "👥", description: "User Management" },
  ];

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className="fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <motion.h2
              className="text-2xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
              transition={{ delay: 0.2 }}
            >
              Navigation
            </motion.h2>
            <motion.button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : -20
                }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block p-4 rounded-lg transition-all duration-200 group ${
                    pathname === item.href
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  {pathname === item.href && (
                    <motion.div
                      className="mt-2 h-1 bg-blue-600 rounded"
                      layoutId="sidebar-indicator"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Footer */}
          <motion.div
            className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : 20
            }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p className="font-medium mb-1">Zetta Dashboard</p>
              <p>Built with Next.js 15</p>
              <p>& Framer Motion</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}