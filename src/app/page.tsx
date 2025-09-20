"use client";

import { motion } from "framer-motion";
import Card from "@/components/Card";
import ErrorDemo from "@/components/ErrorDemo";

export default function Home() {

  const stats = [
    { title: "Total Posts", value: "100", icon: "📝", color: "bg-blue-500" },
    { title: "Active Users", value: "10", icon: "👥", color: "bg-green-500" },
    { title: "Comments", value: "500", icon: "💬", color: "bg-purple-500" },
    { title: "Views", value: "1.2K", icon: "👁️", color: "bg-orange-500" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to <span className="text-blue-600">Zetta</span>Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          A modern dashboard built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <Card key={stat.title} delay={index * 0.1}>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-2xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Error Handling Demo */}
      <ErrorDemo />

      {/* Animated Chart Placeholder */}
      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Activity Overview
          </h2>
          <div className="flex items-end justify-between h-48 bg-gradient-to-t from-blue-50 to-transparent dark:from-blue-900/20 rounded-lg p-4">
            {[...Array(7)].map((_, index) => (
              <motion.div
                key={index}
                className="bg-blue-500 rounded-t-lg"
                style={{ width: "12%" }}
                initial={{ height: 0 }}
                animate={{ height: `${Math.random() * 80 + 20}%` }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card href="/posts">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 text-2xl">
                📝
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  View Posts
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Browse and manage all posts
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card href="/users">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-green-600 text-2xl">
                👥
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Manage Users
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  View user profiles and details
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
