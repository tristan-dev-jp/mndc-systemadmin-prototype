"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { mockPaymentUrls, mockPaymentUrlDetails, mockSubscriptionPlans } from "@/data/finance";
import type { PaymentURL, PaymentUrlDetails, CustomField, SubscriptionPlan } from "@/lib/types";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Search,
  ArrowUpDown,
  Plus,
  ArrowUp,
  ArrowDown,
  Copy,
  Edit,
  Save,
  X,
} from "lucide-react";

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
// Payment URL Details Modal Component
// ============================================================================
interface PaymentUrlDetailsModalProps {
  urlId: string;
  isOpen: boolean;
  onClose: () => void;
}

const PaymentUrlDetailsModal: React.FC<PaymentUrlDetailsModalProps> = ({
  urlId,
  isOpen,
  onClose,
}) => {
  const { toast } = useToast();
  const details = mockPaymentUrlDetails; // Using static mock data

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "コピーしました",
      description: "URLがクリップボードにコピーされました。",
    });
  };

  const renderCustomField = (field: CustomField) => {
    return <p className="text-sm p-2 h-10 flex items-center bg-gray-100 rounded-md">{field.value || "-"}</p>;
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">決済URL詳細</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {details.basicInfo.urlName}
          </p>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto pr-6 pl-2 space-y-8 py-4">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">基本情報</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-2">
                <Label htmlFor="urlName">URL名</Label>
                <p className="text-sm p-2 h-10 flex items-center bg-gray-100 rounded-md">
                  {details.basicInfo.urlName}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="url"
                    value={details.basicInfo.url}
                    readOnly
                    className="bg-gray-100"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopyToClipboard(details.basicInfo.url)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">説明</Label>
                <p className="text-sm p-2 whitespace-pre-wrap min-h-[100px] bg-gray-100 rounded-md">
                  {details.basicInfo.description}
                </p>
              </div>
              <div className="space-y-2">
                <Label>ステータス</Label>
                <div className="flex items-center gap-2 pt-2">
                  <Switch
                    checked={details.basicInfo.status === "利用中"}
                    disabled={true}
                  />
                  <span
                    className={cn(
                      "font-medium",
                      details.basicInfo.status === "利用中"
                        ? "text-green-600"
                        : "text-gray-500"
                    )}
                  >
                    {details.basicInfo.status}
                  </span>
                </div>
              </div>
              <div /> {/* Spacer */}
              <div className="space-y-2">
                <Label>作成日</Label>
                <p className="text-sm p-2">
                  {new Date(details.basicInfo.createdDate).toLocaleDateString(
                    "ja-JP"
                  )}
                </p>
              </div>
              <div className="space-y-2">
                <Label>最終更新日</Label>
                <p className="text-sm p-2">
                  {new Date(details.basicInfo.lastUpdated).toLocaleDateString(
                    "ja-JP"
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Payment Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">決済設定</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-2">
                <Label>金額設定</Label>
                <p className="text-sm p-2">
                  {details.paymentSettings.amount.toLocaleString()}円
                </p>
              </div>
              <div className="space-y-2">
                <Label>決済方法</Label>
                <div className="flex gap-2 p-2">
                  {details.paymentSettings.paymentMethods.map((method) => (
                    <Badge key={method} variant="secondary">
                      {method}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Custom Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">カスタム項目</h3>
            <div className="space-y-4">
              {details.customFields.map((field) => (
                <div key={field.id} className="grid grid-cols-1 gap-x-8">
                  <div className="space-y-2">
                    <Label htmlFor={`custom-field-${field.id}`}>
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </Label>
                    {renderCustomField(field)}
                  </div>
                </div>
              ))}
              {details.customFields.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  カスタム項目はありません。
                </p>
              )}
            </div>
          </div>

          {/* Section 4: Usage Statistics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">利用統計</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-2">
                <Label>決済回数</Label>
                <p className="text-3xl font-bold p-2">
                  {details.usageStatistics.totalPaymentCount.toLocaleString()}
                </p>
              </div>
              <div className="space-y-2">
                <Label>最終決済発生日</Label>
                <p className="text-sm p-2">
                  {new Date(
                    details.usageStatistics.lastPaymentDate
                  ).toLocaleString("ja-JP")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-auto pt-4 border-t">
          <div className="flex justify-between w-full">
            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-yellow-600 border-yellow-500 hover:bg-yellow-50 hover:text-yellow-700"
                  >
                    URLを無効化
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      本当にこのURLを無効化しますか？
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      この操作は元に戻せます。URLは一時的に利用できなくなります。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-yellow-500 hover:bg-yellow-600"
                      onClick={() => {
                        toast({ title: "URLを無効化しました (デモ)" });
                      }}
                    >
                      無効化
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="ml-2">
                    削除
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      本当にこのURLを削除しますか？
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      この操作は元に戻すことができません。関連するすべてのデータが完全に削除されます。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => {
                        toast({
                          variant: "destructive",
                          title: "URLを削除しました (デモ)",
                        });
                        onClose();
                      }}
                    >
                      削除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={onClose}>
                キャンセル
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Edit className="h-4 w-4 mr-2" />
                編集
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ============================================================================
// Create Payment URL Modal Component
// ============================================================================
interface CreatePaymentUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePaymentUrlModal: React.FC<CreatePaymentUrlModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [details, setDetails] = useState(mockPaymentUrlDetails); // Using static mock data for structure

  const handleCreate = () => {
    console.log("Creating new URL with details:", details);
    toast({ title: "新規決済URLを発行しました (デモ)" });
    onClose();
  };

  const renderCustomField = (field: CustomField) => {
    const fieldId = `new-custom-field-${field.id}`;
    switch (field.type) {
      case "Email":
        return <Input id={fieldId} type="email" placeholder="email@example.com" />;
      case "Name":
        return <Input id={fieldId} type="text" placeholder="山田 太郎" />;
      case "Phone number":
        return <Input id={fieldId} type="tel" placeholder="090-1234-5678" />;
      case "Address":
        return <Textarea id={fieldId} placeholder="東京都千代田区..." rows={3} />;
      case "Notes":
        return <Textarea id={fieldId} placeholder="補足事項..." rows={3} />;
      case "Dropdown":
        return (
          <Select>
            <SelectTrigger id={fieldId}>
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return <Input type="text" readOnly value="Unknown field type" />;
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">新規決済URL発行</DialogTitle>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto pr-6 pl-2 space-y-8 py-4">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">基本情報</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-2">
                <Label htmlFor="newUrlName">URL名</Label>
                <Input id="newUrlName" placeholder="例：基本プラン初期費用" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newUrl">URL</Label>
                <div className="flex items-center gap-2">
                  <Input id="newUrl" value="https://moneydotcom.jp/link/creditcard/" readOnly className="bg-gray-100" />
                </div>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="newDescription">説明</Label>
                <Textarea id="newDescription" placeholder="この決済URLの目的や対象者などを記載します" rows={4} />
              </div>
              <div className="space-y-2">
                <Label>ステータス</Label>
                <div className="flex items-center gap-2 pt-2">
                  <Switch defaultChecked={true} />
                  <span className="font-medium text-green-600">利用中</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Payment Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">決済設定</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-2">
                <Label>金額設定</Label>
                <Input type="number" placeholder="例: 10000" />
              </div>
              <div className="space-y-2">
                <Label>決済方法</Label>
                <div className="flex gap-4 p-2">
                  <div className="flex items-center gap-2">
                     <Switch id="credit-card" defaultChecked={true} />
                     <Label htmlFor="credit-card">Credit card</Label>
                  </div>
                   <div className="flex items-center gap-2">
                     <Switch id="debit-card" defaultChecked={true} />
                     <Label htmlFor="debit-card">Debit card</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Custom Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">カスタム項目</h3>
            <p className="text-sm text-muted-foreground">最大3つまで設定できます。</p>
            <div className="space-y-4">
              {details.customFields.map((field) => (
                <div key={field.id} className="grid grid-cols-1 gap-x-8">
                  <div className="space-y-2">
                    <Label htmlFor={`new-custom-field-${field.id}`}>
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </Label>
                    {renderCustomField(field)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-auto pt-4 border-t">
          <div className="flex justify-end w-full gap-2">
            <Button variant="secondary" onClick={onClose}>
              キャンセル
            </Button>
            <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              発行
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


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
  const [selectedUrlId, setSelectedUrlId] = useState<string | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

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
        <Button onClick={() => setCreateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedUrlId(url.id)}
                  >
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

      {selectedUrlId && (
        <PaymentUrlDetailsModal
          isOpen={!!selectedUrlId}
          onClose={() => setSelectedUrlId(null)}
          urlId={selectedUrlId}
        />
      )}
      <CreatePaymentUrlModal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} />
    </div>
  );
};

// ============================================================================
// Subscription Management Tab Component
// ============================================================================
const SubscriptionManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("すべて");
  const [billingCycleFilter, setBillingCycleFilter] = useState("すべて");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SubscriptionPlan | null;
    direction: "asc" | "desc";
  }>({ key: "creationDate", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);

  const handleSort = (key: keyof SubscriptionPlan) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("すべて");
    setBillingCycleFilter("すべて");
  };

  const filteredAndSortedPlans = useMemo(() => {
    let filtered = mockSubscriptionPlans.filter((plan) => {
      const matchesSearch = plan.planName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "すべて" || plan.status === statusFilter;
      const matchesBillingCycle = billingCycleFilter === "すべて" || plan.billingCycle === billingCycleFilter;
      return matchesSearch && matchesStatus && matchesBillingCycle;
    });

    if (sortConfig.key) {
      const key = sortConfig.key;
      filtered.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];
        let comparison = 0;
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          if (key === 'creationDate') {
            comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
          } else {
            comparison = aValue.localeCompare(bValue);
          }
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        }
        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [searchTerm, statusFilter, billingCycleFilter, sortConfig]);

  const paginatedPlans = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedPlans.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedPlans, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedPlans.length / itemsPerPage);

  const renderSortIcon = (key: keyof SubscriptionPlan) => {
    if (sortConfig?.key !== key) {
      return <ArrowUpDown className="h-4 w-4 ml-1 text-muted-foreground" />;
    }
    return sortConfig.direction === "asc" ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">サブスクリプション管理</h2>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          新規プラン作成
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="プラン名で検索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label>ステータス</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="すべて">すべて</SelectItem>
              <SelectItem value="有効">有効</SelectItem>
              <SelectItem value="無効">無効</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label>請求形式</Label>
          <Select value={billingCycleFilter} onValueChange={setBillingCycleFilter}>
            <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="すべて">すべて</SelectItem>
              <SelectItem value="月間請求">月間請求</SelectItem>
              <SelectItem value="年間請求">年間請求</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          クリア
        </Button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>プラン名</TableHead>
              <TableHead><button className="flex items-center gap-1" onClick={() => handleSort('price')}>料金 {renderSortIcon('price')}</button></TableHead>
              <TableHead>請求形式</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead><button className="flex items-center gap-1" onClick={() => handleSort('subscriberCount')}>加入者数 {renderSortIcon('subscriberCount')}</button></TableHead>
              <TableHead><button className="flex items-center gap-1" onClick={() => handleSort('creationDate')}>作成日 {renderSortIcon('creationDate')}</button></TableHead>
              <TableHead>アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPlans.map((plan) => (
              <TableRow key={plan.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{plan.planName}</TableCell>
                <TableCell>{plan.price.toLocaleString()}円</TableCell>
                <TableCell>{plan.billingCycle}</TableCell>
                <TableCell>
                  <Badge className={cn(plan.status === "有効" ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-800 border-gray-200")}>
                    {plan.status}
                  </Badge>
                </TableCell>
                <TableCell>{plan.subscriberCount.toLocaleString()}</TableCell>
                <TableCell>{plan.creationDate}</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="sm">詳細</Button>
                  <Button variant="destructive" size="sm">削除</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label>表示件数</Label>
          <Select value={String(itemsPerPage)} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
            <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="60">60</SelectItem>
              <SelectItem value="90">90</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{currentPage} / {totalPages} ページ</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>前へ</Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>次へ</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FinanceManagementPage = () => {
  const [activeTab, setActiveTab] = useState<FinanceTab>("subscription");

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
        return <SubscriptionManagementTab />;
      case "payment_history":
        return <PlaceholderContent title="決済履歴" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Toaster />
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