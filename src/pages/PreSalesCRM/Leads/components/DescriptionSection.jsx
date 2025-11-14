import { useState } from "react";

export default function DescriptionSection({ data, isEditMode = false, onChange }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="form-section">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="section-header"
      >
        <h3 className="section-title">Description Information</h3>
        <svg
          className={`chevron-icon ${isOpen ? "rotated" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="section-content">
          <div className="form-field-full">
            <label className="field-label">Remarks</label>
            {isEditMode ? (
              <textarea
                className="field-textarea"
                rows={4}
                value={data?.remarks || ""}
                onChange={(e) => onChange("remarks", e.target.value)}
                placeholder="Enter remarks"
              />
            ) : (
              <div className="field-value-text">
                {data?.remarks || "No remarks added"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}