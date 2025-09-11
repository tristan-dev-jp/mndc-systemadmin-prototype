"use client";

import { useState, useMemo } from "react";
import { Search, Star, Plus } from "lucide-react";
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
import { mockReviews } from "@/data/reviews";
import type { ReviewRecord } from "@/lib/types";

// Helper function to render star ratings
const renderStars = (rating: number) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export function ReviewManagementPage() {
  const [reviews] = useState<ReviewRecord[]>(mockReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("全て");
  const [reviewerTypeFilter, setReviewerTypeFilter] = useState("全て");
  const [fpTypeFilter, setFpTypeFilter] = useState("全て");
  const [statusFilter, setStatusFilter] = useState("全て");
  // Placeholder for date range state
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        searchTerm === "" ||
        review.fpName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (review.reviewerType === "エンドユーザー" &&
          review.reviewerName.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesRating =
        ratingFilter === "全て" || review.rating === parseInt(ratingFilter);

      const matchesReviewerType =
        reviewerTypeFilter === "全て" ||
        review.reviewerType === reviewerTypeFilter;

      const matchesFpType =
        fpTypeFilter === "全て" || review.fpType === fpTypeFilter;

      const matchesStatus =
        statusFilter === "全て" || review.statusAtReview === statusFilter;

      // Date range filtering would be implemented here
      // const matchesDate = ...

      return (
        matchesSearch &&
        matchesRating &&
        matchesReviewerType &&
        matchesFpType &&
        matchesStatus
      );
    });
  }, [
    reviews,
    searchTerm,
    ratingFilter,
    reviewerTypeFilter,
    fpTypeFilter,
    statusFilter,
  ]);

  const getReviewerTypeBadge = (type: ReviewRecord["reviewerType"]) => {
    return type === "システム管理者"
      ? "bg-blue-100 text-blue-800 border-blue-200"
      : "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getFpTypeBadge = (type: ReviewRecord["fpType"]) => {
    return type === "個人FP"
      ? "bg-indigo-100 text-indigo-800 border-indigo-200"
      : "bg-purple-100 text-purple-800 border-purple-200";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">全レビュー一覧</h2>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              検索
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="FP名／投稿者名"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              評価
            </label>
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全て">全て</SelectItem>
                <SelectItem value="5">★5</SelectItem>
                <SelectItem value="4">★4</SelectItem>
                <SelectItem value="3">★3</SelectItem>
                <SelectItem value="2">★2</SelectItem>
                <SelectItem value="1">★1</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reviewer Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              投稿者種別
            </label>
            <Select
              value={reviewerTypeFilter}
              onValueChange={setReviewerTypeFilter}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全て">全て</SelectItem>
                <SelectItem value="エンドユーザー">エンドユーザー</SelectItem>
                <SelectItem value="システム管理者">システム管理者</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* FP Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              FP種別
            </label>
            <Select value={fpTypeFilter} onValueChange={setFpTypeFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全て">全て</SelectItem>
                <SelectItem value="個人FP">個人FP</SelectItem>
                <SelectItem value="法人FP">法人FP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Date Range Filter (Placeholder) */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              投稿日期間
            </label>
            <div className="flex items-center gap-2">
              <Input type="date" placeholder="開始日" />
              <span>-</span>
              <Input type="date" placeholder="終了日" />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              レビュー記載時のステータス
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全て">全て</SelectItem>
                <SelectItem value="新規">新規</SelectItem>
                <SelectItem value="日程調整">日程調整</SelectItem>
                <SelectItem value="面談実施">面談実施</SelectItem>
                <SelectItem value="商品提案">商品提案</SelectItem>
                <SelectItem value="契約">契約</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="lg:col-span-2 flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              新規レビュー作成
            </Button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>投稿日時</TableHead>
                <TableHead>投稿者名</TableHead>
                <TableHead>投稿者種別</TableHead>
                <TableHead>FP名</TableHead>
                <TableHead>FP種別</TableHead>
                <TableHead>評価</TableHead>
                <TableHead>レビュー内容</TableHead>
                <TableHead>レビュー記載時のステータス</TableHead>
                <TableHead>アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.postedAt}</TableCell>
                  <TableCell>
                    {review.reviewerType === "システム管理者"
                      ? "-"
                      : review.reviewerName}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getReviewerTypeBadge(review.reviewerType)}
                    >
                      {review.reviewerType}
                    </Badge>
                  </TableCell>
                  <TableCell>{review.fpName}</TableCell>
                  <TableCell>
                    <Badge className={getFpTypeBadge(review.fpType)}>
                      {review.fpType}
                    </Badge>
                  </TableCell>
                  <TableCell>{renderStars(review.rating)}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {review.reviewContent}
                  </TableCell>
                  <TableCell>{review.statusAtReview}</TableCell>
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
      </div>
    </div>
  );
}
