import type { MatchingAllocation } from "@/lib/types";
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
