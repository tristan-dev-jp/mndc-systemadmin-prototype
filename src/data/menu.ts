import {
  BarChart3,
  Users,
  User,
  UserCheck,
  Handshake,
  Star,
  FileText,
  CreditCard,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type MenuItem = {
  id: string;
  name: string;
  icon: LucideIcon;
  message: string;
};

export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    name: "ダッシュボード",
    icon: BarChart3,
    message: "ダッシュボード機能は準備中です",
  },
  {
    id: "users",
    name: "ユーザー管理",
    icon: Users,
    message: "ユーザー管理機能は準備中です",
  },
  { id: "fp", name: "FP管理", icon: User, message: "FP管理機能は準備中です" },
  {
    id: "matching",
    name: "マッチング・割当管理",
    icon: UserCheck,
    message: "マッチング・割当管理機能は準備中です",
  },
  {
    id: "partners",
    name: "パートナー管理",
    icon: Handshake,
    message: "パートナー管理機能は準備中です",
  },
  {
    id: "reviews",
    name: "レビュー管理",
    icon: Star,
    message: "レビュー管理機能は準備中です",
  },
  {
    id: "content",
    name: "コンテンツ管理",
    icon: FileText,
    message: "コンテンツ管理機能は準備中です",
  },
  {
    id: "finance",
    name: "財務管理",
    icon: CreditCard,
    message: "財務管理機能は準備中です",
  },
  {
    id: "system",
    name: "システム設定",
    icon: Settings,
    message: "システム設定機能は準備中です",
  },
];
