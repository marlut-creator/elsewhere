import type React from "react";
import type { CauseGroup } from "../data/causeTaxonomy";

type IconProps = { className?: string };

function AnimalsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="7" cy="8" r="1.4" fill="currentColor" />
      <circle cx="12" cy="6.5" r="1.4" fill="currentColor" />
      <circle cx="17" cy="8" r="1.4" fill="currentColor" />
      <path
        d="M12 11c-2.8 0-5 1.6-5 3.8 0 2.2 2.2 3.7 5 3.7s5-1.5 5-3.7c0-2.2-2.2-3.8-5-3.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function EnvironmentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 4c-3 3-5 5.5-5 8.5a5 5 0 1 0 10 0c0-3-2-5.5-5-8.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 15v5" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function BasicNeedsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M5 10h14v9H5zM8 10V7h8v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PeopleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="9" cy="9" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 19c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="16.5" cy="8.5" r="1.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function HealthIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 20s-6.5-4.2-6.5-9.2A3.8 3.8 0 0 1 12 8.2a3.8 3.8 0 0 1 6.5 2.6C18.5 15.8 12 20 12 20Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OpportunityIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M6 6h12v14H6zM9 6V4h6v2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 11h6M9 14h4" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

const ICONS: Record<CauseGroup, (p: IconProps) => React.ReactElement> = {
  Animals: AnimalsIcon,
  Environment: EnvironmentIcon,
  "Basic Needs": BasicNeedsIcon,
  People: PeopleIcon,
  Health: HealthIcon,
  Opportunity: OpportunityIcon,
};

export function CauseGroupIcon({
  group,
  className,
}: {
  group: CauseGroup;
  className?: string;
}) {
  const Icon = ICONS[group];
  return <Icon className={className} />;
}
