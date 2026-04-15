export type MilestoneCategory =
  | "engineering-platforms"
  | "engineering-products"
  | "digital-products"
  | "digital-banking"
  | "division-wide";

export interface Milestone {
  id: string;
  quarter: string;
  title: string;
  description: string;
  category: MilestoneCategory;
  icon: string; // lucide icon name — resolved in component
}

export const milestones: Milestone[] = [
  {
    id: "m-01",
    quarter: "Q3 2025",
    category: "engineering-platforms",
    icon: "Server",
    title: "Engineering Platform Stabilisation Completed",
    description:
      "Core cloud infrastructure and shared DevSecOps toolchain formalised across all platform teams, establishing the foundational layer for accelerated product delivery.",
  },
  {
    id: "m-02",
    quarter: "Q3 2025",
    category: "digital-products",
    icon: "Smartphone",
    title: "SuperApp Beta Released to Internal Testers",
    description:
      "First internal release of the Group's unified mobile SuperApp, incorporating utility payments, push notifications, and passcode management for controlled feedback.",
  },
  {
    id: "m-03",
    quarter: "Q4 2025",
    category: "digital-banking",
    icon: "Globe",
    title: "GDO Expanded Across TT Network",
    description:
      "GDO-enabled cautions made available to the full Trinidad & Tobago network; real-time account-opening dashboard activated across territories.",
  },
  {
    id: "m-04",
    quarter: "Q4 2025",
    category: "engineering-products",
    icon: "DatabaseZap",
    title: "CIF 1.1.2 Released to CRM Pre-Production",
    description:
      "Customer Information Framework delivered its 1.1.2 release into CRM pre-production and UAT, with parallel testing preparations running across additional territories.",
  },
  {
    id: "m-05",
    quarter: "Q1 2026",
    category: "division-wide",
    icon: "Users",
    title: "GDTD Division Headcount Reaches 58+ Staff",
    description:
      "The Division crossed a significant staffing milestone, cementing capacity across Engineering Platforms, Digital Platforms, Architecture, and Banking Delivery.",
  },
  {
    id: "m-06",
    quarter: "Q1 2026",
    category: "digital-banking",
    icon: "Building2",
    title: "Branch Digitalisation MVP Onboarding Live",
    description:
      "Branch Digitalisation reached MVP onboarding milestones, enabling front-line staff to initiate and complete digital customer journeys inside the branch footprint.",
  },
  {
    id: "m-07",
    quarter: "Q2 2026",
    category: "engineering-products",
    icon: "TrendingUp",
    title: "Wealth Dashboard & Trading Flows Enter Testing",
    description:
      "Wealth management dashboard and structured trading flows progressed into testing readiness, targeting launch for the Group's high-value customer segment.",
  },
  {
    id: "m-08",
    quarter: "Q2 2026",
    category: "engineering-platforms",
    icon: "Network",
    title: "Enterprise API Gateway Rolled Out Division-Wide",
    description:
      "Shared API gateway standardised across all product squads, providing centralised rate-limiting, observability, and contract governance for all downstream integrations.",
  },
];
