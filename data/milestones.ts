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
  // {
  //   id: "m-01",
  //   quarter: "Q3 2025",
  //   category: "engineering-platforms",
  //   icon: "Server",
  //   title: "Engineering Platform Stabilisation Completed",
  //   description:
  //     "Core cloud infrastructure and shared DevSecOps toolchain formalised across all platform teams, establishing the foundational layer for accelerated product delivery.",
  // },
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
    id: "m-02b",
    quarter: "Q3 2025",
    category: "digital-products",
    icon: "ClipboardList",
    title: "LMS Feature List & HES LoanBox Integration Scope Defined",
    description:
      "Comprehensive feature list and integration scope finalised for LMS vendor HES LoanBox, covering consumer lending MVP, borrower portal, back office, product engine, calculation engine, API framework, user role security, and analytics.",
  },
  {
    id: "m-02c",
    quarter: "Q3 2025",
    category: "digital-products",
    icon: "Network",
    title: "Loan Management Platform Architecture Design Completed",
    description:
      "Architecture design finalised for a single global instance, multi-country configuration supporting CIF as party master, CRM integration via Event Bus, and Phoenix CBS integration.",
  },
  {
    id: "m-02d",
    quarter: "Q3 2025",
    category: "digital-products",
    icon: "Cpu",
    title: "Automated Credit Scoring Requirements Completed",
    description:
      "GiniMachine selected as a future-proof replacement for the obsolete OMDM system, with full requirements documentation and a proof-of-concept plan defined for AI-driven credit scoring.",
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
    id: "m-04b",
    quarter: "Q4 2025",
    category: "digital-products",
    icon: "ShieldCheck",
    title: "GIGR#12_25 Approved - LMS OPEX Budget Secured",
    description:
      "GIGR#12_25 formally approved by management, securing the OPEX budget for the full Loan Management Solution (HES LoanBox) and enabling the project to progress beyond the planning and readiness phase.",
  },
  {
    id: "m-04c",
    quarter: "Q4 2025",
    category: "digital-products",
    icon: "FileCheck",
    title: "Consumer Lending MVP Commercial Proposal Submitted",
    description:
      "Commercial proposal for the Consumer Lending MVP officially submitted to management, covering the out-of-the-box digital lending solution with white-label landing page, borrower portal, and back-office operations.",
  },
  {
    id: "m-04d",
    quarter: "Q4 2025",
    category: "digital-products",
    icon: "GitBranch",
    title: "User Journey Mapping & Design Artifacts Finalised",
    description:
      "Full user journey mapping, requirements analysis, and design artifacts completed for the Trinidad simple loan, Collections and Services (SSD), and BVI digital mortgage workstreams.",
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
