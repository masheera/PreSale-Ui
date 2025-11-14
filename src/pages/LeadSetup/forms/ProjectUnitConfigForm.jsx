import { useState } from "react";

export default function ProjectUnitConfigForm({ leadSetup, projects, units, onSuccess }) {
  const [formData, setFormData] = useState({
    projectName: "",
    unitTypes: [],
    offeringType: "",
    projectDescription: "",
    projectImage: null,
  });

  const updateForm = (key, val) =>
    setFormData((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.projectName.trim()) {
      alert("Project Name is required");
      return;
    }

    console.log("Form Data:", formData);
    alert("Project & Unit Configuration saved! (Static - No API yet)");
    
    // Reset form
    setFormData({
      projectName: "",
      unitTypes: [],
      offeringType: "",
      projectDescription: "",
      projectImage: null,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateForm("projectImage", file);
    }
  };

  return (
    <div className="project-form-container">
      <div className="form-header">
        <h3>Project & Unit Configuration</h3>
      </div>

      <form onSubmit={handleSubmit} className="project-form">
        {/* Row 1: Project Name */}
        <div className="form-grid">
          <div className="form-field">
            <label className="field-label">
              Project Name <span className="required">*</span>
            </label>
            <input
              className="field-input"
              value={formData.projectName}
              onChange={(e) => updateForm("projectName", e.target.value)}
              placeholder="Enter project name"
              required
            />
          </div>
        </div>

        {/* Row 2: Add Unit Types, Offering Type */}
        <div className="form-grid">
          <div className="form-field">
            <label className="field-label">Add Unit Types</label>
            <select
              className="field-input"
              value={formData.unitTypes}
              onChange={(e) => updateForm("unitTypes", e.target.value)}
            >
              <option value="">--Select Unit Type--</option>
              <option value="apartment">Apartment</option>
              <option value="studio">Studio</option>
              <option value="penthouse">Penthouse</option>
              <option value="duplex">Duplex</option>
              <option value="commercial">Commercial Suite</option>
            </select>
          </div>

          <div className="form-field">
            <label className="field-label">Offering Type</label>
            <select
              className="field-input"
              value={formData.offeringType}
              onChange={(e) => updateForm("offeringType", e.target.value)}
            >
              <option value="">--Select Offering Type--</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="mixed">Mixed Use</option>
              <option value="industrial">Industrial</option>
              <option value="retail">Retail</option>
            </select>
          </div>
        </div>

        {/* Row 3: Project Description (full width) */}
        <div className="form-field-full">
          <label className="field-label">Project Description</label>
          <textarea
            className="field-textarea"
            rows={4}
            value={formData.projectDescription}
            onChange={(e) => updateForm("projectDescription", e.target.value)}
            placeholder="Grand Heights Residencies offers luxurious urban living with state-of-the-art amenities and breathtaking city views. Each unit is designed for comfort and modern aesthetics."
          />
        </div>

        {/* Row 4: Project Image/Logo */}
        <div className="form-grid">
          <div className="form-field">
            <label className="field-label">Project Image/Logo</label>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <input
                className="field-input"
                type="text"
                value={formData.projectImage ? formData.projectImage.name : ""}
                placeholder="No file selected"
                readOnly
                style={{ flex: 1 }}
              />
              <label className="btn-secondary" style={{ margin: 0, cursor: "pointer" }}>
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions-right">
          <button type="submit" className="btn-add-project">
            SAVE CONFIGURATION
          </button>
        </div>
      </form>
    </div>
  );
}