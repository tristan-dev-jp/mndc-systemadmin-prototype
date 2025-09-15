import type { FAQItem, LegalDocument, AdBanner } from "@/lib/types";

export const mockFaqs: FAQItem[] = [
  {
    id: "FAQ001",
    displayOrder: 1,
    category: "サービス基本",
    question: "サービスの利用料金は？",
    answer:
      "サービスのご利用は無料です。ファイナンシャルプランナーとの相談料も一切かかりません。",
    publicationStatus: "公開中",
    lastUpdated: "2024/09/15",
  },
  {
    id: "FAQ002",
    displayOrder: 2,
    category: "サービス基本",
    question: "相談できる内容は何ですか？",
    answer:
      "ライフプラン、保険、家計、資産運用、老後資金、NISA/iDECOなど、お金に関する幅広いご相談が可能です。",
    publicationStatus: "公開中",
    lastUpdated: "2024/09/14",
  },
  {
    id: "FAQ003",
    displayOrder: 3,
    category: "FPとの相談",
    question: "相談は何回でも無料ですか？",
    answer:
      "はい、何度でも無料でご相談いただけます。お客様が納得いくまで、担当のFPがサポートいたします。",
    publicationStatus: "公開中",
    lastUpdated: "2024/09/13",
  },
  {
    id: "FAQ004",
    displayOrder: 4,
    category: "FPとの相談",
    question: "オンラインでの相談は可能ですか？",
    answer:
      "はい、多くのFPがオンライン相談に対応しております。ご希望の場合は、マッチング後の日程調整の際にお申し付けください。",
    publicationStatus: "公開中",
    lastUpdated: "2024/09/12",
  },
  {
    id: "FAQ005",
    displayOrder: 5,
    category: "その他",
    question: "個人情報の取り扱いはどうなっていますか？",
    answer:
      "お客様の個人情報は、プライバシーポリシーに基づき厳重に管理しております。詳細はプライバシーポリシーのページをご確認ください。",
    publicationStatus: "非公開",
    lastUpdated: "2024/09/11",
  },
];

export const mockLegalDocuments: LegalDocument[] = [
  {
    id: "tos",
    name: "サービス利用規約",
    currentVersion: "v2.1",
    lastUpdated: "2024/08/20",
    publicationStatus: "公開中",
    history: [
      {
        version: "v2.1",
        uploadDate: "2024/08/20",
        fileName: "tos_v2.1.pdf",
        fileUrl: "/docs/tos_v2.1.pdf",
      },
      {
        version: "v2.0",
        uploadDate: "2024/05/10",
        fileName: "tos_v2.0.pdf",
        fileUrl: "/docs/tos_v2.0.pdf",
      },
      {
        version: "v1.0",
        uploadDate: "2023/01/15",
        fileName: "tos_v1.0.pdf",
        fileUrl: "/docs/tos_v1.0.pdf",
      },
    ],
  },
  {
    id: "privacy",
    name: "プライバシーポリシー",
    currentVersion: "v1.3",
    lastUpdated: "2024/07/15",
    publicationStatus: "公開中",
    history: [
      {
        version: "v1.3",
        uploadDate: "2024/07/15",
        fileName: "privacy_v1.3.pdf",
        fileUrl: "/docs/privacy_v1.3.pdf",
      },
      {
        version: "v1.2",
        uploadDate: "2024/04/01",
        fileName: "privacy_v1.2.pdf",
        fileUrl: "/docs/privacy_v1.2.pdf",
      },
      {
        version: "v1.1",
        uploadDate: "2023/06/20",
        fileName: "privacy_v1.1.pdf",
        fileUrl: "/docs/privacy_v1.1.pdf",
      },
      {
        version: "v1.0",
        uploadDate: "2023/01/15",
        fileName: "privacy_v1.0.pdf",
        fileUrl: "/docs/privacy_v1.0.pdf",
      },
    ],
  },
];

export const mockAdBanners: AdBanner[] = [
  {
    id: "BANNER001",
    position: 1,
    imageUrl: "https://via.placeholder.com/300x100.png?text=Banner+1",
    linkUrl: "https://example.com/product-a",
    displayPeriod: "2024/09/01 - 2024/10/31",
    publicationStatus: "公開中",
    clicks: 1234,
  },
  {
    id: "BANNER002",
    position: 2,
    imageUrl: "https://via.placeholder.com/300x100.png?text=Banner+2",
    linkUrl: "https://example.com/product-b",
    displayPeriod: "2024/09/15 - 2024/11/15",
    publicationStatus: "公開中",
    clicks: 876,
  },
  // Position 3 is empty, so no data for it here.
  // An inactive banner might look like this:
  {
    id: "BANNER003",
    position: 0, // 0 means it's not in an active slot
    imageUrl: "https://via.placeholder.com/300x100.png?text=Inactive+Banner",
    linkUrl: "https://example.com/product-c",
    displayPeriod: "2024/08/01 - 2024/08/31",
    publicationStatus: "非公開",
    clicks: 543,
  },
];
