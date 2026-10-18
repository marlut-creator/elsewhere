import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { CauseGroup } from "../data/causeTaxonomy";
import { catalogCauseSelections } from "../data/products";

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="cause-picker-chevron">
      <path
        d="m4 6 4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

type PanelView = { kind: "main" } | { kind: "group"; group: CauseGroup };

type CausePickerPopoverProps = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  active: boolean;
  label: string;
  causeFilter: string | null;
  onSelectCause: (cause: string | null) => void;
};

export default function CausePickerPopover({
  isOpen,
  onToggle,
  onClose,
  active,
  label,
  causeFilter,
  onSelectCause,
}: CausePickerPopoverProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelView, setPanelView] = useState<PanelView>({ kind: "main" });
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});
  const [openUpward, setOpenUpward] = useState(false);
  const causeCatalog = catalogCauseSelections();

  useEffect(() => {
    if (!isOpen) {
      setPanelView({ kind: "main" });
    }
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen || !wrapRef.current || !panelRef.current) return;

    const updatePosition = () => {
      const trigger = wrapRef.current!.getBoundingClientRect();
      const margin = 12;
      const viewportH = window.innerHeight;
      const spaceBelow = viewportH - trigger.bottom - margin;
      const spaceAbove = trigger.top - margin;
      const preferUp = spaceBelow < 240 && spaceAbove > spaceBelow;
      const available = preferUp ? spaceAbove : spaceBelow;
      const maxHeight = Math.min(420, Math.max(160, available));

      setOpenUpward(preferUp);
      setPanelStyle({ maxHeight });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, panelView]);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [isOpen, onClose]);

  const pick = (cause: string | null) => {
    onSelectCause(cause);
    onClose();
  };

  const isSelected = (value: string) => causeFilter === value;

  return (
    <div className="filter-wrap cause-picker-wrap" ref={wrapRef}>
      <button
        type="button"
        className={active ? "active" : undefined}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={onToggle}
      >
        {label}
        <Chevron />
      </button>
      {isOpen ? (
        <div
          ref={panelRef}
          className={`cause-picker-panel${openUpward ? " cause-picker-panel-up" : ""}`}
          style={panelStyle}
          role="dialog"
          aria-label="Choose a cause"
        >
          {panelView.kind === "main" ? (
            <>
              <p className="cause-picker-heading">What do you care about?</p>
              <button
                type="button"
                className={`cause-picker-option${causeFilter === null ? " selected" : ""}`}
                onClick={() => pick(null)}
              >
                All causes
              </button>
              <div className="cause-picker-popular" role="listbox">
                {causeCatalog.prominent.map((cause) => (
                  <button
                    key={cause}
                    type="button"
                    className={`cause-picker-chip${isSelected(cause) ? " selected" : ""}`}
                    onClick={() => pick(cause)}
                  >
                    {cause}
                  </button>
                ))}
              </div>
              <p className="cause-picker-subheading">Browse all causes</p>
              <div className="cause-picker-groups">
                {causeCatalog.parentGroups.map((group) => (
                  <button
                    key={group}
                    type="button"
                    className="cause-picker-group-row"
                    onClick={() =>
                      setPanelView({ kind: "group", group: group as CauseGroup })
                    }
                  >
                    <span>{group}</span>
                    <Chevron />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                className="cause-picker-back"
                onClick={() => setPanelView({ kind: "main" })}
              >
                ← Back
              </button>
              <p className="cause-picker-heading">{panelView.group}</p>
              <button
                type="button"
                className={`cause-picker-option${isSelected(panelView.group) ? " selected" : ""}`}
                onClick={() => pick(panelView.group)}
              >
                All {panelView.group}
              </button>
              {causeCatalog.grouped[panelView.group]?.map((cause) => (
                <button
                  key={cause}
                  type="button"
                  className={`cause-picker-option${isSelected(cause) ? " selected" : ""}`}
                  onClick={() => pick(cause)}
                >
                  {cause}
                </button>
              ))}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
