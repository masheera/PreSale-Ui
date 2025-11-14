import { useState } from "react";

export default function BudgetOfferingForm({ leadSetup, projects, onSuccess }) {
  const [formData, setFormData] = useState({
    defaultCurrency: "USD",
    budgetMin: "100000",
    budgetMax: "500000",
    defaultOfferingType: "Residential",
  });

  const updateForm = (key, val) =>
    setFormData((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    console.log("Budget & Offering Settings:", formData);
    alert("Budget & Offering Settings saved! (Static - No API yet)");
    onSuccess && onSuccess();
  };

  return (
    <div className="project-form-container">
      <div className="form-header">
        <h3>Budget & Offering Settings</h3>
      </div>

      <div className="project-form">
        {/* Default Currency */}
        <div className="form-field">
          <label className="field-label">Default Currency</label>
          <select
            className="field-input"
            value={formData.defaultCurrency}
            onChange={(e) => updateForm("defaultCurrency", e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
            <option value="AED">AED</option>
          </select>
        </div>

        {/* Budget Range */}
        <div className="form-field" style={{ marginTop: "20px" }}>
          <label className="field-label">Budget Range</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <input
              className="field-input"
              type="number"
              value={formData.budgetMin}
              onChange={(e) => updateForm("budgetMin", e.target.value)}
              placeholder="Min budget"
              style={{ flex: 1 }}
            />
            <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>to</span>
            <input
              className="field-input"
              type="number"
              value={formData.budgetMax}
              onChange={(e) => updateForm("budgetMax", e.target.value)}
              placeholder="Max budget"
              style={{ flex: 1 }}
            />
          </div>
        </div>

        {/* Default Offering Type */}
        <div className="form-field" style={{ marginTop: "20px" }}>
          <label className="field-label">Default Offering Type</label>
          <select
            className="field-input"
            value={formData.defaultOfferingType}
            onChange={(e) => updateForm("defaultOfferingType", e.target.value)}
          >
            <option value="">--Select Offering Type--</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Mixed Use">Mixed Use</option>
            <option value="Industrial">Industrial</option>
            <option value="Retail">Retail</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="form-actions-right" style={{ marginTop: "24px" }}>
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