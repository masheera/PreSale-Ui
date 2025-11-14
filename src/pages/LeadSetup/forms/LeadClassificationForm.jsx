import { useState } from "react";

export default function LeadClassificationForm({ leadSetup, onSuccess }) {
  const [classifications, setClassifications] = useState([
    "Hot Lead",
    "Warm Lead",
    "Cold Lead",
  ]);

  const [subclasses, setSubclasses] = useState([
    "Interested - High Budget",
    "Interested - Low Budget",
  ]);

  const [newClassification, setNewClassification] = useState("");
  const [newSubclass, setNewSubclass] = useState("");

  const handleAddClassification = () => {
    if (!newClassification.trim()) {
      alert("Please enter a classification name");
      return;
    }
    setClassifications([...classifications, newClassification]);
    setNewClassification("");
  };

  const handleRemoveClassification = (index) => {
    setClassifications(classifications.filter((_, i) => i !== index));
  };

  const handleAddSubclass = () => {
    if (!newSubclass.trim()) {
      alert("Please enter a subclass name");
      return;
    }
    setSubclasses([...subclasses, newSubclass]);
    setNewSubclass("");
  };

  const handleRemoveSubclass = (index) => {
    setSubclasses(subclasses.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log("Classifications:", classifications);
    console.log("Subclasses:", subclasses);
    alert("Lead Classification saved! (Static - No API yet)");
    onSuccess && onSuccess();
  };

  return (
    <div className="project-form-container">
      <div className="form-header">
        <h3>Lead Classification Setup</h3>
      </div>

      <div className="project-form">
        {/* Lead Classifications Section */}
        <div className="form-section-divider">
          <h4 className="form-section-title">Lead Classifications</h4>
        </div>

        {/* List of Classifications */}
        <div style={{ marginBottom: "16px" }}>
          {classifications.map((classification, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                marginBottom: "8px",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                background: "#fff",
              }}
            >
              <span style={{ fontSize: "0.95rem", color: "#111827" }}>
                {classification}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveClassification(index)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ef4444",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                ⊗
              </button>
            </div>
          ))}
        </div>

        {/* Add New Classification Input */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <input
            className="field-input"
            value={newClassification}
            onChange={(e) => setNewClassification(e.target.value)}
            placeholder="Enter new classification name"
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={handleAddClassification}
            className="btn-primary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
            }}
          >
            <span>⊕</span>
            Add New Classification
          </button>
        </div>

        {/* Lead Subclasses Section */}
        <div className="form-section-divider">
          <h4 className="form-section-title">
            Lead Subclasses (e.g., for Hot Lead)
          </h4>
        </div>

        {/* List of Subclasses */}
        <div style={{ marginBottom: "16px" }}>
          {subclasses.map((subclass, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                marginBottom: "8px",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                background: "#fff",
              }}
            >
              <span style={{ fontSize: "0.95rem", color: "#111827" }}>
                {subclass}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveSubclass(index)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ef4444",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                ⊗
              </button>
            </div>
          ))}
        </div>

        {/* Add New Subclass Input */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <input
            className="field-input"
            value={newSubclass}
            onChange={(e) => setNewSubclass(e.target.value)}
            placeholder="Enter new subclass name"
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={handleAddSubclass}
            className="btn-primary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
            }}
          >
            <span>⊕</span>
            Add New Subclass
          </button>
        </div>

        {/* Save Button */}
        <div className="form-actions-right">
          <button
            type="button"
            onClick={handleSave}
            className="btn-add-project"
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
}