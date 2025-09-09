"use client";

import { useState } from "react";
import {
  Plus,
  User,
  TrendingUp,
  Link as LinkIcon,
  ArrowLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
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
import {
  mockPartners,
  mockPartnerDetails,
  mockPartnerPerformance,
  mockPartnerLeadHistory,
} from "@/data/partners";
import type {
  Partner,
  PartnerDetails,
  PartnerPerformanceSummary,
  PartnerLeadHistory,
  PartnerUrlHistory,
} from "@/lib/types";

// ============================================================================
// New Partner Modal Component
// ============================================================================
interface NewPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPartner: (newPartner: Omit<Partner, "id" | "lastUpdated">) => void;
}

function NewPartnerModal({
  isOpen,
  onClose,
  onAddPartner,
}: NewPartnerModalProps) {
  const [partnerName, setPartnerName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [lpUrl, setLpUrl] = useState("");
  const [status, setStatus] = useState<"アクティブ" | "停止中">("アクティブ");
  const handleSubmit = () => {
    if (!partnerName || !contactEmail || !lpUrl) {
      // In a real app, you'd show a more user-friendly validation message.
      alert("すべてのフィールドを入力してください。");
      return;
    }
    onAddPartner({
      name: partnerName,
      contactEmail,
      lpUrl,
      status,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>新規パートナー登録</DialogTitle>
          <DialogDescription>
            新しいパートナーの情報を入力してください。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm">
              パートナー名
            </label>
            <Input
              id="name"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right text-sm">
              連絡先メール
            </label>
            <Input
              id="email"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="lpUrl" className="text-right text-sm">
              LPのURL
            </label>
            <Input
              id="lpUrl"
              value={lpUrl}
              onChange={(e) => setLpUrl(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="status" className="text-right text-sm">
              状況
            </label>
            <Select
              value={status}
              onValueChange={(value: "アクティブ" | "停止中") =>
                setStatus(value)
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="アクティブ">アクティブ</SelectItem>
                <SelectItem value="停止中">停止中</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit}>登録</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================================
// Performance Info Tab Component
// ============================================================================
interface PerformanceInfoTabProps {
  performance: PartnerPerformanceSummary;
  leadHistory: PartnerLeadHistory[];
}

function PerformanceInfoTab({
  performance,
  leadHistory,
}: PerformanceInfoTabProps) {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [isLeadDetailModalOpen, setIsLeadDetailModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<PartnerLeadHistory | null>(
    null
  );

  const handleShowLeadDetails = (lead: PartnerLeadHistory) => {
    setSelectedLead(lead);
    setIsLeadDetailModalOpen(true);
  };

  const getApprovalStatusBadge = (
    status: PartnerLeadHistory["approvalStatus"]
  ) => {
    switch (status) {
      case "承認済み":
        return "bg-green-100 text-green-800 border-green-200";
      case "拒否":
        return "bg-red-100 text-red-800 border-red-200";
      case "保留中":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* 実績サマリー */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">実績サマリー</h3>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024年</SelectItem>
                <SelectItem value="2023">2023年</SelectItem>
              </SelectContent>
            </Select>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-[80px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}月
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-600">総リード数</p>
            <p className="text-2xl font-bold text-blue-800">
              {performance.totalLeads}件
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-600">アカウント作成数</p>
            <p className="text-2xl font-bold text-green-800">
              {performance.accountsCreated}件
            </p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-600">自動拒否数</p>
            <p className="text-2xl font-bold text-yellow-800">
              {performance.autoRejected}件
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">手動拒否数</p>
            <p className="text-2xl font-bold text-red-800">
              {performance.manualRejected}件
            </p>
          </div>
        </div>
      </div>

      {/* リード履歴 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">リード履歴</h3>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>受信日時</TableHead>
                  <TableHead>ユーザーID</TableHead>
                  <TableHead>ユーザー名</TableHead>
                  <TableHead>年齢</TableHead>
                  <TableHead>都道府県</TableHead>
                  <TableHead>ご相談内容</TableHead>
                  <TableHead>許容ステータス</TableHead>
                  <TableHead>現在相談ステータス</TableHead>
                  <TableHead>アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leadHistory.map((lead) => (
                  <TableRow key={lead.userId}>
                    <TableCell>{lead.receivedDateTime}</TableCell>
                    <TableCell>{lead.userId}</TableCell>
                    <TableCell>{lead.userName}</TableCell>
                    <TableCell>{lead.age}</TableCell>
                    <TableCell>{lead.prefecture}</TableCell>
                    <TableCell>{lead.consultationContent}</TableCell>
                    <TableCell>
                      <Badge
                        className={getApprovalStatusBadge(lead.approvalStatus)}
                      >
                        {lead.approvalStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{lead.currentConsultationStatus}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShowLeadDetails(lead)}
                      >
                        詳細
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Lead Detail Modal */}
      <Dialog
        open={isLeadDetailModalOpen}
        onOpenChange={setIsLeadDetailModalOpen}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>リード詳細</DialogTitle>
            <DialogDescription>
              ユーザーID: {selectedLead?.userId} の詳細情報
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>詳細情報のプレースホルダーです。</p>
            {/* Here you would render the full details of the selected lead */}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsLeadDetailModalOpen(false)}
            >
              閉じる
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ============================================================================
// URL Management Tab Component
// ============================================================================
interface UrlManagementTabProps {
  activeUrl: string;
  urlHistory: PartnerUrlHistory[];
}

function UrlManagementTab({ activeUrl, urlHistory }: UrlManagementTabProps) {
  const handleStopUrl = () => {
    console.log("Stopping active URL:", activeUrl);
    alert(`URL停止: ${activeUrl}`);
  };

  const handleGenerateUrl = () => {
    console.log("Generating new URL...");
    alert("新規URLを発行しました。（コンソールログを確認）");
  };

  const getStatusBadgeColor = (status: "利用中" | "停止済み") => {
    return status === "利用中"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="space-y-8">
      {/* 利用中のURL */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">利用中のURL</h3>
        <div className="p-6 border rounded-lg bg-gray-50 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              現在のURL
            </label>
            <Input value={activeUrl} readOnly className="bg-white" />
          </div>
          <div className="flex gap-4">
            <Button onClick={handleStopUrl} variant="destructive">
              利用中のURL停止
            </Button>
            <Button
              onClick={handleGenerateUrl}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              新規URL発行
            </Button>
          </div>
        </div>
      </div>

      {/* URL履歴管理 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">URL履歴管理</h3>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>生成日</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>状況</TableHead>
                  <TableHead>リード取得数</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {urlHistory.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.generationDate}</TableCell>
                    <TableCell>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {item.url}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.leadsCount}件</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Basic Info Tab Component
// ============================================================================
interface BasicInfoTabProps {
  initialDetails: PartnerDetails;
}

function BasicInfoTab({ initialDetails }: BasicInfoTabProps) {
  const [formData, setFormData] = useState(initialDetails);

  const handleCompanyInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        [name]: value,
      },
    }));
  };

  const handleContractInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contractInfo: {
        ...prev.contractInfo,
        [name]: value,
      },
    }));
  };

  const handleStatusToggle = () => {
    setFormData((prev) => ({
      ...prev,
      usageStatus: {
        ...prev.usageStatus,
        accountStatus:
          prev.usageStatus.accountStatus === "アクティブ"
            ? "停止中"
            : "アクティブ",
      },
    }));
  };

  const getStatusBadgeColor = (status: "アクティブ" | "停止中") => {
    return status === "アクティブ"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="space-y-8">
      {/* 会社情報 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">会社情報</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-6 border rounded-lg bg-gray-50">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              パートナー名
            </label>
            <Input
              id="name"
              name="name"
              value={formData.companyInfo.name}
              onChange={handleCompanyInfoChange}
            />
          </div>
          <div>
            <label
              htmlFor="representativeName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              代表者名
            </label>
            <Input
              id="representativeName"
              name="representativeName"
              value={formData.companyInfo.representativeName}
              onChange={handleCompanyInfoChange}
            />
          </div>
          <div>
            <label
              htmlFor="contactEmail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              連絡先メール
            </label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={formData.companyInfo.contactEmail}
              onChange={handleCompanyInfoChange}
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              電話番号
            </label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.companyInfo.phoneNumber}
              onChange={handleCompanyInfoChange}
            />
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              会社住所
            </label>
            <Input
              id="address"
              name="address"
              value={formData.companyInfo.address}
              onChange={handleCompanyInfoChange}
            />
          </div>
          <div>
            <label
              htmlFor="contactPersonName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              担当者名
            </label>
            <Input
              id="contactPersonName"
              name="contactPersonName"
              value={formData.companyInfo.contactPersonName}
              onChange={handleCompanyInfoChange}
            />
          </div>
          <div>
            <label
              htmlFor="contactPersonDepartment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              担当者部署
            </label>
            <Input
              id="contactPersonDepartment"
              name="contactPersonDepartment"
              value={formData.companyInfo.contactPersonDepartment}
              onChange={handleCompanyInfoChange}
            />
          </div>
        </div>
      </div>

      {/* 契約情報 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">契約情報</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-6 border rounded-lg bg-gray-50">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              契約開始日
            </label>
            <Input
              id="startDate"
              name="startDate"
              value={formData.contractInfo.startDate}
              onChange={handleContractInfoChange}
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              契約終了日
            </label>
            <Input
              id="endDate"
              name="endDate"
              value={formData.contractInfo.endDate}
              onChange={handleContractInfoChange}
            />
          </div>
          <div>
            <label
              htmlFor="referralFee"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              紹介料率
            </label>
            <Input
              id="referralFee"
              name="referralFee"
              value={formData.contractInfo.referralFee}
              onChange={handleContractInfoChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              契約ステータス
            </label>
            <div className="mt-2">
              <Badge
                variant="outline"
                className={
                  formData.contractInfo.status === "有効"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-gray-100 text-gray-800 border-gray-200"
                }
              >
                {formData.contractInfo.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* 利用状況 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">利用状況</h3>
        <div className="p-6 border rounded-lg bg-gray-50 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800">アカウント状況</p>
            <Badge
              className={getStatusBadgeColor(
                formData.usageStatus.accountStatus
              )}
            >
              {formData.usageStatus.accountStatus}
            </Badge>
          </div>
          <Button
            onClick={handleStatusToggle}
            variant={
              formData.usageStatus.accountStatus === "アクティブ"
                ? "destructive"
                : "default"
            }
            className={
              formData.usageStatus.accountStatus === "アクティブ"
                ? ""
                : "bg-green-600 hover:bg-green-700"
            }
          >
            {formData.usageStatus.accountStatus === "アクティブ"
              ? "パートナーを停止"
              : "パートナーを再開"}
          </Button>
        </div>
      </div>

      {/* 保存ボタン */}
      <div className="flex justify-end pt-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          基本情報を保存
        </Button>
      </div>
    </div>
  );
}

// ============================================================================
// Partner Details Page Component
// ============================================================================
interface PartnerDetailsPageProps {
  partnerId: string;
  onBack: () => void;
}

function PartnerDetailsPage({ partnerId, onBack }: PartnerDetailsPageProps) {
  const [activeTab, setActiveTab] = useState("basic");

  // Find the partner from the mock data. In a real app, you'd fetch this.
  const partner = mockPartners.find((p) => p.id === partnerId);

  if (!partner) {
    return (
      <div>
        <p>Partner not found.</p>
        <Button onClick={onBack}>Back to List</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>パートナー管理</span>
          <ChevronRight className="h-4 w-4" />
          <span>パートナー詳細</span>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            パートナー詳細: {partner.name}
          </h2>
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-gray-600 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            パートナー一覧に戻る
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("basic")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                activeTab === "basic"
                  ? "border-blue-600 text-blue-700 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <User className="h-4 w-4" />
              基本情報
            </button>
            <button
              onClick={() => setActiveTab("performance")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                activeTab === "performance"
                  ? "border-blue-600 text-blue-700 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              パフォーマンス情報
            </button>
            <button
              onClick={() => setActiveTab("url")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                activeTab === "url"
                  ? "border-blue-600 text-blue-700 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <LinkIcon className="h-4 w-4" />
              URL管理
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "basic" && (
            <BasicInfoTab initialDetails={mockPartnerDetails} />
          )}
          {activeTab === "performance" && (
            <PerformanceInfoTab
              performance={mockPartnerPerformance}
              leadHistory={mockPartnerLeadHistory}
            />
          )}
          {activeTab === "url" && (
            <UrlManagementTab
              activeUrl={mockPartnerDetails.activeUrl}
              urlHistory={mockPartnerDetails.urlHistory}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Partner List Page Component
// ============================================================================
export function PartnerManagementPage() {
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(
    null
  );

  const handleAddPartner = (
    newPartnerData: Omit<Partner, "id" | "lastUpdated">
  ) => {
    const newPartner: Partner = {
      ...newPartnerData,
      id: `PART${String(partners.length + 1).padStart(3, "0")}`,
      lastUpdated: new Date().toLocaleDateString("ja-JP"),
    };
    setPartners((prevPartners) => [newPartner, ...prevPartners]);
    console.log("New Partner Added:", newPartner);
  };

  const getStatusBadgeColor = (status: "アクティブ" | "停止中") => {
    return status === "アクティブ"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  if (selectedPartnerId) {
    return (
      <PartnerDetailsPage
        partnerId={selectedPartnerId}
        onBack={() => setSelectedPartnerId(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">パートナー一覧</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          新規パートナー
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>パートナー名</TableHead>
                <TableHead>連絡先メール</TableHead>
                <TableHead>問い合わせLPのURL</TableHead>
                <TableHead>状況</TableHead>
                <TableHead>最終更新日</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => (
                <TableRow
                  key={partner.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedPartnerId(partner.id)}
                >
                  <TableCell className="font-medium text-blue-600 hover:underline whitespace-nowrap">
                    {partner.name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {partner.contactEmail}
                  </TableCell>
                  <TableCell>
                    <a
                      href={partner.lpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {partner.lpUrl}
                    </a>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge className={getStatusBadgeColor(partner.status)}>
                      {partner.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {partner.lastUpdated}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Render the modal */}
      <NewPartnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPartner={handleAddPartner}
      />
    </div>
  );
}
