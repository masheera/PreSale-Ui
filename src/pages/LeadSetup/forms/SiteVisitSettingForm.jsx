import { useState } from "react";

export default function SiteVisitSettingForm({ leadSetup, projects, onSuccess }) {
  const [formData, setFormData] = useState({
    enableScheduledVisits: true,
    defaultFollowUpTime: "3days",
    notifyEmail: true,
    notifySMS: false,
    notifyInApp: true,
  });

  const updateForm = (key, val) =>
    setFormData((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    console.log("Site Visit Settings:", formData);
    alert("Site Visit Settings saved! (Static - No API yet)");
    onSuccess && onSuccess();
  };

  return (
    <div className="project-form-container">
      <div className="form-header">
        <h3>Site Visit Settings</h3>
      </div>

      <div className="project-form">
        {/* Enable Scheduled Visits */}
        <div style={{ marginBottom: "24px" }}>
          <div className="form-section-title" style={{ marginBottom: "12px" }}>
            Enable Scheduled Visits
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
              Allow clients to schedule site visits
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
                checked={formData.enableScheduledVisits}
                onChange={(e) => updateForm("enableScheduledVisits", e.target.checked)}
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
                  backgroundColor: formData.enableScheduledVisits ? "#6366f1" : "#d1d5db",
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
                    left: formData.enableScheduledVisits ? "26px" : "3px",
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

        {/* Default Follow-up Time */}
        <div className="form-field" style={{ marginBottom: "24px" }}>
          <label className="field-label">Default Follow-up Time</label>
          <select
            className="field-input"
            value={formData.defaultFollowUpTime}
            onChange={(e) => updateForm("defaultFollowUpTime", e.target.value)}
          >
            <option value="1day">1 Day</option>
            <option value="2days">2 Days</option>
            <option value="3days">3 Days</option>
            <option value="5days">5 Days</option>
            <option value="1week">1 Week</option>
            <option value="2weeks">2 Weeks</option>
          </select>
        </div>

        {/* Notify via */}
        <div style={{ marginBottom: "24px" }}>
          <label className="field-label" style={{ marginBottom: "12px", display: "block" }}>
            Notify via
          </label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.notifyEmail}
                onChange={(e) => updateForm("notifyEmail", e.target.checked)}
              />
              <span>Email</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.notifySMS}
                onChange={(e) => updateForm("notifySMS", e.target.checked)}
              />
              <span>SMS</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.notifyInApp}
                onChange={(e) => updateForm("notifyInApp", e.target.checked)}
              />
              <span>In-App</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="form-actions-right">
          <button
            type="button"
            onClick={handleSave}
            className="btn-add-project"
          >
            SAVE SETTINGS
          </button>
        </div>
      </div>
    </div>
  );
}