"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
import { mockPartners } from "@/data/partners";
import type { Partner } from "@/lib/types";

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
// Partner List Page Component
// ============================================================================
export function PartnerManagementPage() {
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {[
                  "パートナー名",
                  "連絡先メール",
                  "問い合わせLPのURL",
                  "状況",
                  "最終更新日",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partners.map((partner) => (
                <tr
                  key={partner.id}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:underline">
                    {partner.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {partner.contactEmail}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    <a
                      href={partner.lpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {partner.lpUrl}
                    </a>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <Badge className={getStatusBadgeColor(partner.status)}>
                      {partner.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {partner.lastUpdated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
