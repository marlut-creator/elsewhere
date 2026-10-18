import { useId, useLayoutEffect, useRef, useState } from "react";
import { IMPACT_BRAND_GROUPS } from "../data/editorialResearch";

type Connector = {
  d: string;
};

export default function OwnershipNetwork() {
  const [active, setActive] = useState(0);
  const labelId = useId();
  const parentsRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLParagraphElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [svgSize, setSvgSize] = useState({ width: 1, height: 1 });
  const current = IMPACT_BRAND_GROUPS[active];
  const split = Math.ceil(current.brands.length / 2);
  const leftBrands = current.brands.slice(0, split);
  const rightBrands = current.brands.slice(split);

  const selectParent = (index: number, focus = false) => {
    const next =
      (index + IMPACT_BRAND_GROUPS.length) % IMPACT_BRAND_GROUPS.length;
    setActive(next);
    if (focus) {
      const buttons = parentsRef.current?.querySelectorAll("button");
      buttons?.[next]?.focus();
    }
  };

  useLayoutEffect(() => {
    const diagram = diagramRef.current;
    const hub = hubRef.current;
    if (!diagram || !hub) return;

    const draw = () => {
      const box = diagram.getBoundingClientRect();
      const hubBox = hub.getBoundingClientRect();
      const hubCenterX = hubBox.left + hubBox.width / 2 - box.left;
      const hubCenterY = hubBox.top + hubBox.height / 2 - box.top;
      const hubLeft = hubBox.left - box.left;
      const hubRight = hubBox.right - box.left;
      const hubBottom = hubBox.bottom - box.top;
      const cards = itemRefs.current
        .slice(0, current.brands.length)
        .filter((el): el is HTMLLIElement => Boolean(el));
      const stacked =
        cards.length > 0 &&
        cards.every((el) => el.getBoundingClientRect().top >= hubBox.bottom - 8);

      const next = cards.map((el) => {
        const card = el.getBoundingClientRect();
        const cardCenterX = card.left + card.width / 2 - box.left;
        const cardCenterY = card.top + card.height / 2 - box.top;
        const isLeft = cardCenterX < hubCenterX;
        const x1 = isLeft ? hubLeft + (stacked ? 22 : 0) : hubRight - (stacked ? 22 : 0);
        const y1 = stacked ? hubBottom : hubCenterY;
        const x2 = isLeft ? card.right - box.left : card.left - box.left;
        const y2 = cardCenterY;
        const gap = Math.abs(x2 - x1);
        const curve = Math.max(10, Math.min(gap * 0.45, 36));
        const d = stacked
          ? `M${x1} ${y1} C ${x1} ${y2}, ${x2} ${y1}, ${x2} ${y2}`
          : isLeft
            ? `M${x1} ${y1} C ${x1 - curve} ${y1}, ${x2 + curve} ${y2}, ${x2} ${y2}`
            : `M${x1} ${y1} C ${x1 + curve} ${y1}, ${x2 - curve} ${y2}, ${x2} ${y2}`;
        return { d };
      });

      setConnectors(next);
      setSvgSize({ width: box.width, height: box.height });
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(diagram);
    window.addEventListener("resize", draw);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", draw);
    };
  }, [current.parent, current.brands]);

  const renderBrand = (brand: string, index: number) => (
    <li
      key={`${current.parent}-${brand}`}
      ref={(node) => {
        itemRefs.current[index] = node;
      }}
    >
      <span className="own-net-pip" aria-hidden="true" />
      <span className="own-net-brand">{brand}</span>
    </li>
  );

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

      <div className="own-net-tree" role="tabpanel">
        <div ref={diagramRef} className="own-net-diagram">
          <svg
            className="own-net-lines"
            viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
            width={svgSize.width}
            height={svgSize.height}
            aria-hidden="true"
          >
            {connectors.map((line, index) => (
              <path
                key={`${current.parent}-${index}`}
                d={line.d}
                fill="none"
                stroke="#6679cc"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            ))}
          </svg>
          <ul className="own-net-col own-net-col-left">
            {leftBrands.map((brand, index) => renderBrand(brand, index))}
          </ul>
          <p ref={hubRef} className="own-net-node">
            {current.parent}
          </p>
          <ul className="own-net-col own-net-col-right">
            {rightBrands.map((brand, index) =>
              renderBrand(brand, leftBrands.length + index),
            )}
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
