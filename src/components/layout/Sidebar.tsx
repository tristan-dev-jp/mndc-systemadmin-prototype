"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/data/menu";
import type { MenuItem } from "@/data/menu";

// Define the props the Sidebar component will accept
interface SidebarProps {
  activeItem: string;
  setActiveItem: (id: string) => void;
}

export function Sidebar({ activeItem, setActiveItem }: SidebarProps) {
  return (
    <div className="w-70 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Moneydotcom</h1>
        <p className="text-sm text-gray-600 mt-1">システム管理</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <div className="space-y-1">
          {menuItems.map((item: MenuItem) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center px-3 py-3 text-sm rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                <Icon
                  className={`h-5 w-5 mr-3 ${
                    isActive ? "text-blue-700" : "text-gray-600"
                  }`}
                />
                {item.name}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="h-4 w-4 mr-3" />
          ログアウト
        </Button>
      </div>
    </div>
  );
}
