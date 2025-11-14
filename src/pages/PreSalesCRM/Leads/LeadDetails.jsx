import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeadTabs from "./components/LeadTabs";
import "./LeadDetails.css";

export default function LeadDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Static lead data
  const [leadData] = useState({
    id: "L001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    mobile: "9876543210",
    status: "Qualified",
    assignedTo: "Bob Smith",
    source: "Website",
    budget: "₹50,00,000",
  });

  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    leadInfo: true,
    activity: false,
    documents: false,
    address: false,
    contact: false,
    offering: false,
    budget: false,
    followup: false,
  });

  const toggleSection = (key) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  const handleCancel = () => {
    navigate("/leads");
  };

  const handleSubmit = () => {
    alert("Changes saved successfully!");
  };

  return (
    <div className="lead-details-page">
      <div className="lead-details-container">
        {/* Header */}
        <div className="lead-header">
          <div className="lead-header-info">
            <h2 className="lead-name">
              {leadData.firstName} {leadData.lastName}
            </h2>
            <div className="lead-meta">
              <span className="lead-id">ID: {leadData.id}</span>
              <span className="lead-contact">{leadData.mobile}</span>
              <span className={`status-badge status-${leadData.status.toLowerCase()}`}>
                {leadData.status}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <LeadTabs />

        {/* Content Sections */}
        <div className="lead-content">
          {/* Lead Information */}
          <div className="detail-section">
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
                <div className="info-grid">
                  <div className="info-item">
                    <label>First Name:</label>
                    <span>{leadData.firstName}</span>
                  </div>
                  <div className="info-item">
                    <label>Last Name:</label>
                    <span>{leadData.lastName}</span>
                  </div>
                  <div className="info-item">
                    <label>Email:</label>
                    <span>{leadData.email}</span>
                  </div>
                  <div className="info-item">
                    <label>Mobile:</label>
                    <span>{leadData.mobile}</span>
                  </div>
                  <div className="info-item">
                    <label>Source:</label>
                    <span>{leadData.source}</span>
                  </div>
                  <div className="info-item">
                    <label>Assigned To:</label>
                    <span>{leadData.assignedTo}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lead Activity */}
          <div className="detail-section">
            <button
              type="button"
              onClick={() => toggleSection("activity")}
              className="section-header"
            >
              <h3 className="section-title">Lead Activity</h3>
              <svg
                className={`chevron-icon ${openSections.activity ? "rotated" : ""}`}
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

            {openSections.activity && (
              <div className="section-content">
                <div className="activity-timeline">
                  <div className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <p className="activity-text">Lead created by Bob Smith</p>
                      <span className="activity-time">2 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <p className="activity-text">Status changed to Qualified</p>
                      <span className="activity-time">1 day ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <p className="activity-text">Follow-up scheduled</p>
                      <span className="activity-time">2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Documents */}
          <div className="detail-section">
            <button
              type="button"
              onClick={() => toggleSection("documents")}
              className="section-header"
            >
              <h3 className="section-title">Documents</h3>
              <svg
                className={`chevron-icon ${openSections.documents ? "rotated" : ""}`}
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

            {openSections.documents && (
              <div className="section-content">
                <div className="documents-upload">
                  <div className="upload-area">
                    <div className="upload-icon">📄</div>
                    <p>Drag and drop files here or click to browse</p>
                    <button className="btn-upload">Upload Document</button>
                  </div>
                </div>
                <div className="documents-list">
                  <div className="document-item">
                    <span className="doc-icon">📄</span>
                    <span className="doc-name">ID_Proof.pdf</span>
                    <button className="btn-doc-action">Download</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Address Information */}
          <div className="detail-section">
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
                <div className="info-grid">
                  <div className="info-item">
                    <label>Flat/Building:</label>
                    <span>A-101, Green Valley</span>
                  </div>
                  <div className="info-item">
                    <label>Area:</label>
                    <span>Andheri West</span>
                  </div>
                  <div className="info-item">
                    <label>City:</label>
                    <span>Mumbai</span>
                  </div>
                  <div className="info-item">
                    <label>State:</label>
                    <span>Maharashtra</span>
                  </div>
                  <div className="info-item">
                    <label>Pin Code:</label>
                    <span>400053</span>
                  </div>
                  <div className="info-item">
                    <label>Country:</label>
                    <span>India</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="detail-section">
            <button
              type="button"
              onClick={() => toggleSection("contact")}
              className="section-header"
            >
              <h3 className="section-title">Contact Information</h3>
              <svg
                className={`chevron-icon ${openSections.contact ? "rotated" : ""}`}
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

            {openSections.contact && (
              <div className="section-content">
                <div className="info-grid">
                  <div className="info-item">
                    <label>Primary Phone:</label>
                    <span>{leadData.mobile}</span>
                  </div>
                  <div className="info-item">
                    <label>Email:</label>
                    <span>{leadData.email}</span>
                  </div>
                  <div className="info-item">
                    <label>Alternate Phone:</label>
                    <span>-</span>
                  </div>
                  <div className="info-item">
                    <label>WhatsApp:</label>
                    <span>{leadData.mobile}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Offering Information */}
          <div className="detail-section">
            <button
              type="button"
              onClick={() => toggleSection("offering")}
              className="section-header"
            >
              <h3 className="section-title">Offering Information</h3>
              <svg
                className={`chevron-icon ${openSections.offering ? "rotated" : ""}`}
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

            {openSections.offering && (
              <div className="section-content">
                <div className="info-grid">
                  <div className="info-item">
                    <label>Offering Type:</label>
                    <span>Residential</span>
                  </div>
                  <div className="info-item">
                    <label>Project:</label>
                    <span>Grand Heights</span>
                  </div>
                  <div className="info-item">
                    <label>Unit Type:</label>
                    <span>2 BHK</span>
                  </div>
                  <div className="info-item">
                    <label>Preferences:</label>
                    <span>High Floor, East Facing</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Budget/Financial */}
          <div className="detail-section">
            <button
              type="button"
              onClick={() => toggleSection("budget")}
              className="section-header"
            >
              <h3 className="section-title">Budget/Financial Information</h3>
              <svg
                className={`chevron-icon ${openSections.budget ? "rotated" : ""}`}
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

            {openSections.budget && (
              <div className="section-content">
                <div className="info-grid">
                  <div className="info-item">
                    <label>Budget Range:</label>
                    <span>{leadData.budget}</span>
                  </div>
                  <div className="info-item">
                    <label>Payment Mode:</label>
                    <span>Home Loan</span>
                  </div>
                  <div className="info-item">
                    <label>Bank:</label>
                    <span>HDFC Bank</span>
                  </div>
                  <div className="info-item">
                    <label>Loan Approved:</label>
                    <span>Yes</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Follow-up Information */}
          <div className="detail-section">
            <button
              type="button"
              onClick={() => toggleSection("followup")}
              className="section-header"
            >
              <h3 className="section-title">Follow-up Information</h3>
              <svg
                className={`chevron-icon ${openSections.followup ? "rotated" : ""}`}
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

            {openSections.followup && (
              <div className="section-content">
                <div className="info-grid">
                  <div className="info-item">
                    <label>Next Follow-up:</label>
                    <span>15th Nov 2025</span>
                  </div>
                  <div className="info-item">
                    <label>Follow-up Type:</label>
                    <span>Phone Call</span>
                  </div>
                  <div className="info-item">
                    <label>Last Contact:</label>
                    <span>10th Nov 2025</span>
                  </div>
                  <div className="info-item">
                    <label>Notes:</label>
                    <span>Interested in site visit</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="detail-actions">
          <button type="button" onClick={handleCancel} className="btn-cancel">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} className="btn-submit">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}