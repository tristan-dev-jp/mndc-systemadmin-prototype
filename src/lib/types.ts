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
