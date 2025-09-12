// Defines the structure for a user object

export type User = {
  id: string;

  name: string;

  furigana: string;

  email: string;

  phone?: string;

  birthDate?: string;

  gender?: string;

  prefecture?: string;

  consultationContent?: string;

  preferredCallTime?: string;

  lineStatus?: "連携済み" | "未連携";

  affiliateSource?: string;

  lastLogin?: string;

  registrationDate: string;

  verificationStatus: "認証済み" | "未認証";

  partner: string;

  isNew: boolean;
};

// Defines the structure for a consultation/matching record

export type Consultation = {
  id: number;

  userId: string;

  matchingDate: string;

  fpType: "個人" | "法人";

  fpName: string;

  currentStatus: string;

  matchingType: string;

  notes: string;
};

// Defines the structure for a user review

export type Review = {
  id: number;

  userId: string;

  reviewDate: string;

  fpType: "個人" | "法人";

  fpName: string;

  statusAtReview: string;

  rating: number;

  reviewContent: string;
};

// Defines the structure for a gift record

export type Gift = {
  id: number;

  userId: string;

  applicationDate: string;

  giftType: string;

  status: string;

  processedDate?: string;
};

// Defines the structure for a Financial Planner (FP) object in the list view

export type FP = {
  id: string;

  name: string;

  email: string;

  fpType: "個人" | "法人";

  company: string;

  joinDate: string;

  reviewCount: number;

  averageRating: number;

  rank: number;

  monthlyAssignment: string;

  status: "活動中" | "停止中";

  role: "一般" | "管理者";
};

// Defines the detailed structure for a single FP

export type FPDetails = {
  fpId: string;

  name: string;

  nameKana: string;

  birthDate: string;

  gender: string;

  email: string;

  phone: string;

  company: string;

  position: string;

  workAddress: string;

  workAreas: string[];

  industryExperience: string;

  annualConsultations: string;

  contractCounts: string;

  awards: string;

  moneyStoryUrl: string;

  fpType: "個人" | "法人";

  status: "アクティブ" | "非アクティブ";

  lastLogin: string;

  qualifications: string[];

  specialties: string[];

  expertCustomerAges: string[];

  expertCustomerTypes: string[];

  preferredCustomerAges: string[];

  preferredCustomerTypes: string[];
};

// Defines the performance metrics for an FP

export type FPPerformance = {
  year: string;

  month: string;

  scheduledDeliveries: number;

  actualDeliveries: number;

  deliveryRate: number;

  phoneConnections: number;

  scheduleAdjustments: number;

  meetingsHeld: number;

  proposalsSent: number;

  contractsSigned: number;
};

// Defines the structure for a customer assigned to an FP

export type FPCustomer = {
  id: string;

  name: string;

  assignmentDate: string;

  status: string;

  lastUpdate: string;
};

// Defines the contract details for an FP

export type FPContract = {
  contractStart: string;

  contractEnd: string;

  renewalDate: string;

  planName: string;

  monthlyFee: number;

  contractStatus: "有効" | "無効";

  fpRank: number;
};

// Defines a payment record for an FP

export type FPPayment = {
  id: string;

  invoiceDate: string;

  period: string;

  feeType: string;

  amount: number;

  paymentStatus: "支払い済み" | "未払い";

  paymentDate: string;

  paymentMethod: "クレジットカード" | "銀行振込";

  notes: string;
};

// Defines a payment method for an FP

export type PaymentMethod = {
  id: string;

  registrationDate: string;

  paymentMethod: "クレジットカード" | "銀行振込";

  cardInfo: string;

  expirationDate: string;

  status: "有効" | "無効";

  isDefault: boolean;
};

// Defines the structure for a matching/allocation record

export type MatchingAllocation = {
  id: string;
  fpName: string;
  fpEmail: string;
  fpCompany: string;
  fpType: "個人" | "法人";
  allocationType: "基本割当" | "追加配信依頼";
  completedAllocations: number;
  totalAllocations: number;
  status: "未完了" | "完了";
  completionDate: string | null;
};

export type MatchingHistory = {
  id: string;
  allocationDateTime: string;
  fpName: string;
  fpType: "個人" | "法人";
  fpRole?: "管理者" | "スタッフ";
  endUserName: string;
  allocationType: "基本配信" | "追加配信依頼";
  allocationMethod: "自動マッチング" | "手動割当";
  currentStatus:
    | "新規"
    | "日程調整"
    | "面談実施"
    | "商品提案"
    | "契約"
    | "保留"
    | "失注";
  referringPartner: string;
};

// Defines an entry in the status history log
export type StatusHistoryEntry = {
  dateTime: string;
  status: string;
  updatedBy: string;
  notes: string;
};
// Defines the detailed structure for the matching history modal
export type MatchingHistoryDetails = {
  matchId: string;
  allocationDateTime: string;
  allocationMethod: string;
  matchingRules: string;
  endUserName: string;
  endUserAge: number;
  endUserPrefecture: string;
  consultationContent: string;
  referringPartner: string;
  registrationDate: string;
  fpName: string;
  fpType: string;
  fpSpecialties: string[];
  fpRank: number;
  fpLocation: string;
  statusHistory: StatusHistoryEntry[];
};

// Defines the structure for a Partner
export type Partner = {
  id: string;
  name: string;
  contactEmail: string;
  lpUrl: string;
  status: "アクティブ" | "停止中";
  lastUpdated: string;
};

export interface PartnerDetails {
  id: string;
  companyInfo: {
    name: string;
    representativeName: string;
    contactEmail: string;
    phoneNumber: string;
    address: string;
    contactPersonName: string;
    contactPersonDepartment: string;
  };
  contractInfo: {
    startDate: string;
    endDate: string;
    status: "有効" | "無効" | "期限切れ";
    referralFee: string;
  };
  usageStatus: {
    accountStatus: "アクティブ" | "停止中";
  };
  activeUrl: string;
  urlHistory: PartnerUrlHistory[];
}

export interface PartnerPerformanceSummary {
  totalLeads: number;
  accountsCreated: number;
  autoRejected: number;
  manualRejected: number;
}

export interface PartnerLeadHistory {
  receivedDateTime: string;
  userId: string;
  userName: string;
  age: number;
  prefecture: string;
  consultationContent: string;
  approvalStatus: "承認済み" | "拒否" | "保留中";
  currentConsultationStatus: string;
}

export interface PartnerUrlHistory {
  generationDate: string;
  url: string;
  status: "利用中" | "停止済み";
  leadsCount: number;
}

// Defines the structure for a review record in the review management list
export type ReviewRecord = {
  id: string;
  postedAt: string;
  reviewerName: string;
  reviewerType: "エンドユーザー" | "システム管理者";
  fpName: string;
  fpType: "個人FP" | "法人FP";
  rating: number;
  reviewContent: string;
  statusAtReview: "新規" | "日程調整" | "面談実施" | "商品提案" | "契約";
  consultationTopics?: string[];
};
