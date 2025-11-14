import { useState } from "react";

export default function LeadInformationSection({ data, isEditMode = false, onChange }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="form-section">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="section-header"
      >
        <h3 className="section-title">Lead Information</h3>
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
            {/* First Name */}
            <div className="form-field">
              <label className="field-label">
                First Name <span className="required">*</span>
              </label>
              {isEditMode ? (
                <input
                  className="field-input"
                  value={data?.firstName || ""}
                  onChange={(e) => onChange("firstName", e.target.value)}
                  placeholder="Enter first name"
                  required
                />
              ) : (
                <span className="field-value">{data?.firstName || "-"}</span>
              )}
            </div>

            {/* Last Name */}
            <div className="form-field">
              <label className="field-label">
                Last Name <span className="required">*</span>
              </label>
              {isEditMode ? (
                <input
                  className="field-input"
                  value={data?.lastName || ""}
                  onChange={(e) => onChange("lastName", e.target.value)}
                  placeholder="Enter last name"
                  required
                />
              ) : (
                <span className="field-value">{data?.lastName || "-"}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-field">
              <label className="field-label">Email</label>
              {isEditMode ? (
                <input
                  className="field-input"
                  type="email"
                  value={data?.email || ""}
                  onChange={(e) => onChange("email", e.target.value)}
                  placeholder="Enter email"
                />
              ) : (
                <span className="field-value">{data?.email || "-"}</span>
              )}
            </div>

            {/* Mobile Number */}
            <div className="form-field">
              <label className="field-label">Mobile Number</label>
              {isEditMode ? (
                <input
                  className="field-input"
                  value={data?.mobileNumber || ""}
                  onChange={(e) => onChange("mobileNumber", e.target.value)}
                  placeholder="Enter mobile number"
                />
              ) : (
                <span className="field-value">{data?.mobileNumber || "-"}</span>
              )}
            </div>

            {/* Nationality */}
            <div className="form-field">
              <label className="field-label">Nationality</label>
              {isEditMode ? (
                <input
                  className="field-input"
                  value={data?.nationality || ""}
                  onChange={(e) => onChange("nationality", e.target.value)}
                  placeholder="Enter nationality"
                />
              ) : (
                <span className="field-value">{data?.nationality || "-"}</span>
              )}
            </div>

            {/* Lead Classification */}
            <div className="form-field">
              <label className="field-label">Lead Classification</label>
              {isEditMode ? (
                <select
                  className="field-input"
                  value={data?.leadClassification || ""}
                  onChange={(e) => onChange("leadClassification", e.target.value)}
                >
                  <option value="">--Select--</option>
                  <option value="hot">Hot Lead</option>
                  <option value="warm">Warm Lead</option>
                  <option value="cold">Cold Lead</option>
                </select>
              ) : (
                <span className="field-value">{data?.leadClassification || "-"}</span>
              )}
            </div>

            {/* Lead Subclass */}
            <div className="form-field">
              <label className="field-label">Lead Subclass</label>
              {isEditMode ? (
                <select
                  className="field-input"
                  value={data?.leadSubclass || ""}
                  onChange={(e) => onChange("leadSubclass", e.target.value)}
                >
                  <option value="">--Select--</option>
                  <option value="high-budget">Interested - High Budget</option>
                  <option value="low-budget">Interested - Low Budget</option>
                </select>
              ) : (
                <span className="field-value">{data?.leadSubclass || "-"}</span>
              )}
            </div>

            {/* Lead Source */}
            <div className="form-field">
              <label className="field-label">Lead Source</label>
              {isEditMode ? (
                <select
                  className="field-input"
                  value={data?.leadSource || ""}
                  onChange={(e) => onChange("leadSource", e.target.value)}
                >
                  <option value="">--Select--</option>
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="social">Social Media</option>
                </select>
              ) : (
                <span className="field-value">{data?.leadSource || "-"}</span>
              )}
            </div>

            {/* Lead Sub Source */}
            <div className="form-field">
              <label className="field-label">Lead Sub Source</label>
              {isEditMode ? (
                <select
                  className="field-input"
                  value={data?.leadSubSource || ""}
                  onChange={(e) => onChange("leadSubSource", e.target.value)}
                >
                  <option value="">--Select--</option>
                  <option value="google">Google Search</option>
                  <option value="direct">Direct Traffic</option>
                </select>
              ) : (
                <span className="field-value">{data?.leadSubSource || "-"}</span>
              )}
            </div>

            {/* Status */}
            <div className="form-field">
              <label className="field-label">Status</label>
              {isEditMode ? (
                <select
                  className="field-input"
                  value={data?.status || ""}
                  onChange={(e) => onChange("status", e.target.value)}
                >
                  <option value="">--Select--</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                </select>
              ) : (
                <span className="field-value">{data?.status || "-"}</span>
              )}
            </div>

            {/* Lead Owner */}
            <div className="form-field">
              <label className="field-label">Lead Owner</label>
              {isEditMode ? (
                <select
                  className="field-input"
                  value={data?.leadOwner || ""}
                  onChange={(e) => onChange("leadOwner", e.target.value)}
                >
                  <option value="">--Select--</option>
                  <option value="bob">Bob Smith</option>
                  <option value="alice">Alice Johnson</option>
                </select>
              ) : (
                <span className="field-value">{data?.leadOwner || "-"}</span>
              )}
            </div>

            {/* Assign To */}
            <div className="form-field">
              <label className="field-label">Assign To</label>
              {isEditMode ? (
                <select
                  className="field-input"
                  value={data?.assignTo || ""}
                  onChange={(e) => onChange("assignTo", e.target.value)}
                >
                  <option value="">--Select--</option>
                  <option value="bob">Bob Smith</option>
                  <option value="alice">Alice Johnson</option>
                </select>
              ) : (
                <span className="field-value">{data?.assignTo || "-"}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}