import {
  ILLUSTRATIONS,
  type IllustrationName,
} from "../data/siteImages";

export default function EditorialIllustration({
  name,
  className,
  decorative = false,
}: {
  name: IllustrationName;
  className?: string;
  decorative?: boolean;
}) {
  const asset = ILLUSTRATIONS[name];
  return (
    <img
      className={className}
      src={asset.src}
      alt={decorative ? "" : asset.alt}
      {...(decorative ? { "aria-hidden": true } : {})}
    />
  );
}
