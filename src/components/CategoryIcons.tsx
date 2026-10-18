import type React from "react";
import type { BrowseCategorySlug } from "../data/browseCategories";

type IconProps = { className?: string };

function CoffeeTeaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M5 8h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M16 10h2a2 2 0 0 1 0 4h-2M8 5c0-1 .8-2 2-2M14 5c0-1 .8-2 2-2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function PersonalCareIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M8 4h8l1 14H7L8 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 8h4" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function HouseholdIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M4 10 12 4l8 6v9H4v-9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClothingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M8 6 12 3l4 3 2 3-2 11H8L6 9l2-3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PetsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
      <circle cx="6" cy="13" r="1.5" fill="currentColor" />
      <circle cx="18" cy="13" r="1.5" fill="currentColor" />
      <path
        d="M12 14c-2.5 0-4 1.5-4 3.5 0 2 1.5 3.5 4 3.5s4-1.5 4-3.5c0-2-1.5-3.5-4-3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function FoodIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M6 4v8M8 4v6M10 4v8M14 4c2 0 3 1.5 3 4v8H11V8c0-2.5 1-4 3-4Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function EverydayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect
        x="4"
        y="6"
        width="16"
        height="12"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M4 10h16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const ICONS: Record<
  BrowseCategorySlug,
  (p: IconProps) => React.ReactElement
> = {
  everyday: EverydayIcon,
  "coffee-tea": CoffeeTeaIcon,
  "personal-care": PersonalCareIcon,
  household: HouseholdIcon,
  clothing: ClothingIcon,
  pets: PetsIcon,
  "food-snacks": FoodIcon,
};

export function CategoryIcon({
  slug,
  className,
}: {
  slug: BrowseCategorySlug;
  className?: string;
}) {
  const Icon = ICONS[slug] ?? EverydayIcon;
  return <Icon className={className} />;
}
