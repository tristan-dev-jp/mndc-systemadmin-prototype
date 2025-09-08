"use client";

import { useState, useMemo } from "react";
import {
  Users,
  User,
  UserX,
  CreditCard,
  Search,
  ChevronRight,
  ArrowLeft,
  Mail,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  Plus,
  TrendingUp,
  Star,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  mockFPs,
  mockFPDetails,
  mockFPPerformance,
  mockFPCustomers,
  mockFPContract,
  mockFPPayments,
  mockPaymentMethods,
  fpSummaryStats,
} from "@/data/fp";
import type {
  FP,
  FPCustomer,
  FPDetails as FPDetailsType,
  FPPerformance,
  FPContract,
  FPPayment,
  PaymentMethod,
} from "@/lib/types";

// ============================================================================
// New FP Registration Modal Component
// ============================================================================

type NewFPFormData = {
  fpType: "個人" | "法人";
  name: string;
  furigana: string;
  email: string;
  password: string;
  companyName: string;
  position: string;
  role: "管理者" | "スタッフ";
  workAddress: string;
  initialRank: string;
  monthlyAllocationLimit: string;
  accountStatus: "活動中" | "停止中";
};

interface NewFPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewFPFormData) => void;
}

function NewFPModal({ isOpen, onClose, onSubmit }: NewFPModalProps) {
  const initialFormData: NewFPFormData = {
    fpType: "法人",
    name: "",
    furigana: "",
    email: "",
    password: "",
    companyName: "",
    position: "",
    role: "スタッフ",
    workAddress: "",
    initialRank: "3",
    monthlyAllocationLimit: "10",
    accountStatus: "活動中",
  };

  const [formData, setFormData] = useState<NewFPFormData>(initialFormData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof NewFPFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value as any }));
  };

  const handleSubmit = () => {
    // Form submission logic will be fully implemented in Step 4
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>新規FPアカウント登録</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
          {/* Section 1: Account Type */}
          <div className="space-y-2">
            <h4 className="font-semibold">アカウント種別</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="fpType" className="text-sm font-medium">
                  FP種類 *
                </label>
                <Select
                  value={formData.fpType}
                  onValueChange={(value) => handleSelectChange("fpType", value)}
                >
                  <SelectTrigger id="fpType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="法人">法人</SelectItem>
                    <SelectItem value="個人">個人</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Section 2: Basic & Login Information */}
          <div className="space-y-2">
            <h4 className="font-semibold">基本・ログイン情報</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  氏名 *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="furigana" className="text-sm font-medium">
                  フリガナ *
                </label>
                <Input
                  id="furigana"
                  name="furigana"
                  value={formData.furigana}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  メールアドレス *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium">
                  初期パスワード *
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Affiliation Information */}
          <div className="space-y-2">
            <h4 className="font-semibold">所属情報</h4>
            {formData.fpType === "法人" ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companyName" className="text-sm font-medium">
                    所属会社名
                  </label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="position" className="text-sm font-medium">
                    役職
                  </label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="role" className="text-sm font-medium">
                    権限 *
                  </label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleSelectChange("role", value)}
                  >
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="管理者">管理者</SelectItem>
                      <SelectItem value="スタッフ">スタッフ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="workAddress" className="text-sm font-medium">
                  勤務地住所
                </label>
                <Input
                  id="workAddress"
                  name="workAddress"
                  value={formData.workAddress}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          {/* Section 4: System Settings */}
          <div className="space-y-2">
            <h4 className="font-semibold">システム設定</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="initialRank" className="text-sm font-medium">
                  初期ランク *
                </label>
                <Select
                  value={formData.initialRank}
                  onValueChange={(value) =>
                    handleSelectChange("initialRank", value)
                  }
                >
                  <SelectTrigger id="initialRank">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((rank) => (
                      <SelectItem key={rank} value={String(rank)}>
                        {rank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="monthlyAllocationLimit"
                  className="text-sm font-medium"
                >
                  今月の割当上限 *
                </label>
                <Input
                  id="monthlyAllocationLimit"
                  name="monthlyAllocationLimit"
                  type="number"
                  value={formData.monthlyAllocationLimit}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="accountStatus" className="text-sm font-medium">
                  アカウントステータス *
                </label>
                <Select
                  value={formData.accountStatus}
                  onValueChange={(value) =>
                    handleSelectChange("accountStatus", value)
                  }
                >
                  <SelectTrigger id="accountStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="活動中">活動中</SelectItem>
                    <SelectItem value="停止中">停止中</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            登録
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================================
// FP Details View Component
// ============================================================================
function FPDetails({ fpId, onBack }: { fpId: string; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("8");
  const [selectedCustomer, setSelectedCustomer] = useState<FPCustomer | null>(
    null
  );
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  // In a real app, you would fetch this data based on fpId
  const fpDetailsData: FPDetailsType = mockFPDetails;
  const fpPerformanceData: FPPerformance = mockFPPerformance;
  const fpCustomersData: FPCustomer[] = mockFPCustomers;
  const fpContractData: FPContract = mockFPContract;
  const fpPaymentsData: FPPayment[] = mockFPPayments;
  const paymentMethodsData: PaymentMethod[] = mockPaymentMethods;

  const [formData, setFormData] = useState({
    name: fpDetailsData.name,
    nameKana: fpDetailsData.nameKana,
    birthDate: fpDetailsData.birthDate,
    gender: fpDetailsData.gender,
    email: fpDetailsData.email,
    phone: fpDetailsData.phone,
    company: fpDetailsData.company,
    position: fpDetailsData.position,
    workAddress: fpDetailsData.workAddress,
    industryExperience: fpDetailsData.industryExperience,
    annualConsultations: fpDetailsData.annualConsultations,
    contractCounts: fpDetailsData.contractCounts,
    awards: fpDetailsData.awards,
  });

  const getStatusBadgeColor = (status: string) => {
    const colors: { [key: string]: string } = {
      新規: "bg-gray-100 text-gray-800",
      連絡済み: "bg-blue-100 text-blue-800",
      日程調整: "bg-yellow-100 text-yellow-800",
      面談実施: "bg-purple-100 text-purple-800",
      商品提案: "bg-orange-100 text-orange-800",
      契約: "bg-green-100 text-green-800",
      保留: "bg-yellow-100 text-yellow-800",
      失注: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const handleCustomerClick = (customer: FPCustomer) => {
    setSelectedCustomer(customer);
    setIsCustomerModalOpen(true);
  };

  const handleSave = () => {
    console.log("Saving FP data:", formData);
  };

  // Calculate performance metrics
  const connectionSuccessRate = (
    (fpPerformanceData.phoneConnections / fpPerformanceData.actualDeliveries) *
    100
  ).toFixed(1);
  const scheduleRate = (
    (fpPerformanceData.scheduleAdjustments /
      fpPerformanceData.phoneConnections) *
    100
  ).toFixed(1);
  const meetingConversionRate = (
    (fpPerformanceData.meetingsHeld / fpPerformanceData.scheduleAdjustments) *
    100
  ).toFixed(1);
  const proposalRate = (
    (fpPerformanceData.proposalsSent / fpPerformanceData.meetingsHeld) *
    100
  ).toFixed(1);
  const contractRate = (
    (fpPerformanceData.contractsSigned / fpPerformanceData.proposalsSent) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center text-sm text-gray-600">
          <span>FP管理</span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span>FP個人詳細</span>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            FP個人詳細: {fpDetailsData.name}
          </h2>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={onBack}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Mail className="h-4 w-4 mr-2" />
              メール送信
            </Button>
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              <UserX className="h-4 w-4 mr-2" />
              アカウント停止
            </Button>
          </div>
        </div>

        {/* FP Summary Card */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold">
                  {fpDetailsData.name} ({fpDetailsData.nameKana})
                </h3>
                <Badge className="bg-blue-100 text-blue-800">
                  {fpDetailsData.fpType}
                </Badge>
                <Badge className="bg-green-100 text-green-800">
                  {fpDetailsData.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                最終ログイン: {fpDetailsData.lastLogin}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "basic", name: "基本情報", icon: User },
            {
              id: "performance",
              name: "パフォーマンス情報",
              icon: TrendingUp,
              badge: "85.0%",
            },
            { id: "customers", name: "顧客管理", icon: Users, badge: "3" },
            { id: "contract", name: "契約／支払い管理", icon: CreditCard },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
              {tab.badge && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {tab.badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border p-6">
        {activeTab === "basic" && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">個人情報</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    氏名（漢字）
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    氏名（フリガナ）
                  </label>
                  <Input
                    value={formData.nameKana}
                    onChange={(e) =>
                      setFormData({ ...formData, nameKana: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    生年月日
                  </label>
                  <Input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) =>
                      setFormData({ ...formData, birthDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    性別
                  </label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="男性">男性</SelectItem>
                      <SelectItem value="女性">女性</SelectItem>
                      <SelectItem value="その他">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    メールアドレス
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    携帯番号
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    所属会社名
                  </label>
                  <Input
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    役職
                  </label>
                  <Input
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    勤務地住所
                  </label>
                  <Textarea
                    value={formData.workAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, workAddress: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    業界経験年数
                  </label>
                  <Input
                    value={formData.industryExperience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        industryExperience: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    年間相談件数
                  </label>
                  <Input
                    value={formData.annualConsultations}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        annualConsultations: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    契約件数
                  </label>
                  <Textarea
                    value={formData.contractCounts}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contractCounts: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    受賞歴
                  </label>
                  <Textarea
                    value={formData.awards}
                    onChange={(e) =>
                      setFormData({ ...formData, awards: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    マネストURL
                  </label>
                  <Input
                    value={fpDetailsData.moneyStoryUrl}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">資格・専門性</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    保有資格
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "FP1級技能士",
                      "FP2級技能士",
                      "証券外務員一種",
                      "証券外務員二種",
                      "宅建士",
                      "その他",
                    ].map((qual) => (
                      <label key={qual} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          defaultChecked={fpDetailsData.qualifications.includes(
                            qual
                          )}
                        />
                        {qual}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    得意分野（1位〜5位）
                  </label>
                  <div className="space-y-2">
                    {fpDetailsData.specialties.map((specialty, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-8 text-center">{index + 1}位</span>
                        <Input
                          value={specialty}
                          readOnly
                          className="bg-gray-50"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      得意な顧客層年齢
                    </label>
                    <div className="space-y-1">
                      {["20代", "30代", "40代", "50代", "60代以上"].map(
                        (age) => (
                          <label key={age} className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-2"
                              defaultChecked={fpDetailsData.expertCustomerAges.includes(
                                age
                              )}
                            />
                            {age}
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      得意な顧客層属性
                    </label>
                    <div className="space-y-1">
                      {["子育て世帯", "独身", "女性", "男性", "シニア層"].map(
                        (type) => (
                          <label key={type} className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-2"
                              defaultChecked={fpDetailsData.expertCustomerTypes.includes(
                                type
                              )}
                            />
                            {type}
                          </label>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700"
              >
                保存
              </Button>
              <Button
                variant="secondary"
                className="bg-gray-600 hover:bg-gray-700 text-white"
              >
                キャンセル
              </Button>
            </div>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  年
                </label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024年</SelectItem>
                    <SelectItem value="2023">2023年</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  月
                </label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>
                        {i + 1}月
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">配信実績</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {fpPerformanceData.scheduledDeliveries}
                  </div>
                  <div className="text-sm text-gray-600">今月の配信予定数</div>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {fpPerformanceData.actualDeliveries}
                  </div>
                  <div className="text-sm text-gray-600">今月の配信実績数</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {fpPerformanceData.deliveryRate}%
                  </div>
                  <div className="text-sm text-gray-600">配信実績率</div>
                  <div className="text-xs text-gray-500">
                    {fpPerformanceData.actualDeliveries}/
                    {fpPerformanceData.scheduledDeliveries}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">ステータス別実績</h3>
              <div className="grid grid-cols-5 gap-4">
                <div className="bg-white border p-4 rounded-lg">
                  <div className="text-xl font-bold">
                    {connectionSuccessRate}%
                  </div>
                  <div className="text-sm text-gray-600">電話通電数</div>
                  <div className="text-xs text-gray-500">
                    {fpPerformanceData.phoneConnections}/
                    {fpPerformanceData.actualDeliveries}
                  </div>
                </div>
                <div className="bg-white border p-4 rounded-lg">
                  <div className="text-xl font-bold">{scheduleRate}%</div>
                  <div className="text-sm text-gray-600">日程調整数</div>
                  <div className="text-xs text-gray-500">
                    {fpPerformanceData.scheduleAdjustments}/
                    {fpPerformanceData.phoneConnections}
                  </div>
                </div>
                <div className="bg-white border p-4 rounded-lg">
                  <div className="text-xl font-bold">
                    {meetingConversionRate}%
                  </div>
                  <div className="text-sm text-gray-600">面談実施数</div>
                  <div className="text-xs text-gray-500">
                    {fpPerformanceData.meetingsHeld}/
                    {fpPerformanceData.scheduleAdjustments}
                  </div>
                </div>
                <div className="bg-white border p-4 rounded-lg">
                  <div className="text-xl font-bold">{proposalRate}%</div>
                  <div className="text-sm text-gray-600">商品提案数</div>
                  <div className="text-xs text-gray-500">
                    {fpPerformanceData.proposalsSent}/
                    {fpPerformanceData.meetingsHeld}
                  </div>
                </div>
                <div className="bg-white border p-4 rounded-lg">
                  <div className="text-xl font-bold">{contractRate}%</div>
                  <div className="text-sm text-gray-600">契約数</div>
                  <div className="text-xs text-gray-500">
                    {fpPerformanceData.contractsSigned}/
                    {fpPerformanceData.proposalsSent}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "customers" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">担当顧客一覧</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      顧客名
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      割当日
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      現在のステータス
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      最終更新日
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fpCustomersData.map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {customer.assignmentDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusBadgeColor(customer.status)}>
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {customer.lastUpdate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCustomerClick(customer)}
                        >
                          詳細
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Customer Detail Modal */}
            <Dialog
              open={isCustomerModalOpen}
              onOpenChange={setIsCustomerModalOpen}
            >
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>
                    顧客詳細情報: {selectedCustomer?.name}
                  </DialogTitle>
                </DialogHeader>
                {selectedCustomer && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">顧客基本情報</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>顧客名: {selectedCustomer.name}</div>
                        <div>割当日: {selectedCustomer.assignmentDate}</div>
                        <div>
                          現在のステータス:{" "}
                          <Badge
                            className={getStatusBadgeColor(
                              selectedCustomer.status
                            )}
                          >
                            {selectedCustomer.status}
                          </Badge>
                        </div>
                        <div>最終更新日: {selectedCustomer.lastUpdate}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">ステータス変更履歴</h4>
                      <div className="text-sm text-gray-600">
                        2024-08-25: 新規 → 連絡済み
                        <br />
                        2024-08-27: 連絡済み → 面談実施
                        <br />
                        2024-08-29: 面談実施 → {selectedCustomer.status}
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        )}

        {activeTab === "contract" && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">契約情報</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>契約開始日: {fpContractData.contractStart}</div>
                  <div>契約終了日: {fpContractData.contractEnd}</div>
                  <div>更新日: {fpContractData.renewalDate}</div>
                  <div>
                    契約プラン: {fpContractData.planName} - ¥
                    {fpContractData.monthlyFee.toLocaleString()}/月
                  </div>
                  <div>
                    契約の状態:{" "}
                    <Badge className="bg-green-100 text-green-800">
                      {fpContractData.contractStatus}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    FPランク:
                    <Select defaultValue={String(fpContractData.fpRank)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((rank) => (
                          <SelectItem key={rank} value={String(rank)}>
                            ランク{rank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">支払い履歴</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        請求日
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        請求期間
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        料金種別
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        金額
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        支払い状況
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        支払い日
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        支払い方法
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        備考
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fpPaymentsData.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {payment.invoiceDate}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {payment.period}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {payment.feeType}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          ¥{payment.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <Badge className="bg-green-100 text-green-800">
                            {payment.paymentStatus}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {payment.paymentDate}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {payment.paymentMethod}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {payment.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">支払い方法一覧</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        登録日
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        支払い方法
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        カード番号/口座情報
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        有効期限
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        状態
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        デフォルト
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paymentMethodsData.map((method) => (
                      <tr key={method.id}>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {method.registrationDate}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {method.paymentMethod}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {method.cardInfo}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {method.expirationDate}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <Badge className="bg-green-100 text-green-800">
                            {method.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {method.isDefault ? "✓" : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// ============================================================================
// FP List View (Main Component)
// ============================================================================
function FPList({ onFPClick }: { onFPClick: (fpId: string) => void }) {
  const [fps, setFPs] = useState<FP[]>(mockFPs);
  const [searchTerm, setSearchTerm] = useState("");
  const [fpTypeFilter, setFpTypeFilter] = useState("全て");
  const [statusFilter, setStatusFilter] = useState("全て");
  const [showIncompleteOnly, setShowIncompleteOnly] = useState(false);
  const [sortColumn, setSortColumn] = useState("joinDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredFPs = useMemo(() => {
    let filtered = fps.filter((fp) => {
      const matchesSearch =
        searchTerm === "" ||
        fp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fp.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFpType =
        fpTypeFilter === "全て" || fp.fpType === fpTypeFilter;
      const matchesStatus =
        statusFilter === "全て" || fp.status === statusFilter;

      const [assigned, total] = fp.monthlyAssignment.split("/").map(Number);
      const matchesIncomplete = !showIncompleteOnly || assigned < total;

      return (
        matchesSearch && matchesFpType && matchesStatus && matchesIncomplete
      );
    });

    // Sort functionality
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortColumn) {
        case "joinDate":
          aValue = new Date(a.joinDate);
          bValue = new Date(b.joinDate);
          break;
        case "reviewCount":
        case "averageRating":
        case "rank":
          aValue = a[sortColumn];
          bValue = b[sortColumn];
          break;
        default:
          return 0;
      }

      if (sortDirection === "desc") {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [
    fps,
    searchTerm,
    fpTypeFilter,
    statusFilter,
    showIncompleteOnly,
    sortColumn,
    sortDirection,
  ]);

  const totalPages = Math.ceil(filteredFPs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFPs = filteredFPs.slice(startIndex, endIndex);

  const clearFilters = () => {
    setSearchTerm("");
    setFpTypeFilter("全て");
    setStatusFilter("全て");
    setShowIncompleteOnly(false);
    setCurrentPage(1);
  };

  const handleCreateFP = (data: NewFPFormData) => {
    console.log("New FP Data Submitted:", data);

    const newFP: FP = {
      id: `FP${fps.length + 1}`, // Simple ID generation for prototype
      name: data.name,
      email: data.email,
      fpType: data.fpType,
      company: data.fpType === "法人" ? data.companyName : "",
      joinDate: new Date().toISOString().slice(0, 10),
      reviewCount: 0,
      averageRating: 0,
      rank: parseInt(data.initialRank, 10),
      monthlyAssignment: `0/${data.monthlyAllocationLimit}`,
      status: data.accountStatus,
      role: data.role === "管理者" ? "管理者" : "一般",
    };

    setFPs((prevFPs) => [newFP, ...prevFPs]);
    setIsModalOpen(false);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const getFpTypeBadgeColor = (type: string) => {
    return type === "個人"
      ? "bg-blue-100 text-blue-800 border-blue-200"
      : "bg-purple-100 text-purple-800 border-purple-200";
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "活動中"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  const getRankBadgeColor = (rank: number) => {
    const colors: { [key: number]: string } = {
      1: "bg-red-100 text-red-800 border-red-200",
      2: "bg-orange-100 text-orange-800 border-orange-200",
      3: "bg-yellow-100 text-yellow-800 border-yellow-200",
      4: "bg-blue-100 text-blue-800 border-blue-200",
      5: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[rank] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column)
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    return sortDirection === "desc" ? (
      <ArrowDown className="h-4 w-4 text-gray-600" />
    ) : (
      <ArrowUp className="h-4 w-4 text-gray-600" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">FP管理</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          新規FPアカウント登録
        </Button>
      </div>

      <NewFPModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateFP}
      />

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-800">
            {fpSummaryStats.individualFPs.toLocaleString()}
          </div>
          <div className="text-sm text-blue-600">個人FP人数</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-800">
            {fpSummaryStats.corporateFPs.toLocaleString()}
          </div>
          <div className="text-sm text-purple-600">法人FP人数</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-800">
            {fpSummaryStats.activeFPs.toLocaleString()}
          </div>
          <div className="text-sm text-green-600">活動中</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-800">
            {fpSummaryStats.suspendedFPs.toLocaleString()}
          </div>
          <div className="text-sm text-red-600">停止中</div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="名前/メール/会社名で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-4">
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
                <option value="個人">個人</option>
                <option value="法人">法人</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">状態:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="全て">全て</option>
                <option value="活動中">活動中</option>
                <option value="停止中">停止中</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="incompleteOnly"
                checked={showIncompleteOnly}
                onChange={(e) => setShowIncompleteOnly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="incompleteOnly" className="text-sm text-gray-700">
                割当未完了のFPのみ表示
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
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="bg-white px-4 py-3 border border-gray-200 rounded-lg sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-700">
              Results: {startIndex + 1}-{Math.min(endIndex, filteredFPs.length)}{" "}
              of {filteredFPs.length} FPs
            </p>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700">表示件数:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              >
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              前へ
            </Button>
            <span className="text-sm text-gray-700">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              次へ
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                  FP名
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-56">
                  メール
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-30">
                  FP種類
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-44">
                  所属会社
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-30 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("joinDate")}
                >
                  <div className="flex items-center gap-1">
                    参加日
                    {renderSortIcon("joinDate")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("reviewCount")}
                >
                  <div className="flex items-center gap-1">
                    評価数
                    {renderSortIcon("reviewCount")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("averageRating")}
                >
                  <div className="flex items-center gap-1">
                    平均評価
                    {renderSortIcon("averageRating")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("rank")}
                >
                  <div className="flex items-center gap-1">
                    ランク
                    {renderSortIcon("rank")}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36">
                  今月割当状況
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                  状態
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentFPs.map((fp) => (
                <tr key={fp.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onFPClick(fp.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {fp.name}
                    </button>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fp.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getFpTypeBadgeColor(
                          fp.fpType
                        )}`}
                      >
                        {fp.fpType}
                      </span>
                      {fp.role === "管理者" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-orange-100 text-orange-800 border-orange-200">
                          管理者
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fp.company}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fp.joinDate}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fp.reviewCount}件
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-900">
                        {fp.averageRating}
                      </span>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRankBadgeColor(
                        fp.rank
                      )}`}
                    >
                      {fp.rank}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fp.monthlyAssignment}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(
                        fp.status
                      )}`}
                    >
                      {fp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Exported Component
// This is what you'll import into your page.tsx
// ============================================================================
export function FPManagementPage() {
  const [selectedFPId, setSelectedFPId] = useState<string | null>(null);

  if (selectedFPId) {
    return (
      <FPDetails fpId={selectedFPId} onBack={() => setSelectedFPId(null)} />
    );
  }

  return <FPList onFPClick={setSelectedFPId} />;
}
