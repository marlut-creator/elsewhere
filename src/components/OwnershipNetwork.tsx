import { useId, useRef, useState } from "react";
import { IMPACT_BRAND_GROUPS } from "../data/editorialResearch";

export default function OwnershipNetwork() {
  const [active, setActive] = useState(0);
  const labelId = useId();
  const parentsRef = useRef<HTMLDivElement>(null);
  const current = IMPACT_BRAND_GROUPS[active];
  const rows = Math.ceil(current.brands.length / 2);
  const svgHeight = Math.max(rows * 56, 160);

  const selectParent = (index: number, focus = false) => {
    const next =
      (index + IMPACT_BRAND_GROUPS.length) % IMPACT_BRAND_GROUPS.length;
    setActive(next);
    if (focus) {
      const buttons = parentsRef.current?.querySelectorAll("button");
      buttons?.[next]?.focus();
    }
  };

  return (
    <div className="own-net">
      <div
        ref={parentsRef}
        className="own-net-parents"
        role="tablist"
        aria-labelledby={labelId}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            selectParent(active + 1, true);
          }
          if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            selectParent(active - 1, true);
          }
        }}
      >
        <p id={labelId} className="own-net-kicker">
          Select a parent company
        </p>
        {IMPACT_BRAND_GROUPS.map((group, index) => (
          <button
            key={group.parent}
            type="button"
            role="tab"
            aria-selected={index === active}
            tabIndex={index === active ? 0 : -1}
            className={`own-net-parent${index === active ? " is-active" : ""}`}
            onClick={() => selectParent(index)}
          >
            {group.parent}
          </button>
        ))}
      </div>

      <div className="own-net-stage" role="tabpanel">
        <p className="own-net-hub">{current.parent}</p>
        <div className="own-net-map">
          <svg
            className="own-net-lines"
            viewBox={`0 0 72 ${svgHeight}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {Array.from({ length: rows }, (_, index) => {
              const mid = svgHeight / 2;
              const y = 28 + index * (svgHeight / rows);
              return (
                <path
                  key={`${current.parent}-row-${index}`}
                  d={`M8 ${mid} C 36 ${mid}, 36 ${y}, 68 ${y}`}
                  fill="none"
                  stroke="#6679cc"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
          <ul key={current.parent} className="own-net-brands">
            {current.brands.map((brand) => (
              <li key={brand}>
                <span className="own-net-pip" aria-hidden="true" />
                <span className="own-net-brand">{brand}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="own-net-source">
        Named on{" "}
        <a href={current.sourceUrl}>{current.parent}&apos;s brand directory</a>.
        A selected example, not a complete portfolio.
      </p>
    </div>
  );
}
