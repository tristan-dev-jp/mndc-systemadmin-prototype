"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { Partner } from "@/lib/types";
import { mockPartners } from "@/data/partners";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ============================================================================
// New Partner Modal Component
// ============================================================================

type NewPartnerFormData = {
  name: string;
  contactEmail: string;
  lpUrl: string;
  status: "アクティブ" | "停止中";
};

interface NewPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewPartnerFormData) => void;
}

function NewPartnerModal({ isOpen, onClose, onSubmit }: NewPartnerModalProps) {
  const initialFormData: NewPartnerFormData = {
    name: "",
    contactEmail: "",
    lpUrl: "",
    status: "アクティブ",
  };
  const [formData, setFormData] = useState<NewPartnerFormData>(initialFormData);

  const handleSubmit = () => {
    onSubmit(formData);
  };

  // The form UI will be built in Step 2. For now, this is the basic structure.
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新規パートナー登録</DialogTitle>
        </DialogHeader>
        {/* The form UI will be built in Step 2 */}
      </DialogContent>
    </Dialog>
  );
}

export function PartnerManagementPage() {
  const [partners, setPartners] = useState<Partner[]>(mockPartners);

  const getStatusBadgeColor = (status: "アクティブ" | "停止中") => {
    return status === "アクティブ"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">パートナー管理</h2>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          新規パートナー登録
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  パートナー名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  連絡先メール
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  問い合わせLPのURL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状況
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  最終更新日
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {partner.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {partner.contactEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                    <a
                      href={partner.lpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {partner.lpUrl}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getStatusBadgeColor(partner.status)}>
                      {partner.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {partner.lastUpdated}
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
