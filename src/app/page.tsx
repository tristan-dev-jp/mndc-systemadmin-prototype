"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { HeaderBar } from "@/components/layout/HeaderBar";
import { UserManagementPage } from "@/components/sections/UserManagement";
import { FPManagementPage } from "@/components/sections/FPManagement";
import { menuItems } from "@/data/menu";
import type { MenuItem } from "@/data/menu";

// A simple component for placeholder pages
function PlaceholderContent({ item }: { item: MenuItem | undefined }) {
  if (!item) return null;
  const Icon = item.icon;

  return (
    <div className="flex items-center justify-center h-full min-h-96">
      <div className="text-center max-w-sm">
        <Icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h2>
        <p className="text-gray-600">{item.message}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeItem, setActiveItem] = useState("users");
  const currentItem = menuItems.find((item) => item.id === activeItem);

  const renderContent = () => {
    switch (activeItem) {
      case "users":
        return <UserManagementPage />;
      case "fp":
        return <FPManagementPage />;
      default:
        return <PlaceholderContent item={currentItem} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      <div className="flex-1 flex flex-col">
        <HeaderBar activeItem={activeItem} />
        <main className="flex-1 p-8 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
