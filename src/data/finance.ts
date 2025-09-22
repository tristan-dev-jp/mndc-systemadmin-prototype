import type { PaymentURL, PaymentUrlDetails, SubscriptionPlan } from "@/lib/types";

export const mockPaymentUrls: PaymentURL[] = [
  {
    id: "URL001",
    urlName: "基本プラン初期決済用",
    url: "https://moneydotcom.jp/link/creditcard/basic-firsttime-payment",
    status: "利用中",
    creationDate: "2024/09/15",
    lastPaymentDate: "2024/09/18",
    paymentCount: 47,
  },
  {
    id: "URL002",
    urlName: "ビジネスプラン初期決済用",
    url: "https://moneydotcom.jp/link/creditcard/business-firsttime-payment",
    status: "利用中",
    creationDate: "2024/08/22",
    lastPaymentDate: "2024/09/17",
    paymentCount: 23,
  },
  {
    id: "URL003",
    urlName: "エンタープライズプラン初期決済用",
    url: "https://moneydotcom.jp/link/creditcard/enterprise-firsttime-payment",
    status: "利用中",
    creationDate: "2024/07/10",
    lastPaymentDate: "2024/09/16",
    paymentCount: 156,
  },
  {
    id: "URL004",
    urlName: "テスト決済URL",
    url: "https://moneydotcom.jp/link/creditcard/test-payment",
    status: "停止中",
    creationDate: "2024/06/05",
    lastPaymentDate: "2024/06/08",
    paymentCount: 3,
  },
  {
    id: "URL005",
    urlName: "特別キャンペーン決済",
    url: "https://moneydotcom.jp/link/creditcard/special-campaign",
    status: "停止中",
    creationDate: "2024/05/20",
    lastPaymentDate: "2024/05/31",
    paymentCount: 89,
  },
  {
    id: "URL006",
    urlName: "新規顧客向け決済URL",
    url: "https://moneydotcom.jp/link/creditcard/new-customer",
    status: "利用中",
    creationDate: "2024/04/15",
    lastPaymentDate: "2024/09/18",
    paymentCount: 12,
  },
];

export const mockPaymentUrlDetails: PaymentUrlDetails = {
  id: "URL001",
  basicInfo: {
    urlName: "基本プラン初期決済用",
    url: "https://moneydotcom.jp/link/creditcard/basic-firsttime-payment",
    description:
      "新規顧客向けの基本プラン（月額）の初回決済用のURLです。顧客がこのURLから決済を完了すると、自動的にサブスクリプションが開始されます。",
    status: "利用中",
    createdDate: "2024-09-15T10:30:00Z",
    lastUpdated: "2024-09-20T14:00:00Z",
  },
  paymentSettings: {
    amount: 4980,
    paymentMethods: ["Credit card", "Debit card"],
  },
  customFields: [
    {
      id: "field1",
      type: "Email",
      label: "連絡先メールアドレス",
      required: true,
      value: "customer@example.com",
    },
    {
      id: "field2",
      type: "Name",
      label: "氏名",
      required: true,
      value: "田中 太郎",
    },
    {
      id: "field3",
      type: "Address",
      label: "住所",
      required: false,
      value: "住所を記入してください。",
    },
  ],
  usageStatistics: {
    totalPaymentCount: 47,
    lastPaymentDate: "2024-09-18T18:45:00Z",
  },
};

export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "plan_001",
    planName: "基本プラン",
    price: 45000,
    billingCycle: "月間請求",
    status: "有効",
    subscriberCount: 64,
    creationDate: "2025/09/22",
  },
  {
    id: "plan_002",
    planName: "ビシネズプラン",
    price: 200000,
    billingCycle: "月間請求",
    status: "有効",
    subscriberCount: 87,
    creationDate: "2025/09/22",
  },
  {
    id: "plan_003",
    planName: "エンタープライズプラン",
    price: 750000,
    billingCycle: "月間請求",
    status: "有効",
    subscriberCount: 8,
    creationDate: "2025/09/22",
  },
];