"use client";

import { menuItems } from "@/data/menu";

interface HeaderBarProps {
  activeItem: string;
}

export function HeaderBar({ activeItem }: HeaderBarProps) {
  const currentItem = menuItems.find((item) => item.id === activeItem);

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <h1 className="text-xl font-semibold text-gray-900">
        {currentItem?.name}
      </h1>
    </header>
  );
}
