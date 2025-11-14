import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./LeadForm.css";

export default function LeadForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // For edit mode
  const isEditMode = !!id;

  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    leadInfo: true,
    address: false,
    description: false,
  });

  const toggleSection = (key) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    nationality: "",
    leadClassification: "",
    leadSubclass: "",
    leadSource: "",
    leadSubSource: "",
    status: "",
    subStatus: "",
    leadOwner: "",
    assignTo: "",
    offeringType: "",
    flatNo: "",
    area: "",
    pinCode: "",
    city: "",
    state: "",
    country: "",
    remarks: "",
  });

  const updateForm = (key, val) =>
    setFormData((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      alert("First Name and Last Name are required");
      return;
    }

    console.log("Form Data:", formData);
    alert(isEditMode ? "Lead updated successfully!" : "Lead created successfully!");
    navigate("/leads");
  };

  const handleCancel = () => {
    navigate("/leads");
  };

  return (
    <div className="lead-form-page">
      <div className="lead-form-container">
        <form onSubmit={handleSubmit}>
          {/* Lead Information Section */}
          <div className="form-section">
            <button
              type="button"
              onClick={() => toggleSection("leadInfo")}
              className="section-header"
            >
              <h3 className="section-title">Lead Information</h3>
              <svg
                className={`chevron-icon ${openSections.leadInfo ? "rotated" : ""}`}
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

            {openSections.leadInfo && (
              <div className="section-content">
                <div className="form-grid">
                  <div className="form-field">
                    <label className="field-label">
                      First Name <span className="required">*</span>
                    </label>
                    <input
                      className="field-input"
                      value={formData.firstName}
                      onChange={(e) => updateForm("firstName", e.target.value)}
                      placeholder="Enter first name"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">
                      Last Name <span className="required">*</span>
                    </label>
                    <input
                      className="field-input"
                      value={formData.lastName}
                      onChange={(e) => updateForm("lastName", e.target.value)}
                      placeholder="Enter last name"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Email</label>
                    <input
                      className="field-input"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                      placeholder="Enter email"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Mobile Number</label>
                    <input
                      className="field-input"
                      value={formData.mobileNumber}
                      onChange={(e) => updateForm("mobileNumber", e.target.value)}
                      placeholder="Enter mobile number"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Nationality</label>
                    <input
                      className="field-input"
                      value={formData.nationality}
                      onChange={(e) => updateForm("nationality", e.target.value)}
                      placeholder="Enter nationality"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Lead Classification</label>
                    <select
                      className="field-input"
                      value={formData.leadClassification}
                      onChange={(e) => updateForm("leadClassification", e.target.value)}
                    >
                      <option value="">--Select--</option>
                      <option value="hot">Hot Lead</option>
                      <option value="warm">Warm Lead</option>
                      <option value="cold">Cold Lead</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Lead Subclass</label>
                    <select
                      className="field-input"
                      value={formData.leadSubclass}
                      onChange={(e) => updateForm("leadSubclass", e.target.value)}
                    >
                      <option value="">--Select--</option>
                      <option value="high-budget">Interested - High Budget</option>
                      <option value="low-budget">Interested - Low Budget</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Lead Source</label>
                    <select
                      className="field-input"
                      value={formData.leadSource}
                      onChange={(e) => updateForm("leadSource", e.target.value)}
                    >
                      <option value="">--Select--</option>
                      <option value="website">Website</option>
                      <option value="referral">Referral</option>
                      <option value="social">Social Media</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Lead Sub Source</label>
                    <select
                      className="field-input"
                      value={formData.leadSubSource}
                      onChange={(e) => updateForm("leadSubSource", e.target.value)}
                    >
                      <option value="">--Select--</option>
                      <option value="google">Google Search</option>
                      <option value="direct">Direct Traffic</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Status</label>
                    <select
                      className="field-input"
                      value={formData.status}
                      onChange={(e) => updateForm("status", e.target.value)}
                    >
                      <option value="">--Select--</option>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="converted">Converted</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Sub Status</label>
                    <input
                      className="field-input"
                      value={formData.subStatus}
                      onChange={(e) => updateForm("subStatus", e.target.value)}
                      placeholder="Enter sub status"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Lead Owner</label>
                    <select
                      className="field-input"
                      value={formData.leadOwner}
                      onChange={(e) => updateForm("leadOwner", e.target.value)}
                    >
                      <option value="">--Select--</option>
                      <option value="bob">Bob Smith</option>
                      <option value="alice">Alice Johnson</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Assign To</label>
                    <select
                      className="field-input"
                      value={formData.assignTo}
                      onChange={(e) => updateForm("assignTo", e.target.value)}
                    >
                      <option value="">--Select--</option>
                      <option value="bob">Bob Smith</option>
                      <option value="alice">Alice Johnson</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Offering Type</label>
                    <select
                      className="field-input"
                      value={formData.offeringType}
                      onChange={(e) => updateForm("offeringType", e.target.value)}
                    >
                      <option value="">--Select--</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Address Information Section */}
          <div className="form-section">
            <button
              type="button"
              onClick={() => toggleSection("address")}
              className="section-header"
            >
              <h3 className="section-title">Address Information</h3>
              <svg
                className={`chevron-icon ${openSections.address ? "rotated" : ""}`}
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

            {openSections.address && (
              <div className="section-content">
                <div className="form-grid">
                  <div className="form-field">
                    <label className="field-label">Flat No./Building</label>
                    <input
                      className="field-input"
                      value={formData.flatNo}
                      onChange={(e) => updateForm("flatNo", e.target.value)}
                      placeholder="Enter flat/building"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Area</label>
                    <input
                      className="field-input"
                      value={formData.area}
                      onChange={(e) => updateForm("area", e.target.value)}
                      placeholder="Enter area"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Pin Code</label>
                    <input
                      className="field-input"
                      value={formData.pinCode}
                      onChange={(e) => updateForm("pinCode", e.target.value)}
                      placeholder="Enter pin code"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">City</label>
                    <input
                      className="field-input"
                      value={formData.city}
                      onChange={(e) => updateForm("city", e.target.value)}
                      placeholder="Enter city"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">State</label>
                    <input
                      className="field-input"
                      value={formData.state}
                      onChange={(e) => updateForm("state", e.target.value)}
                      placeholder="Enter state"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Country</label>
                    <input
                      className="field-input"
                      value={formData.country}
                      onChange={(e) => updateForm("country", e.target.value)}
                      placeholder="Enter country"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description Information Section */}
          <div className="form-section">
            <button
              type="button"
              onClick={() => toggleSection("description")}
              className="section-header"
            >
              <h3 className="section-title">Description Information</h3>
              <svg
                className={`chevron-icon ${openSections.description ? "rotated" : ""}`}
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

            {openSections.description && (
              <div className="section-content">
                <div className="form-field-full">
                  <label className="field-label">Remarks</label>
                  <textarea
                    className="field-textarea"
                    rows={4}
                    value={formData.remarks}
                    onChange={(e) => updateForm("remarks", e.target.value)}
                    placeholder="Enter remarks"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {isEditMode ? "Update Lead" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}