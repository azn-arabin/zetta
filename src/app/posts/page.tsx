"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Card from "@/components/Card";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { usePosts } from "@/hooks/useFetch";

export default function PostsPage() {
  const { data: posts, loading, error, refetch } = usePosts();

  if (loading) {
    return <Loading text="Loading posts..." />;
  }

  if (error) {
    return <Error message={error} onRetry={refetch} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Posts
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Browse through all available posts
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {posts?.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            <Link href={`/posts/${post.id}`}>
              <Card animate={false} className="h-full">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Post #{post.id}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      User {post.userId}
                    </span>
                  </div>
                  
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 capitalize">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {post.body}
                  </p>
                  
                  <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                    Read more
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {posts?.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No posts found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            There are no posts available at the moment.
          </p>
        </motion.div>
      )}
    </div>
  );
}