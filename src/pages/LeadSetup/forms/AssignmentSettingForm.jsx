import { useState } from "react";

export default function AssignmentSettingForm({ leadSetup, users, projects, onSuccess }) {
  const [formData, setFormData] = useState({
    leadOwners: [],
    defaultOwner: "",
    autoAssignment: true,
    assignByProject: "all",
    assignBySource: "any",
    assignByAvailability: "round_robin",
  });

  const updateForm = (key, val) =>
    setFormData((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    console.log("Assignment Settings:", formData);
    alert("Assignment Settings saved! (Static - No API yet)");
    onSuccess && onSuccess();
  };

  return (
    <div className="project-form-container">
      <div className="form-header">
        <h3>Assignment Settings</h3>
      </div>

      <div className="project-form">
        {/* Lead Owners/Sales Agents */}
        <div className="form-field">
          <label className="field-label">Lead Owners/Sales Agents</label>
          <select
            className="field-input"
            value={formData.leadOwners}
            onChange={(e) => updateForm("leadOwners", e.target.value)}
          >
            <option value="">--Select Agents--</option>
            <option value="agent1">John Doe</option>
            <option value="agent2">Jane Smith</option>
            <option value="agent3">Bob Smith</option>
            <option value="agent4">Alice Johnson</option>
          </select>
        </div>

        {/* Default Owner */}
        <div className="form-field">
          <label className="field-label">Default Owner</label>
          <select
            className="field-input"
            value={formData.defaultOwner}
            onChange={(e) => updateForm("defaultOwner", e.target.value)}
          >
            <option value="">--Select Default Owner--</option>
            <option value="bob">Bob Smith</option>
            <option value="john">John Doe</option>
            <option value="jane">Jane Smith</option>
            <option value="alice">Alice Johnson</option>
          </select>
        </div>

        {/* Auto Assignment Toggle */}
        <div style={{ marginTop: "24px", marginBottom: "24px" }}>
          <div className="form-section-title" style={{ marginBottom: "12px" }}>
            Auto Assignment
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
              Enable automatic lead distribution
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
                checked={formData.autoAssignment}
                onChange={(e) => updateForm("autoAssignment", e.target.checked)}
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
                  backgroundColor: formData.autoAssignment ? "#6366f1" : "#d1d5db",
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
                    left: formData.autoAssignment ? "26px" : "3px",
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

        {/* Assignment Rules Box */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "20px",
            background: "#fafafa",
            marginBottom: "20px",
          }}
        >
          <h4
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "#111827",
              marginBottom: "16px",
            }}
          >
            Assignment Rules
          </h4>

          {/* Assign by Project */}
          <div className="form-field" style={{ marginBottom: "16px" }}>
            <label className="field-label">Assign by Project</label>
            <select
              className="field-input"
              value={formData.assignByProject}
              onChange={(e) => updateForm("assignByProject", e.target.value)}
            >
              <option value="all">All Projects</option>
              <option value="specific">Specific Projects</option>
              <option value="none">None</option>
            </select>
          </div>

          {/* Assign by Source */}
          <div className="form-field" style={{ marginBottom: "16px" }}>
            <label className="field-label">Assign by Source</label>
            <select
              className="field-input"
              value={formData.assignBySource}
              onChange={(e) => updateForm("assignBySource", e.target.value)}
            >
              <option value="any">Any Source</option>
              <option value="website">Website</option>
              <option value="referral">Referral</option>
              <option value="social">Social Media</option>
            </select>
          </div>

          {/* Assign by Availability */}
          <div className="form-field">
            <label className="field-label">Assign by Availability</label>
            <select
              className="field-input"
              value={formData.assignByAvailability}
              onChange={(e) => updateForm("assignByAvailability", e.target.value)}
            >
              <option value="round_robin">Round Robin</option>
              <option value="least_busy">Least Busy</option>
              <option value="most_experienced">Most Experienced</option>
              <option value="random">Random</option>
            </select>
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