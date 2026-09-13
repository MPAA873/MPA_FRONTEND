import {
  Send,
  UserCheck,
  Eye,
  AlertTriangle,
  RefreshCw,
  Clock,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  BookOpenCheck,
  XCircle,
} from "lucide-react";
export const STATUS_STYLES = {
  "Submitted": {
    icon: Send,
    accent: "#10B981",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-[#10B981]",
  },
  "Editor Assigned": {
    icon: UserCheck,
    accent: "#10B981",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-[#10B981]",
  },
  "Under Review": {
    icon: Eye,
    accent: "#2563EB",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  "Revision Requested": {
    icon: AlertTriangle,
    accent: "#D97706",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  "Revision Submitted": {
    icon: RefreshCw,
    accent: "#2563EB",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  "Final Review in Progress": {
    icon: Clock,
    accent: "#7C3AED",
    bg: "bg-violet-50",
    text: "text-violet-700",
    dot: "bg-violet-500",
  },
  "Approved": {
    icon: CheckCircle2,
    accent: "#10B981",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-[#10B981]",
  },
  "Accepted": {
    icon: CheckCircle2,
    accent: "#10B981",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-[#10B981]",
  },
  "Final Proofing": {
    icon: FileCheck2,
    accent: "#7C3AED",
    bg: "bg-violet-50",
    text: "text-violet-700",
    dot: "bg-violet-500",
  },
  "Proof Approved": {
    icon: ClipboardCheck,
    accent: "#7C3AED",
    bg: "bg-violet-50",
    text: "text-violet-700",
    dot: "bg-violet-500",
  },
  "Published": {
    icon: BookOpenCheck,
    accent: "#10B981",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-[#10B981]",
  },
  "Not Accepted": {
    icon: XCircle,
    accent: "#DC2626",
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
  },
};

export const DEFAULT_STATUS_STYLE = {
  icon: Clock,
  accent: "#5D3A1A",
  bg: "bg-orange-50",
  text: "text-[#5D3A1A]",
  dot: "bg-[#5D3A1A]",
};

export const getStatusStyle = (label) => STATUS_STYLES[label] || DEFAULT_STATUS_STYLE;

// Fixed 7-step display labels for the stepper (progress.step from the API
// tells us which of these the paper has reached).
export const STEPPER_LABELS = [
  "Submitted",
  "Editor Assigned",
  "Under Review",
  "Final Review",
  "Decision",
  "Final Proofing",
  "Published",
];

export const formatDate = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatDateTime = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};