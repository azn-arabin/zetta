"use client";

import Navigation from "@/components/Navigation";
import AnimatedSidebar from "@/components/AnimatedSidebar";
import { useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Navigation
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <AnimatedSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />
      <main className="pt-16 min-h-screen">
        {children}
      </main>
    </>
  );
}