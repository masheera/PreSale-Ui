import { useState } from "react";

export default function DataReportingForm({ leadSetup, users, onSuccess }) {
  const [formData, setFormData] = useState({
    enableDailyReports: false,
    reportType: "Summary",
    autoExportFormat: "CSV",
    frequency: "Weekly",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const updateForm = (key, val) =>
    setFormData((f) => ({ ...f, [key]: val }));

  const handleCancel = () => {
    setFormData({
      enableDailyReports: false,
      reportType: "Summary",
      autoExportFormat: "CSV",
      frequency: "Weekly",
    });
    setShowSuccess(false);
  };

  const handleSave = () => {
    console.log("Data & Reporting Settings:", formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    onSuccess && onSuccess();
  };

  return (
    <div className="project-form-container">
      <div className="form-header">
        <h3>Data & Reporting</h3>
      </div>

      <div className="project-form">
        {/* Daily Reports Toggle */}
        <div style={{ marginBottom: "24px" }}>
          <div className="form-section-title" style={{ marginBottom: "12px" }}>
            Daily Reports
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 0",
            }}
          >
            <label style={{ fontSize: "0.95rem", color: "#374151" }}>
              Enable sending daily performance reports
            </label>
            <label
              style={{
                position: "relative",
                display: "inline-block",
                width: "48px",
                height: "24px",
              }}
            >
              <input
                type="checkbox"
                checked={formData.enableDailyReports}
                onChange={(e) => updateForm("enableDailyReports", e.target.checked)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: formData.enableDailyReports ? "#6366f1" : "#d1d5db",
                  transition: "0.3s",
                  borderRadius: "24px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    content: "",
                    height: "18px",
                    width: "18px",
                    left: formData.enableDailyReports ? "26px" : "3px",
                    bottom: "3px",
                    backgroundColor: "white",
                    transition: "0.3s",
                    borderRadius: "50%",
                  }}
                />
              </span>
            </label>
          </div>
        </div>

        {/* Report Type */}
        <div className="form-field" style={{ marginBottom: "20px" }}>
          <label className="field-label">Report Type</label>
          <select
            className="field-input"
            value={formData.reportType}
            onChange={(e) => updateForm("reportType", e.target.value)}
          >
            <option value="Summary">Summary</option>
            <option value="Detailed">Detailed</option>
            <option value="Analytics">Analytics</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        {/* Auto-Export Format */}
        <div className="form-field" style={{ marginBottom: "20px" }}>
          <label className="field-label">Auto-Export Format</label>
          <select
            className="field-input"
            value={formData.autoExportFormat}
            onChange={(e) => updateForm("autoExportFormat", e.target.value)}
          >
            <option value="CSV">CSV</option>
            <option value="Excel">Excel</option>
            <option value="PDF">PDF</option>
            <option value="JSON">JSON</option>
          </select>
        </div>

        {/* Frequency */}
        <div className="form-field" style={{ marginBottom: "32px" }}>
          <label className="field-label">Frequency</label>
          <select
            className="field-input"
            value={formData.frequency}
            onChange={(e) => updateForm("frequency", e.target.value)}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
          </select>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div
            style={{
              display: "inline-block",
              padding: "8px 16px",
              background: "#10b981",
              color: "white",
              borderRadius: "6px",
              fontSize: "0.9rem",
              fontWeight: 600,
              marginBottom: "20px",
            }}
          >
            Settings updated successfully!
          </div>
        )}

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "24px",
          }}
        >
          <button
            type="button"
            onClick={handleCancel}
            className="btn-cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn-primary"
            style={{
              padding: "10px 24px",
              background: "#6366f1",
              fontSize: "0.9rem",
            }}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}