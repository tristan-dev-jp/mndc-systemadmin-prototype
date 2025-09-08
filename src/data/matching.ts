import type {
  MatchingAllocation,
  MatchingHistory,
  MatchingHistoryDetails,
} from "@/lib/types";
import { mockFPs } from "./fp";

// Generate mock data for matching allocations based on the existing FP data
export const mockMatchingAllocations: MatchingAllocation[] = mockFPs
  .filter((fp) => fp.status === "活動中")
  .map((fp, index) => {
    // 1. Use the total allocation number from the existing FP data.
    const [, total] = fp.monthlyAssignment.split("/").map(Number);
    const totalAllocations = total;

    // 2. Automatically generate a realistic number for completed allocations.
    let completedAllocations: number;

    // For variety in the prototype, we'll make some FPs fully completed
    // and others partially completed.
    if (index % 4 === 0) {
      // Every 4th FP is fully completed.
      completedAllocations = totalAllocations;
    } else {
      // For the others, generate a random completion between 50% and 95%.
      const completionRatio = 0.5 + Math.random() * 0.45;
      completedAllocations = Math.floor(totalAllocations * completionRatio);
    }

    const isCompleted = completedAllocations >= totalAllocations;
    const isAdditional = index % 5 === 0; // Make every 5th FP an "additional" type for variety

    return {
      id: `ALLOC${String(index + 1).padStart(3, "0")}`,
      fpName: fp.name,
      fpEmail: fp.email,
      fpCompany: fp.company,
      fpType: fp.fpType,
      allocationType: isAdditional ? "追加配信依頼" : "基本割当",
      completedAllocations: completedAllocations,
      totalAllocations: totalAllocations,
      status: isCompleted ? "完了" : "未完了",
      completionDate: isCompleted
        ? // Generate a realistic date in the current month for completed items
          `2025-09-${String(5 - (index % 5)).padStart(2, "0")}`
        : null,
    };
  });
// STEP 2: Create mock data for the "Matching/Allocation History" table
export const mockMatchingHistory: MatchingHistory[] = [
  {
    id: "HIST001",
    allocationDateTime: "2024/09/15 14:30",
    fpName: "田中太郎",
    fpType: "個人",
    endUserName: "佐藤花子",
    allocationType: "基本配信",
    allocationMethod: "自動マッチング",
    currentStatus: "面談実施",
    referringPartner: "パートナーA",
  },
  {
    id: "HIST002",
    allocationDateTime: "2024/09/15 09:45",
    fpName: "山田花子", // from "山田株式会社" in sample, using existing FP data
    fpType: "法人",
    fpRole: "管理者",
    endUserName: "鈴木一郎",
    allocationType: "追加配信依頼",
    allocationMethod: "手動割当",
    currentStatus: "日程調整",
    referringPartner: "パートナーB",
  },
  {
    id: "HIST003",
    allocationDateTime: "2024/09/14 16:20",
    fpName: "高橋一郎", // from "高橋美咲" in sample, using existing FP data
    fpType: "個人",
    endUserName: "田村恵子",
    allocationType: "基本配信",
    allocationMethod: "自動マッチング",
    currentStatus: "契約",
    referringPartner: "パートナーC",
  },
  {
    id: "HIST004",
    allocationDateTime: "2024/09/14 11:15",
    fpName: "伊藤沙織", // from "伊藤次郎" in sample, using existing FP data
    fpType: "法人",
    fpRole: "スタッフ", // Assuming '一般' maps to 'スタッフ'
    endUserName: "中村健太",
    allocationType: "基本配信",
    allocationMethod: "自動マッチング",
    currentStatus: "商品提案",
    referringPartner: "パートナーA",
  },
  {
    id: "HIST005",
    allocationDateTime: "2024/09/13 13:50",
    fpName: "渡辺大輔", // from "渡辺保険" in sample, using existing FP data
    fpType: "個人",
    endUserName: "小林さくら",
    allocationType: "追加配信依頼",
    allocationMethod: "自動マッチング",
    currentStatus: "新規",
    referringPartner: "パートナーD",
  },
  {
    id: "HIST006",
    allocationDateTime: "2024/09/13 10:25",
    fpName: "松本翔太", // from "松本和子" in sample, using existing FP data
    fpType: "個人",
    endUserName: "森田拓海",
    allocationType: "基本配信",
    allocationMethod: "手動割当",
    currentStatus: "失注",
    referringPartner: "パートナーB",
  },
  {
    id: "HIST007",
    allocationDateTime: "2024/09/12 15:40",
    fpName: "安藤裕子", // from "加藤グループ" in sample, using existing FP data
    fpType: "法人",
    fpRole: "管理者",
    endUserName: "清水美香",
    allocationType: "基本配信",
    allocationMethod: "自動マッチング",
    currentStatus: "面談実施",
    referringPartner: "パートナーE",
  },
  {
    id: "HIST008",
    allocationDateTime: "2024/09/12 08:30",
    fpName: "佐々木恵", // Assuming this is a new FP not in the main list
    fpType: "個人",
    endUserName: "岡田直樹",
    allocationType: "追加配信依頼",
    allocationMethod: "手動割当",
    currentStatus: "保留",
    referringPartner: "パートナーA",
  },
  {
    id: "HIST009",
    allocationDateTime: "2024/09/11 17:10",
    fpName: "小林由美", // from "木村ファイナンス", using existing FP data
    fpType: "法人",
    fpRole: "スタッフ",
    endUserName: "井上千春",
    allocationType: "基本配信",
    allocationMethod: "自動マッチング",
    currentStatus: "日程調整",
    referringPartner: "アフィリエイトパートナーA",
  },
  {
    id: "HIST010",
    allocationDateTime: "2024/09/11 12:05",
    fpName: "石井美穂", // from "石川雅人", using existing FP data
    fpType: "法人",
    endUserName: "坂本真理",
    allocationType: "基本配信",
    allocationMethod: "自動マッチング",
    currentStatus: "契約",
    referringPartner: "パートナーC",
  },
];

// Mock data for the detailed view modal in the Matching History tab.
// The key corresponds to the `id` from `mockMatchingHistory`.
export const mockMatchingHistoryDetails: Record<
  string,
  MatchingHistoryDetails
> = {
  HIST001: {
    matchId: "MATCH_20240915_001",
    allocationDateTime: "2024年9月15日 14:30",
    allocationMethod: "自動マッチング",
    matchingRules: "地域マッチング（東京都）、専門分野マッチング（生命保険）",
    endUserName: "佐藤花子",
    endUserAge: 35,
    endUserPrefecture: "東京都",
    consultationContent: "生命保険の見直し",
    referringPartner: "パートナーA",
    registrationDate: "2024年9月15日",
    fpName: "田中太郎",
    fpType: "個人FP",
    fpSpecialties: ["生命保険", "医療保険"],
    fpRank: 4,
    fpLocation: "東京都",
    statusHistory: [
      {
        dateTime: "2024/09/15 14:30",
        status: "新規",
        updatedBy: "システム",
        notes: "自動割当完了",
      },
      {
        dateTime: "2024/09/16 10:15",
        status: "日程調整",
        updatedBy: "田中太郎",
        notes: "初回連絡完了",
      },
      {
        dateTime: "2024/09/18 14:00",
        status: "面談実施",
        updatedBy: "田中太郎",
        notes: "オンライン面談実施",
      },
    ],
  },
  // We can add more details for other history items here...
  // For the prototype, one detailed example is often sufficient.
};
