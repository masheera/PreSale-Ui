import { useState } from "react";

export default function AddressSection({ data, isEditMode = false, onChange }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="form-section">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="section-header"
      >
        <h3 className="section-title">Address Information</h3>
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
          <div className="form-grid">
            {/* Flat No./Building */}
            <div className="form-field">
              <label className="field-label">Flat No./Building</label>
              {isEditMode ? (
                <input
                  className="field-input"
                  value={data?.flatNo || ""}
                  onChange={(e) => onChange("flatNo", e.target.value)}
                  placeholder="Enter flat/building"
                />
              ) : (
                <span className="field-value">{data?.flatNo || "-"}</span>
              )}
            </div>

            {/* Area */}
            <div className="form-field">
              <label className="field-label">Area</label>
              {isEditMode ? (
                <input
                  className="field-input"
                  value={data?.area || ""}
                  onChange={(e) => onChange("area", e.target.value)}
                  placeholder="Enter area"
                />
              ) : (
                <span className="field-value">{data?.area || "-"}</span>
              )}
            </div>

            {/* Pin Code */}
            <div className="form-field">
              <label className="field-label">Pin Code</label>
              {isEditMode ? (
                <input
                  className="field-input"
                  value={data?.pinCode || ""}
                  onChange={(e) => onChange("pinCode", e.target.value)}
                  placeholder="Enter pin code"
                />
              ) : (
                <span className="field-value">{data?.pinCode || "-"}</span>
              )}
            </div>

            {/* City */}
            <div className="form-field">
              <label className="field-label">City</label>
              {isEditMode ? (
                <input
                  className="field-input"
                  value={data?.city || ""}
                  onChange={(e) => onChange("city", e.target.value)}
                  placeholder="Enter city"
                />
              ) : (
                <span className="field-value">{data?.city || "-"}</span>
              )}
            </div>

            {/* State */}
            <div className="form-field">
              <label className="field-label">State</label>
              {isEditMode ? (
                <input
                  className="field-input"
                  value={data?.state || ""}
                  onChange={(e) => onChange("state", e.target.value)}
                  placeholder="Enter state"
                />
              ) : (
                <span className="field-value">{data?.state || "-"}</span>
              )}
            </div>

            {/* Country */}
            <div className="form-field">
              <label className="field-label">Country</label>
              {isEditMode ? (
                <input
                  className="field-input"
                  value={data?.country || ""}
                  onChange={(e) => onChange("country", e.target.value)}
                  placeholder="Enter country"
                />
              ) : (
                <span className="field-value">{data?.country || "-"}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}