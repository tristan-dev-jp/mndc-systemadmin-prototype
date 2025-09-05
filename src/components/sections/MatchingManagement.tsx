"use client";

import { useState, useMemo } from "react";
import {
  FileCheck,
  History,
  Users,
  Search,
  ChevronRight,
  ArrowUpDown,
  Info,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { mockMatchingAllocations } from "@/data/matching";
import { mockFPContract, mockFPDetails } from "@/data/fp";
import type { MatchingAllocation } from "@/lib/types";

// ============================================================================
// Details Modal Component
// ============================================================================
function AllocationDetailsModal({
  allocation,
}: {
  allocation: MatchingAllocation;
}) {
  // In a real app, you'd fetch these based on allocation.fpId
  const fpContract = mockFPContract;
  const fpDetails = mockFPDetails;

  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle className="text-xl">
          割当詳細: {allocation.fpName}
        </DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {/* Allocation Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">割当情報</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">FP名:</span>
              <span className="font-medium">{allocation.fpName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">割当種別:</span>
              <span>{allocation.allocationType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">予定割当件数:</span>
              <span>
                {allocation.completedAllocations}/{allocation.totalAllocations}
                件
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">ステータス:</span>
              <Badge
                className={
                  allocation.status === "完了"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }
              >
                {allocation.status}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">割当完了日:</span>
              <span>{allocation.completionDate}</span>
            </div>
          </div>
        </div>

        {/* FP Contract Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">FP契約情報</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">契約プラン:</span>
              <span className="font-medium">{fpContract.planName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">月額料金:</span>
              <span>¥{fpContract.monthlyFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">契約期間:</span>
              <span>
                {fpContract.contractStart} ~ {fpContract.contractEnd}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">契約状態:</span>
              <Badge className="bg-green-100 text-green-800">
                {fpContract.contractStatus}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">FPランク:</span>
              <Badge className="bg-blue-100 text-blue-800">
                ランク{fpContract.fpRank}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

// ============================================================================
// Current Month Allocation Status Component (Sub-menu 1)
// ============================================================================
function CurrentMonthAllocationStatus() {
  const [allocations, setAllocations] = useState<MatchingAllocation[]>(
    mockMatchingAllocations
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [fpTypeFilter, setFpTypeFilter] = useState("全て");
  const [allocationTypeFilter, setAllocationTypeFilter] = useState("全て");
  const [showInProgressOnly, setShowInProgressOnly] = useState(false);
  const [completionDateRange, setCompletionDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });

  const clearFilters = () => {
    setSearchTerm("");
    setFpTypeFilter("全て");
    setAllocationTypeFilter("全て");
    setShowInProgressOnly(false);
    setCompletionDateRange({ start: null, end: null });
  };

  // Mock function to handle date range changes
  const handleDateRangeChange = (
    dates: { start: Date | null; end: Date | null } | undefined
  ) => {
    setCompletionDateRange({
      start: dates?.start || null,
      end: dates?.end || null,
    });
  };

  const filteredAllocations = useMemo(() => {
    let filtered = allocations.filter(
      (alloc) =>
        alloc.fpName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alloc.fpEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alloc.fpCompany.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (fpTypeFilter !== "全て") {
      filtered = filtered.filter((alloc) => alloc.fpType === fpTypeFilter);
    }

    if (allocationTypeFilter !== "全て") {
      filtered = filtered.filter(
        (alloc) => alloc.allocationType === allocationTypeFilter
      );
    }

    if (showInProgressOnly) {
      filtered = filtered.filter((alloc) => alloc.status !== "完了");
    }

    if (completionDateRange.start && completionDateRange.end) {
      filtered = filtered.filter((alloc) => {
        if (!alloc.completionDate) return false;
        const completionDate = new Date(alloc.completionDate);
        return (
          completionDate >= completionDateRange.start! &&
          completionDate <= completionDateRange.end!
        );
      });
    }

    return filtered;
  }, [
    allocations,
    searchTerm,
    fpTypeFilter,
    allocationTypeFilter,
    showInProgressOnly,
    completionDateRange,
  ]);

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* FP種類 Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                FP種類:
              </label>
              <select
                value={fpTypeFilter}
                onChange={(e) => setFpTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="全て">全て</option>
                <option value="個人">個人FP</option>
                <option value="法人">法人FP</option>
              </select>
            </div>

            {/* 割当種別 Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                割当種別:
              </label>
              <select
                value={allocationTypeFilter}
                onChange={(e) => setAllocationTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="全て">全て</option>
                <option value="基本割当">基本配信</option>
                <option value="追加配信依頼">追加配信依頼</option>
              </select>
            </div>

            {/* 進行中 Filter */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="inProgressOnly"
                checked={showInProgressOnly}
                onChange={(e) => setShowInProgressOnly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="inProgressOnly" className="text-sm text-gray-700">
                進行中の割当ステータスのみ
              </label>
            </div>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex items-center gap-2 bg-transparent"
            >
              <X className="h-4 w-4" />
              条件をクリア
            </Button>
          </div>

          {/* Search Bar */}

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="FP名/メールアドレス/所属会社で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FP名
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  メールアドレス
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  所属会社
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FP種類
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  割当種別
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  割当件数
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  割当ステータス
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  割当完了日
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAllocations.map((allocation) => (
                <tr key={allocation.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {allocation.fpName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {allocation.fpEmail}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {allocation.fpCompany}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <Badge
                      className={
                        allocation.fpType === "個人"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }
                    >
                      {allocation.fpType}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {allocation.allocationType}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {allocation.completedAllocations}/
                    {allocation.totalAllocations} 件
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Badge
                      className={
                        allocation.status === "完了"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {allocation.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {allocation.completionDate}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          詳細
                        </Button>
                      </DialogTrigger>
                      <AllocationDetailsModal allocation={allocation} />
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAllocations.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FileCheck className="mx-auto h-10 w-10 mb-2" />
              該当する割当情報がありません。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Placeholder for other sub-menus
// ============================================================================
function PlaceholderComponent({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-full min-h-96 bg-white rounded-lg border">
      <div className="text-center">
        <Info className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">この機能は現在準備中です。</p>
      </div>
    </div>
  );
}

// ============================================================================
// Main Exported Component
// ============================================================================
export function MatchingManagementPage() {
  const [activeTab, setActiveTab] = useState("currentStatus");

  const subMenus = [
    { id: "currentStatus", name: "今月の割当状況", icon: FileCheck },
    { id: "fpAllocation", name: "各FPエンティティーの予定割当数", icon: Users },
    { id: "history", name: "マッチング・割当履歴", icon: History },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "currentStatus":
        return <CurrentMonthAllocationStatus />;
      case "fpAllocation":
        return <PlaceholderComponent title="各FPエンティティーの予定割当数" />;
      case "history":
        return <PlaceholderComponent title="マッチング・割当履歴" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-menu Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {subMenus.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Page Content */}
      <div>{renderContent()}</div>
    </div>
  );
}
