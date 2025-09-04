"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Users,
  User,
  UserCheck,
  Star,
  MessageSquare,
  Gift,
  UserX,
  ArrowUp,
  ArrowDown,
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
} from "@/components/ui/dialog";

import { japanesePrefectures } from "@/data/constants";
import {
  mockUsers,
  mockConsultations,
  mockReviews,
  mockGifts,
} from "@/data/users";
import type {
  User as UserType,
  Consultation,
  Review,
  Gift as GiftType,
} from "@/lib/types";

// ============================================================================
// User Details View Component
// ============================================================================
function UserDetails({ user, onBack }: { user: UserType; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    name: user.name || "",
    furigana: user.furigana || "",
    email: user.email || "",
    phone: user.phone || "",
    birthDate: user.birthDate || "",
    gender: user.gender || "",
    prefecture: user.prefecture || "",
    consultationContent: user.consultationContent || "",
    preferredCallTime: user.preferredCallTime || "",
  });

  const userConsultations = mockConsultations.filter(
    (c: Consultation) => c.userId === user.id
  );
  const userReviews = mockReviews.filter((r: Review) => r.userId === user.id);
  const userGifts = mockGifts.filter((g: GiftType) => g.userId === user.id);

  const handleSave = () => {
    // In a real app, you'd save this data.
    console.log("Saving user data:", formData);
  };

  // Helper functions for badge colors and rendering stars
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

  const getFpTypeBadgeColor = (type: string) => {
    return type === "個人"
      ? "bg-blue-100 text-blue-800"
      : "bg-purple-100 text-purple-800";
  };

  const getGiftStatusBadgeColor = (status: string) => {
    const colors: { [key: string]: string } = {
      申請中: "bg-yellow-100 text-yellow-800",
      処理完了: "bg-green-100 text-green-800",
      LINE公式で配信済み: "bg-green-100 text-green-800",
      エラー: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>ユーザー管理</span>
          <ChevronRight className="h-4 w-4" />
          <span>ユーザー詳細</span>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            ユーザー詳細: {user.name}
          </h2>
          <Button
            variant="outline"
            onClick={onBack}
            className="bg-gray-600 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            ユーザー一覧に戻る
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
              onClick={() => setActiveTab("consultations")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                activeTab === "consultations"
                  ? "border-blue-600 text-blue-700 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <UserCheck className="h-4 w-4" />
              相談／マッチングの状況
              {userConsultations.length > 0 && (
                <Badge className="bg-blue-100 text-blue-800 text-xs ml-1">
                  {userConsultations.length}
                </Badge>
              )}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                activeTab === "reviews"
                  ? "border-blue-600 text-blue-700 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Star className="h-4 w-4" />
              レビュー・ギフト
              {userReviews.length > 0 && (
                <Badge className="bg-green-100 text-green-800 text-xs ml-1">
                  {userReviews.length}
                </Badge>
              )}
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "basic" && (
            // Basic Info Tab
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Read-only fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ユーザーID
                  </label>
                  <Input
                    value={user.id}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LINE公式連携状況
                  </label>
                  <Badge
                    className={
                      user.lineStatus === "連携済み"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
                    }
                  >
                    {user.lineStatus || "未連携"}
                  </Badge>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    流入経路／アフィリエイト元
                  </label>
                  <Input
                    value={user.affiliateSource || user.partner}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最終ログイン日付
                  </label>
                  <Input
                    value={user.lastLogin || "-"}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>

                {/* Editable fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    氏名
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    フリガナ
                  </label>
                  <Input
                    value={formData.furigana}
                    onChange={(e) =>
                      setFormData({ ...formData, furigana: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    電話番号
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    性別
                  </label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="男性">男性</SelectItem>
                      <SelectItem value="女性">女性</SelectItem>
                      <SelectItem value="その他">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    都道府県
                  </label>
                  <Select
                    value={formData.prefecture}
                    onValueChange={(value) =>
                      setFormData({ ...formData, prefecture: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {japanesePrefectures.map((pref) => (
                        <SelectItem key={pref} value={pref}>
                          {pref}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ご相談内容
                </label>
                <Textarea
                  rows={4}
                  value={formData.consultationContent}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      consultationContent: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  電話希望時間帯
                </label>
                <Textarea
                  rows={3}
                  value={formData.preferredCallTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferredCallTime: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  保存
                </Button>
                <Button
                  variant="outline"
                  className="bg-gray-600 hover:bg-gray-700 text-white"
                >
                  キャンセル
                </Button>
              </div>
            </div>
          )}

          {activeTab === "consultations" && (
            // Consultations Tab
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-800">
                    {userConsultations.length}件
                  </div>
                  <div className="text-sm text-blue-600">総マッチング数</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-800">
                    {
                      userConsultations.filter(
                        (c) =>
                          !["契約", "失注", "保留"].includes(c.currentStatus)
                      ).length
                    }
                    件
                  </div>
                  <div className="text-sm text-green-600">
                    アクティブマッチング
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-800">
                    {
                      userConsultations.filter(
                        (c) => c.currentStatus === "契約"
                      ).length
                    }
                    件
                  </div>
                  <div className="text-sm text-purple-600">完了マッチング</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-800">
                    {
                      userConsultations.filter(
                        (c) => c.currentStatus === "保留"
                      ).length
                    }
                    件
                  </div>
                  <div className="text-sm text-yellow-600">
                    保留中マッチング
                  </div>
                </div>
              </div>

              {/* Consultations Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    マッチング履歴
                  </h3>
                </div>
                {userConsultations.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36">
                            マッチング日
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                            FP種類
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                            FP名
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36">
                            現在のステータス
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                            マッチング種類
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                            備考
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                            アクション
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {userConsultations.map((consultation) => (
                          <tr key={consultation.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {consultation.matchingDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                className={getFpTypeBadgeColor(
                                  consultation.fpType
                                )}
                              >
                                {consultation.fpType}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {consultation.fpName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                className={getStatusBadgeColor(
                                  consultation.currentStatus
                                )}
                              >
                                {consultation.currentStatus}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {consultation.matchingType}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-48">
                              {consultation.notes}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    詳細を見る
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  <DialogHeader>
                                    <DialogTitle>
                                      マッチング詳細情報
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                          マッチング日
                                        </label>
                                        <p className="text-sm text-gray-900">
                                          {consultation.matchingDate}
                                        </p>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                          FP名
                                        </label>
                                        <p className="text-sm text-gray-900">
                                          {consultation.fpName}
                                        </p>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                          現在のステータス
                                        </label>
                                        <Badge
                                          className={getStatusBadgeColor(
                                            consultation.currentStatus
                                          )}
                                        >
                                          {consultation.currentStatus}
                                        </Badge>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                          マッチング種類
                                        </label>
                                        <p className="text-sm text-gray-900">
                                          {consultation.matchingType}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        備考・履歴
                                      </label>
                                      <p className="text-sm text-gray-900">
                                        {consultation.notes}
                                      </p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      マッチング履歴がありません
                    </h3>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            // Reviews and Gifts Tab
            <div className="space-y-6">
              {/* Reviews Section */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    レビュー履歴
                  </h3>
                </div>
                {userReviews.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36">
                            レビュー記載日
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                            FP種類
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                            FP名
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                            レビュー記載時のステータス
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                            満足度
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64">
                            レビュー内容
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                            アクション
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {userReviews.map((review) => (
                          <tr key={review.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {review.reviewDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                className={getFpTypeBadgeColor(review.fpType)}
                              >
                                {review.fpType}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {review.fpName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {review.statusAtReview}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                {renderStars(review.rating)}
                                <span className="text-sm text-gray-600 ml-2">
                                  {review.rating}つ星
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-64">
                              {review.reviewContent}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    詳細を見る
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  <DialogHeader>
                                    <DialogTitle>レビュー詳細</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                          レビュー記載日
                                        </label>
                                        <p className="text-sm text-gray-900">
                                          {review.reviewDate}
                                        </p>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                          FP名
                                        </label>
                                        <p className="text-sm text-gray-900">
                                          {review.fpName}
                                        </p>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                          レビュー記載時のステータス
                                        </label>
                                        <p className="text-sm text-gray-900">
                                          {review.statusAtReview}
                                        </p>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                          満足度評価
                                        </label>
                                        <div className="flex items-center gap-2">
                                          {renderStars(review.rating)}
                                          <span className="text-lg font-medium">
                                            {review.rating}つ星
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        詳細レビュー内容
                                      </label>
                                      <p className="text-sm text-gray-900 mt-2 p-4 bg-gray-50 rounded-lg">
                                        {review.reviewContent}
                                      </p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      レビューがありません
                    </h3>
                  </div>
                )}
              </div>

              {/* Gifts Section */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    ギフト申請履歴
                  </h3>
                </div>
                {userGifts.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36">
                            申請日
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                            ギフト種類
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                            申請状況
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36">
                            処理日
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {userGifts.map((gift) => (
                          <tr key={gift.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {gift.applicationDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {gift.giftType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                className={getGiftStatusBadgeColor(gift.status)}
                              >
                                {gift.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {gift.processedDate || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      ギフト申請履歴がありません
                    </h3>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// User List View (Main Component)
// ============================================================================
function UserList() {
  const [users, setUsers] = useState<UserType[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [partnerFilter, setPartnerFilter] = useState("全て");
  const [verificationFilter, setVerificationFilter] = useState("全て");
  const [newUserFilter, setNewUserFilter] = useState("全て");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const filteredUsers = useMemo(() => {
    let filtered = users.filter((user) => {
      const matchesSearch =
        searchTerm === "" ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email &&
          user.email.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesPartner =
        partnerFilter === "全て" || user.partner === partnerFilter;
      const matchesVerification =
        verificationFilter === "全て" ||
        user.verificationStatus === verificationFilter;
      const matchesNewUser =
        newUserFilter === "全て" ||
        (newUserFilter === "新規のみ" && user.isNew);

      const matchesDateRange =
        (!startDate || user.registrationDate >= startDate) &&
        (!endDate || user.registrationDate <= endDate);

      return (
        matchesSearch &&
        matchesPartner &&
        matchesVerification &&
        matchesNewUser &&
        matchesDateRange
      );
    });

    // Sort by registration date
    filtered.sort((a, b) => {
      const dateA = new Date(a.registrationDate);
      const dateB = new Date(b.registrationDate);
      return sortDirection === "desc"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

    return filtered;
  }, [
    users,
    searchTerm,
    partnerFilter,
    verificationFilter,
    newUserFilter,
    startDate,
    endDate,
    sortDirection,
  ]);

  const newUsersCount = users.filter((user) => user.isNew).length;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleUserClick = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
      // Mark user as "not new" when clicked
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, isNew: false } : u))
      );
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPartnerFilter("全て");
    setVerificationFilter("全て");
    setNewUserFilter("全て");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  const toggleSort = () => {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  if (selectedUser) {
    return (
      <UserDetails user={selectedUser} onBack={() => setSelectedUser(null)} />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-6">
          <p className="text-sm text-gray-600">
            登録ユーザー総数: {users.length}名
          </p>
          {newUsersCount > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-1 rounded-md text-sm">
              未確認の新規ユーザー: {newUsersCount}名
            </div>
          )}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-end">
          {/* Combined Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              統合検索
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ユーザー名またはメールアドレスで検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Partner Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              紹介元パートナー
            </label>
            <Select value={partnerFilter} onValueChange={setPartnerFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全て">全て</SelectItem>
                <SelectItem value="直接登録">直接登録</SelectItem>
                <SelectItem value="アフィリエイトパートナーA">
                  アフィリエイトパートナーA
                </SelectItem>
                <SelectItem value="パートナーB">パートナーB</SelectItem>
                <SelectItem value="アフィリエイトパートナーC">
                  アフィリエイトパートナーC
                </SelectItem>
                <SelectItem value="パートナーD">パートナーD</SelectItem>
                <SelectItem value="パートナーE">パートナーE</SelectItem>
                <SelectItem value="モバイル広告パートナー">
                  モバイル広告パートナー
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Verification Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              認証状況
            </label>
            <Select
              value={verificationFilter}
              onValueChange={setVerificationFilter}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全て">全て</SelectItem>
                <SelectItem value="認証済み">認証済み</SelectItem>
                <SelectItem value="未認証">未認証</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* New User Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              新規ユーザー
            </label>
            <Select value={newUserFilter} onValueChange={setNewUserFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全て">全て</SelectItem>
                <SelectItem value="新規のみ">新規のみ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          <div>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full bg-gray-500 text-white hover:bg-gray-600"
            >
              <X className="h-4 w-4 mr-2" />
              フィルタをクリア
            </Button>
          </div>
        </div>

        {/* Date Range */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              登録日期間 - 開始日
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              登録日期間 - 終了日
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Controls - Top */}
      {filteredUsers.length > 0 && (
        <div className="bg-white px-6 py-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">表示件数</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="60">60</SelectItem>
                    <SelectItem value="90">90</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-700">件表示</span>
              </div>
              <div className="text-sm text-gray-700">
                {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)}
                件目を表示 (全{filteredUsers.length}件中)
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                前へ
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum =
                    Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  if (pageNum > totalPages) return null;

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                次へ
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Data Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  ユーザーID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                  氏名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64">
                  メールアドレス
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-44 cursor-pointer hover:bg-gray-100"
                  onClick={toggleSort}
                >
                  <div className="flex items-center gap-1">
                    登録日
                    {sortDirection === "desc" ? (
                      <ArrowDown className="h-4 w-4" />
                    ) : (
                      <ArrowUp className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  認証状況
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-44">
                  紹介元パートナー
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => handleUserClick(user.id)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.furigana}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">
                        {user.registrationDate}
                      </span>
                      {user.isNew && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
                          新規
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.verificationStatus === "認証済み"
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : "bg-yellow-100 text-yellow-800 border border-yellow-300"
                      }`}
                    >
                      {user.verificationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate">
                    {user.partner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              条件に一致するユーザーが見つかりません
            </h3>
            <p className="text-gray-600">
              検索条件やフィルターを調整してください
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Main Exported Component
// This is what you'll import into your page.tsx
// ============================================================================
export function UserManagementPage() {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  // This logic was in the original main page, now it's encapsulated here
  if (selectedUser) {
    return (
      <UserDetails user={selectedUser} onBack={() => setSelectedUser(null)} />
    );
  }

  return <UserList />;
}
