"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  FileText,
  Image as ImageIcon,
  History,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { mockFaqs, mockLegalDocuments, mockAdBanners } from "@/data/content";
import type {
  FAQItem,
  LegalDocument,
  DocumentVersion,
  AdBanner,
} from "@/lib/types";

// ============================================================================
// FAQ Add/Edit Modal Component
// ============================================================================
interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (faq: Omit<FAQItem, "id" | "lastUpdated">) => void;
  faqToEdit?: FAQItem | null;
}

function FAQModal({ isOpen, onClose, onSubmit, faqToEdit }: FAQModalProps) {
  const [formData, setFormData] = useState<Omit<FAQItem, "id" | "lastUpdated">>(
    faqToEdit || {
      displayOrder: 0,
      category: "",
      question: "",
      answer: "",
      publicationStatus: "公開中",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{faqToEdit ? "FAQを編集" : "新規FAQ作成"}</DialogTitle>
          <DialogDescription>
            {faqToEdit ? "FAQの内容を編集します。" : "新しいFAQを作成します。"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="displayOrder" className="text-right">
              表示順
            </Label>
            <Input
              id="displayOrder"
              name="displayOrder"
              type="number"
              value={formData.displayOrder}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              カテゴリー
            </Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="question" className="text-right">
              質問
            </Label>
            <Input
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="answer" className="text-right pt-2">
              回答
            </Label>
            <Textarea
              id="answer"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              className="col-span-3"
              rows={5}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="publicationStatus" className="text-right">
              公開状況
            </Label>
            <Select
              value={formData.publicationStatus}
              onValueChange={(value) =>
                handleSelectChange("publicationStatus", value)
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="公開中">公開中</SelectItem>
                <SelectItem value="非公開">非公開</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================================
// Ad Banner - Add/Edit Modal Component
// ============================================================================
interface BannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    bannerData: Omit<AdBanner, "id" | "clicks" | "imageUrl">,
    file?: File
  ) => void;
  bannerToEdit?: AdBanner | null;
  targetPosition?: number | null;
}

function BannerModal({
  isOpen,
  onClose,
  onSubmit,
  bannerToEdit,
  targetPosition,
}: BannerModalProps) {
  const [formData, setFormData] = useState({
    linkUrl: "",
    displayPeriod: "2024/10/01 - 2024/10/31",
    publicationStatus: "公開中" as AdBanner["publicationStatus"],
    position: 1,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useMemo(() => {
    if (isOpen) {
      setFormData({
        linkUrl: bannerToEdit?.linkUrl || "",
        displayPeriod: bannerToEdit?.displayPeriod || "2024/10/01 - 2024/10/31",
        publicationStatus: bannerToEdit?.publicationStatus || "公開中",
        position: bannerToEdit?.position || targetPosition || 1,
      });
      setSelectedFile(null);
    }
  }, [isOpen, bannerToEdit, targetPosition]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.linkUrl || !formData.displayPeriod) {
      alert("リンクURLと表示期間は必須です。");
      return;
    }
    onSubmit(formData, selectedFile || undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {bannerToEdit ? "バナーを編集" : "新規バナー追加"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="position">表示位置</Label>
            <Select
              value={String(formData.position)}
              onValueChange={(v) =>
                setFormData((p) => ({ ...p, position: Number(v) }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Position 1</SelectItem>
                <SelectItem value="2">Position 2</SelectItem>
                <SelectItem value="3">Position 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="imageUrl">バナー画像</Label>
            <Input
              id="imageUrl"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
          </div>
          <div>
            <Label htmlFor="linkUrl">リンクURL</Label>
            <Input
              id="linkUrl"
              name="linkUrl"
              value={formData.linkUrl}
              onChange={handleChange}
            />
          </div>
          {/* Simplified display period for prototype */}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================================
// Legal Docs - Upload Modal Component
// ============================================================================
interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (version: string, file: File) => void;
  documentName: string;
}

function UploadModal({
  isOpen,
  onClose,
  onSubmit,
  documentName,
}: UploadModalProps) {
  const [newVersion, setNewVersion] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (newVersion && selectedFile) {
      onSubmit(newVersion, selectedFile);
      onClose();
    } else {
      alert("すべてのフィールドを入力してください。");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            新規バージョンをアップロード: {documentName}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="version">新規バージョン</Label>
            <Input
              id="version"
              value={newVersion}
              onChange={(e) => setNewVersion(e.target.value)}
              placeholder="例: v2.2"
            />
          </div>
          <div>
            <Label htmlFor="file">ファイル</Label>
            <Input
              id="file"
              type="file"
              onChange={(e) =>
                setSelectedFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit}>アップロード</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================================
// Legal Docs - History Modal Component
// ============================================================================
interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: LegalDocument | null;
}

function HistoryModal({ isOpen, onClose, document }: HistoryModalProps) {
  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{document.name} の履歴</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto max-h-[60vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>バージョン</TableHead>
                <TableHead>アップロード日</TableHead>
                <TableHead>ファイル名</TableHead>
                <TableHead>アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {document.history.map((version) => (
                <TableRow key={version.version}>
                  <TableCell>{version.version}</TableCell>
                  <TableCell>{version.uploadDate}</TableCell>
                  <TableCell>{version.fileName}</TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => alert(`Downloading ${version.fileName}`)}
                    >
                      ダウンロード
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================================
// FAQ Management Tab Component
// ============================================================================
function FaqManagementTab() {
  const [faqs, setFaqs] = useState<FAQItem[]>(mockFaqs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);

  const sortedFaqs = useMemo(() => {
    return [...faqs].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [faqs]);

  const handleAddOrEdit = (newFaqData: Omit<FAQItem, "id" | "lastUpdated">) => {
    const today = new Date().toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (editingFaq) {
      // Edit existing
      setFaqs(
        faqs.map((f) =>
          f.id === editingFaq.id
            ? { ...editingFaq, ...newFaqData, lastUpdated: today }
            : f
        )
      );
    } else {
      // Add new
      const newFaq: FAQItem = {
        ...newFaqData,
        id: `FAQ${String(faqs.length + 1).padStart(3, "0")}`,
        lastUpdated: today,
      };
      setFaqs((prev) => [...prev, newFaq]);
    }
    setIsModalOpen(false);
    setEditingFaq(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("このFAQを削除してもよろしいですか？")) {
      setFaqs(faqs.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">FAQ管理</h2>
        <Button
          onClick={() => {
            setEditingFaq(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          新規FAQ作成
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>表示順</TableHead>
                <TableHead>カテゴリー</TableHead>
                <TableHead>質問</TableHead>
                <TableHead>回答（抜粋）</TableHead>
                <TableHead>公開状況</TableHead>
                <TableHead>最終更新日</TableHead>
                <TableHead>アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedFaqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell>{faq.displayOrder}</TableCell>
                  <TableCell>{faq.category}</TableCell>
                  <TableCell className="font-medium">{faq.question}</TableCell>
                  <TableCell className="max-w-sm truncate">
                    {faq.answer}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        faq.publicationStatus === "公開中"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {faq.publicationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{faq.lastUpdated}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingFaq(faq);
                        setIsModalOpen(true);
                      }}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      編集
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(faq.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      削除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <FAQModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingFaq(null);
        }}
        onSubmit={handleAddOrEdit}
        faqToEdit={editingFaq}
      />
    </div>
  );
}

// ============================================================================
// Legal Docs Management Tab Component
// ============================================================================
function LegalDocsManagementTab() {
  const [documents, setDocuments] =
    useState<LegalDocument[]>(mockLegalDocuments);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] =
    useState<LegalDocument | null>(null);

  const handleOpenUploadModal = (doc: LegalDocument) => {
    setSelectedDocument(doc);
    setUploadModalOpen(true);
  };

  const handleOpenHistoryModal = (doc: LegalDocument) => {
    setSelectedDocument(doc);
    setHistoryModalOpen(true);
  };

  const handleUpload = (version: string, file: File) => {
    if (!selectedDocument) return;

    const newVersion: DocumentVersion = {
      version,
      fileName: file.name,
      fileUrl: `/docs/${file.name}`, // Mock URL
      uploadDate: new Date().toLocaleDateString("ja-JP"),
    };

    setDocuments(
      documents.map((doc) =>
        doc.id === selectedDocument.id
          ? {
              ...doc,
              currentVersion: version,
              lastUpdated: newVersion.uploadDate,
              history: [newVersion, ...doc.history],
            }
          : doc
      )
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">法的文書管理</h2>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>文書名</TableHead>
                <TableHead>現在のバージョン</TableHead>
                <TableHead>最終更新日</TableHead>
                <TableHead>公開状況</TableHead>
                <TableHead>アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{doc.currentVersion}</TableCell>
                  <TableCell>{doc.lastUpdated}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        doc.publicationStatus === "公開中"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {doc.publicationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenUploadModal(doc)}
                    >
                      <Upload className="h-3 w-3 mr-1" />
                      編集
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenHistoryModal(doc)}
                    >
                      <History className="h-3 w-3 mr-1" />
                      履歴
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSubmit={handleUpload}
        documentName={selectedDocument?.name || ""}
      />
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        document={selectedDocument}
      />
    </div>
  );
}

// ============================================================================
// Ad Banner Management Tab Component
// ============================================================================
function AdBannerManagementTab() {
  const [banners, setBanners] = useState<AdBanner[]>(mockAdBanners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<AdBanner | null>(null);
  const [targetPosition, setTargetPosition] = useState<number | null>(null);

  const activeBanners = useMemo(
    () => banners.filter((b) => b.position > 0),
    [banners]
  );

  const sortedBanners = useMemo(() => {
    return [...banners].sort((a, b) => {
      if (a.publicationStatus === "公開中" && b.publicationStatus !== "公開中")
        return -1;
      if (a.publicationStatus !== "公開中" && b.publicationStatus === "公開中")
        return 1;
      return (a.position || 99) - (b.position || 99);
    });
  }, [banners]);

  const handleOpenModal = (banner: AdBanner | null, position?: number) => {
    setEditingBanner(banner);
    setTargetPosition(position || null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("このバナーを削除してもよろしいですか？")) {
      setBanners(banners.filter((b) => b.id !== id));
    }
  };

  const handleAddOrEdit = (
    bannerData: Omit<AdBanner, "id" | "clicks" | "imageUrl">,
    file?: File
  ) => {
    if (editingBanner) {
      // Edit
      setBanners(
        banners.map((b) =>
          b.id === editingBanner.id
            ? {
                ...b,
                ...bannerData,
                imageUrl: file ? URL.createObjectURL(file) : b.imageUrl,
              }
            : b
        )
      );
    } else {
      // Add
      const newBanner: AdBanner = {
        id: `BANNER${String(banners.length + 1).padStart(3, "0")}`,
        clicks: 0,
        ...bannerData,
        imageUrl: file
          ? URL.createObjectURL(file)
          : "https://via.placeholder.com/300x100.png?text=New+Banner",
      };
      setBanners((prev) => [...prev, newBanner]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Banner Slots */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          バナースロット
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((pos) => {
            const banner = activeBanners.find((b) => b.position === pos);
            return (
              <div
                key={pos}
                className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-48 bg-gray-50"
              >
                <p className="font-semibold text-gray-500 mb-2">
                  Position {pos}
                </p>
                {banner ? (
                  <div className="text-center">
                    <img
                      src={banner.imageUrl}
                      alt={`Banner ${pos}`}
                      className="h-20 object-contain mb-2"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleOpenModal(banner)}>
                        設定変更
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(banner.id)}
                      >
                        削除
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button onClick={() => handleOpenModal(null, pos)}>
                    <Plus className="h-4 w-4 mr-2" />
                    新規バナー追加
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Banner Management Table */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          バナー管理テーブル
        </h3>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>表示位置</TableHead>
                <TableHead>バナー画像</TableHead>
                <TableHead>リンクURL</TableHead>
                <TableHead>表示期間</TableHead>
                <TableHead>公開状況</TableHead>
                <TableHead>クリック数</TableHead>
                <TableHead>アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedBanners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    {banner.position > 0
                      ? `Position ${banner.position}`
                      : "非表示"}
                  </TableCell>
                  <TableCell>
                    <img
                      src={banner.imageUrl}
                      alt=""
                      className="h-8 w-auto object-contain bg-gray-100"
                    />
                  </TableCell>
                  <TableCell>
                    <a
                      href={banner.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {banner.linkUrl}
                    </a>
                  </TableCell>
                  <TableCell>{banner.displayPeriod}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        banner.publicationStatus === "公開中"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {banner.publicationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{banner.clicks.toLocaleString()}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenModal(banner)}
                    >
                      編集
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(banner.id)}
                    >
                      削除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <BannerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddOrEdit}
        bannerToEdit={editingBanner}
        targetPosition={targetPosition}
      />
    </div>
  );
}

// ============================================================================
// Main Content Management Page Component
// ============================================================================
export function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState("faq");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">コンテンツ管理</h2>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("faq")}
            className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "faq"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <MessageSquare className="h-4 w-4" /> FAQ管理
          </button>
          <button
            onClick={() => setActiveTab("legal")}
            className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "legal"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <FileText className="h-4 w-4" /> 法的文書管理
          </button>
          <button
            onClick={() => setActiveTab("banners")}
            className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "banners"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <ImageIcon className="h-4 w-4" /> 広告バナー管理
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "faq" && <FaqManagementTab />}
        {activeTab === "legal" && <LegalDocsManagementTab />}
        {activeTab === "banners" && <AdBannerManagementTab />}
      </div>
    </div>
  );
}
