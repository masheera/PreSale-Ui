import { useState } from "react";

export default function LeadSourceForm({ leadSetup, projects, onSuccess }) {
  const [sources, setSources] = useState([
    "Website",
    "Referral",
    "Social Media",
  ]);

  const [subSources, setSubSources] = useState([
    "Google Search",
    "Direct Traffic",
  ]);

  const [newSource, setNewSource] = useState("");
  const [newSubSource, setNewSubSource] = useState("");

  const handleAddSource = () => {
    if (!newSource.trim()) {
      alert("Please enter a source name");
      return;
    }
    setSources([...sources, newSource]);
    setNewSource("");
  };

  const handleRemoveSource = (index) => {
    setSources(sources.filter((_, i) => i !== index));
  };

  const handleAddSubSource = () => {
    if (!newSubSource.trim()) {
      alert("Please enter a sub-source name");
      return;
    }
    setSubSources([...subSources, newSubSource]);
    setNewSubSource("");
  };

  const handleRemoveSubSource = (index) => {
    setSubSources(subSources.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log("Sources:", sources);
    console.log("Sub-Sources:", subSources);
    alert("Lead Sources saved! (Static - No API yet)");
    onSuccess && onSuccess();
  };

  return (
    <div className="project-form-container">
      <div className="form-header">
        <h3>Lead Source Setup</h3>
      </div>

      <div className="project-form">
        {/* Lead Sources Section */}
        <div className="form-section-divider">
          <h4 className="form-section-title">Lead Sources</h4>
        </div>

        {/* List of Sources */}
        <div style={{ marginBottom: "16px" }}>
          {sources.map((source, index) => (
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
                {source}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveSource(index)}
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

        {/* Add New Source Input */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <input
            className="field-input"
            value={newSource}
            onChange={(e) => setNewSource(e.target.value)}
            placeholder="Enter new source name"
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={handleAddSource}
            className="btn-primary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
            }}
          >
            <span>⊕</span>
            Add New Source
          </button>
        </div>

        {/* Lead Sub-Sources Section */}
        <div className="form-section-divider">
          <h4 className="form-section-title">
            Lead Sub-Sources (e.g., for Website)
          </h4>
        </div>

        {/* List of Sub-Sources */}
        <div style={{ marginBottom: "16px" }}>
          {subSources.map((subSource, index) => (
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
                {subSource}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveSubSource(index)}
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

        {/* Add New Sub-Source Input */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <input
            className="field-input"
            value={newSubSource}
            onChange={(e) => setNewSubSource(e.target.value)}
            placeholder="Enter new sub-source name"
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={handleAddSubSource}
            className="btn-primary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
            }}
          >
            <span>⊕</span>
            Add New Sub-Source
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