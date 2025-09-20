"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Modal from "@/components/Modal";
import { useUsers } from "@/hooks/useFetch";
import { User } from "@/types";

export default function UsersPage() {
  const { data: users, loading, error, refetch } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  if (loading) {
    return <Loading text="Loading users..." />;
  }

  if (error) {
    return <Error message={error} onRetry={refetch} />;
  }

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Users
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Click on any user row to view detailed information
        </p>
      </motion.div>

      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Website
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {users?.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => handleRowClick(user)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            @{user.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.company.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400">
                      {user.website}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          <AnimatePresence>
            {users?.map((user, index) => (
              <motion.div
                key={user.id}
                className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleRowClick(user)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      @{user.username}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Company:</span> {user.company.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* User Detail Modal */}
      <Modal
        isOpen={!!selectedUser}
        onClose={handleCloseModal}
        title={selectedUser?.name}
      >
        {selectedUser && (
          <div className="space-y-6">
            {/* Avatar and Basic Info */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-medium mx-auto mb-4">
                {selectedUser.name.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedUser.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                @{selectedUser.username}
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Contact Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 text-gray-400">📧</div>
                  <span className="text-gray-600 dark:text-gray-300">{selectedUser.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 text-gray-400">📱</div>
                  <span className="text-gray-600 dark:text-gray-300">{selectedUser.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 text-gray-400">🌐</div>
                  <span className="text-blue-600 dark:text-blue-400">{selectedUser.website}</span>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Address
              </h4>
              <div className="text-gray-600 dark:text-gray-300">
                <p>{selectedUser.address.suite} {selectedUser.address.street}</p>
                <p>{selectedUser.address.city}, {selectedUser.address.zipcode}</p>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Company
              </h4>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 dark:text-white">
                  {selectedUser.company.name}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {selectedUser.company.catchPhrase}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {selectedUser.company.bs}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}