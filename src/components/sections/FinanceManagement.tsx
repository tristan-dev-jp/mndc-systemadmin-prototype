"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { mockPaymentUrls } from "@/data/finance";
import type { PaymentURL } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Search, ArrowUpDown, Plus, ArrowUp, ArrowDown } from "lucide-react";

// Define the type for the tabs
type FinanceTab =
  | "dashboard"
  | "payment_url"
  | "subscription"
  | "payment_history";

// Placeholder component for content under development
const PlaceholderContent = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-400">{title}</h2>
      <p className="text-gray-500">この機能は現在開発中です。</p>
    </div>
  </div>
);

// ============================================================================
// Payment URL Management Tab Component
// ============================================================================
const PaymentUrlManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("すべて");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PaymentURL | null;
    direction: "asc" | "desc";
  }>({ key: "creationDate", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);

  const handleSort = (key: keyof PaymentURL) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedUrls = useMemo(() => {
    let filtered = mockPaymentUrls.filter((url) => {
      const matchesSearch = url.urlName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "すべて" || url.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    if (sortConfig.key) {
      const key = sortConfig.key;
      filtered.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        let comparison = 0;
        if (typeof aValue === "string" && typeof bValue === "string") {
          if (key === "creationDate" || key === "lastPaymentDate") {
            comparison =
              new Date(aValue).getTime() - new Date(bValue).getTime();
          } else {
            comparison = aValue.localeCompare(bValue);
          }
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          comparison = aValue - bValue;
        }

        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [searchTerm, statusFilter, sortConfig]);

  const paginatedUrls = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedUrls.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedUrls, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedUrls.length / itemsPerPage);

  const renderSortIcon = (key: keyof PaymentURL) => {
    if (sortConfig?.key !== key) {
      return <ArrowUpDown className="h-4 w-4 ml-1 text-muted-foreground" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">決済URL管理</h2>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          新規決済URL発行
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="URL名で検索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="status-filter" className="text-sm font-medium">
            ステータス
          </label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status-filter" className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="すべて">すべて</SelectItem>
              <SelectItem value="利用中">利用中</SelectItem>
              <SelectItem value="停止中">停止中</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL名</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort("creationDate")}
                >
                  作成日 {renderSortIcon("creationDate")}
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort("lastPaymentDate")}
                >
                  最終決済発生日 {renderSortIcon("lastPaymentDate")}
                </button>
              </TableHead>
              <TableHead className="text-right">決済回数</TableHead>
              <TableHead>アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUrls.map((url) => (
              <TableRow key={url.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{url.urlName}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="block max-w-xs truncate cursor-pointer">
                          {url.url}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{url.url}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      url.status === "利用中"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-gray-100 text-gray-800 border border-gray-200"
                    )}
                  >
                    {url.status}
                  </Badge>
                </TableCell>
                <TableCell>{url.creationDate}</TableCell>
                <TableCell>{url.lastPaymentDate}</TableCell>
                <TableCell className="text-right">
                  {url.paymentCount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    詳細
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor="items-per-page" className="text-sm font-medium">
            表示件数
          </label>
          <Select
            value={String(itemsPerPage)}
            onValueChange={(v) => {
              setItemsPerPage(Number(v));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger id="items-per-page" className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="60">60</SelectItem>
              <SelectItem value="90">90</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {currentPage} / {totalPages} ページ
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              前へ
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              次へ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FinanceManagementPage = () => {
  const [activeTab, setActiveTab] = useState<FinanceTab>("dashboard");

  const tabs = [
    { id: "dashboard", label: "ダッシュボード" },
    { id: "payment_url", label: "決済URL管理" },
    { id: "subscription", label: "サブスクリプション管理" },
    { id: "payment_history", label: "決済履歴" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <PlaceholderContent title="ダッシュボード" />;
      case "payment_url":
        return <PaymentUrlManagementTab />;
      case "subscription":
        return <PlaceholderContent title="サブスクリプション管理" />;
      case "payment_history":
        return <PlaceholderContent title="決済履歴" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">財務管理</h1>
        <p className="text-muted-foreground">
          決済、サブスクリプション、履歴を管理します。
        </p>
      </div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as FinanceTab)}
              className={cn(
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div>{renderTabContent()}</div>
    </div>
  );
};
