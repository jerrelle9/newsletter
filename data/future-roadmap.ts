import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, Network, Eye, Code2,
  UserCheck, ScanFace, Smartphone, FileStack,
  Zap, Globe, CreditCard, ArrowLeftRight,
  RefreshCw, BrainCircuit, Store,
  MessageSquare, Star, HeadphonesIcon, Palette,
} from "lucide-react";

export type FeatureStatus = "in-progress" | "coming-soon" | "planned";

export interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  status: FeatureStatus;
}

export interface FeatureGroup {
  id: string;
  name: string;
  tagline: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  cards: FeatureCard[];
}

export const STATUS_CONFIG: Record<FeatureStatus, { label: string; color: string; bg: string }> = {
  "in-progress": {
    label: "In Progress",
    color: "var(--green)",
    bg: "rgba(6,214,160,0.1)",
  },
  "coming-soon": {
    label: "Coming Soon",
    color: "var(--blue-lt)",
    bg: "rgba(0,180,230,0.1)",
  },
  planned: {
    label: "Planned",
    color: "var(--gold)",
    bg: "rgba(245,166,35,0.1)",
  },
};

export const featureGroups: FeatureGroup[] = [
  {
    id: "engineering-platforms",
    name: "Engineering Platforms",
    tagline: "The foundation that everything else runs on.",
    accentColor: "var(--orange)",
    accentBg: "rgba(255,107,53,0.06)",
    accentBorder: "rgba(255,107,53,0.18)",
    cards: [
      {
        icon: LayoutDashboard,
        title: "Unified DevOps Dashboard",
        description: "A single pane of glass for pipeline health, deployment frequency, and release readiness across all squads.",
        status: "in-progress",
      },
      {
        icon: Network,
        title: "API Gateway Enhancements",
        description: "Centralised rate-limiting, contract governance, and real-time observability for all downstream integrations.",
        status: "in-progress",
      },
      {
        icon: Eye,
        title: "Microservices Monitoring Suite",
        description: "Distributed tracing, error-budget tracking, and automated alerting across the Group's microservice landscape.",
        status: "coming-soon",
      },
      {
        icon: Code2,
        title: "Internal Developer Portal",
        description: "Self-service catalogue of APIs, runbooks, onboarding guides, and environment provisioning tools for engineering teams.",
        status: "planned",
      },
    ],
  },
  {
    id: "digital-onboarding",
    name: "Digital Onboarding",
    tagline: "Making first impressions seamless across every channel.",
    accentColor: "var(--purple)",
    accentBg: "rgba(139,92,246,0.06)",
    accentBorder: "rgba(139,92,246,0.18)",
    cards: [
      {
        icon: UserCheck,
        title: "Seamless Customer Registration",
        description: "End-to-end digital account opening with guided steps, real-time validation, and cross-market support.",
        status: "in-progress",
      },
      {
        icon: ScanFace,
        title: "AI-Powered KYC Verification",
        description: "Automated identity checks using biometric liveness detection and document intelligence to reduce manual review time.",
        status: "coming-soon",
      },
      {
        icon: Smartphone,
        title: "Mobile-First Account Setup",
        description: "Fully responsive onboarding flow optimised for low-bandwidth environments across all Republic territories.",
        status: "coming-soon",
      },
      {
        icon: FileStack,
        title: "Digital Document Management",
        description: "Secure upload, classification, and retrieval of customer documents with audit trails and retention policies.",
        status: "planned",
      },
    ],
  },
  {
    id: "payments-innovation",
    name: "Payments Innovation",
    tagline: "Faster, smarter money movement across the Group.",
    accentColor: "var(--gold)",
    accentBg: "rgba(245,166,35,0.06)",
    accentBorder: "rgba(245,166,35,0.18)",
    cards: [
      {
        icon: Zap,
        title: "Instant Payment System Expansion",
        description: "Extending IPS reach to additional territories with sub-second settlement and Group-wide reconciliation.",
        status: "in-progress",
      },
      {
        icon: Globe,
        title: "Cross-Border Payment Rails",
        description: "Low-cost FX corridors connecting Republic markets via modern payment infrastructure and partner networks.",
        status: "coming-soon",
      },
      {
        icon: CreditCard,
        title: "Card Lifecycle Management",
        description: "Self-service card controls, virtual card issuance, and real-time spend analytics for customers and back-office.",
        status: "planned",
      },
      {
        icon: ArrowLeftRight,
        title: "Request-to-Pay Framework",
        description: "Structured payment requests enabling recurring billing, invoice settlement, and B2B payment workflows.",
        status: "planned",
      },
    ],
  },
  {
    id: "loan-management-platform",
    name: "Loan Management Platform",
    tagline: "Building the Group's end-to-end digital lending capability.",
    accentColor: "var(--green)",
    accentBg: "rgba(6,214,160,0.06)",
    accentBorder: "rgba(6,214,160,0.18)",
    cards: [
      {
        icon: RefreshCw,
        title: "Collections & Recovery Module",
        description: "Full automation of delinquency management, configurable collection strategies, performance dashboards, and audit-ready correspondence.",
        status: "coming-soon",
      },
      {
        icon: BrainCircuit,
        title: "GiniMachine AI Credit Scoring",
        description: "Full integration for application, internal risk, and collections scoring via no-code, reusable AI models — replacing the legacy OMDM system.",
        status: "coming-soon",
      },
      {
        icon: Store,
        title: "Agent & Partner Portal",
        description: "White-label portal for brokers and merchant partners enabling lead creation, pre-approved offers, and commission tracking.",
        status: "planned",
      },
      {
        icon: Globe,
        title: "Multi-Country Rollout",
        description: "Group-wide expansion of the single global instance across all Republic jurisdictions, leveraging the multi-country configuration architecture.",
        status: "planned",
      },
    ],
  },
  {
    id: "customer-experience",
    name: "Customer Experience",
    tagline: "Every touchpoint, elevated.",
    accentColor: "var(--teal)",
    accentBg: "rgba(0,180,216,0.06)",
    accentBorder: "rgba(0,180,216,0.18)",
    cards: [
      {
        icon: MessageSquare,
        title: "Conversational Banking Assistant",
        description: "AI-powered chat and voice interface enabling customers to manage accounts, get advice, and resolve issues 24/7.",
        status: "coming-soon",
      },
      {
        icon: Star,
        title: "Personalised Product Recommendations",
        description: "Contextual offers and product nudges surfaced in-app based on customer behaviour and life-stage signals.",
        status: "planned",
      },
      {
        icon: HeadphonesIcon,
        title: "Omni-Channel Support Hub",
        description: "Unified agent desktop giving support staff a 360° customer view across all digital and branch interactions.",
        status: "planned",
      },
      {
        icon: Palette,
        title: "Accessibility & Inclusivity Suite",
        description: "WCAG 2.2 AA compliance tooling, high-contrast modes, and screen-reader-first builds across all customer surfaces.",
        status: "planned",
      },
    ],
  },
];
