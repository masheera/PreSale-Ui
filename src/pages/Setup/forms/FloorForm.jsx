import { useState, useRef } from "react";
import { FloorAPI } from "../../../api/endpoints";
import axiosInstance from "../../../api/axiosInstance";

export default function FloorForm({ setup, projects, onSuccess }) {
  const [floorForm, setFloorForm] = useState({
    tower: "",
    number: "",
    totalunits: "",
    status: "",
    notes: "",
  });

  const [floorDocFile, setFloorDocFile] = useState(null);
  const fileInputRef = useRef(null);

  const updateFloorForm = (key, val) =>
    setFloorForm((f) => ({ ...f, [key]: val }));

  // Get towers for selected project (or all towers from all projects like original)
  const towersForFloor = projects.find((p) => p.id === Number(floorForm.project))
    ?.towers || [];

  const handleAddFloor = async (e) => {
    e.preventDefault();
    
    if (!floorForm.tower || !floorForm.number) {
      alert("Tower and Floor Number are required");
      return;
    }

    try {
      // Step 1: Create Floor (NO file in payload)
      const payload = {
        tower: Number(floorForm.tower),
        number: String(floorForm.number), // Backend expects string
        totalunits: floorForm.totalunits ? Number(floorForm.totalunits) : 0,
        status: floorForm.status || "DRAFT",
        notes: floorForm.notes || "",
      };

      const floor = await FloorAPI.create(payload);
      
      // Step 2: Upload document SEPARATELY (if file exists)
      if (floorDocFile) {
        const fd = new FormData();
        fd.append("floor", floor.id);
        fd.append("file", floorDocFile);
        
        await axiosInstance.post("client/floor-docs/", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Floor created successfully!");
      
      setFloorForm({
        tower: floorForm.tower, // Keep tower selected for convenience
        number: "",
        totalunits: "",
        status: "",
        notes: "",
      });
      setFloorDocFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to create floor");
    }
  };

  return (
    <div className="project-form-container">
      <div className="form-header">
        <h3>Add Floor</h3>
        <button type="button" className="btn-import">
          <span className="import-icon">📄</span>
          IMPORT EXCEL
        </button>
      </div>

      <form onSubmit={handleAddFloor} className="project-form">
        {/* Row 1: Tower, Floor Number, Total Units */}
        <div className="form-grid">
          <div className="form-field">
            <label className="field-label">
              Select Tower <span className="required">*</span>
            </label>
            <select
              className="field-input"
              value={floorForm.tower}
              onChange={(e) => updateFloorForm("tower", e.target.value)}
              required
            >
              <option value="">Select Tower</option>
              {/* Show all towers from all projects (like original) */}
              {projects.flatMap((p) =>
                (p.towers || []).map((t) => (
                  <option key={t.id} value={t.id}>
                    {p.name} - {t.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="form-field">
            <label className="field-label">
              Floor Number <span className="required">*</span>
            </label>
            <input
              className="field-input"
              type="text"
              value={floorForm.number}
              onChange={(e) => updateFloorForm("number", e.target.value)}
              placeholder="e.g., G, 1, 12A"
              required
            />
          </div>

          <div className="form-field">
            <label className="field-label">Total Units on Floor</label>
            <input
              className="field-input"
              type="number"
              value={floorForm.totalunits}
              onChange={(e) => updateFloorForm("totalunits", e.target.value)}
              placeholder="Enter total units"
              min="0"
            />
          </div>
        </div>

        {/* Row 2: Status, Floor Plan Document */}
        <div className="form-grid">
          <div className="form-field">
            <label className="field-label">Status</label>
            <select
              className="field-input"
              value={floorForm.status}
              onChange={(e) => updateFloorForm("status", e.target.value)}
            >
              <option value="">Select</option>
              {setup?.statuses?.floor?.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label className="field-label">Floor Plan Document</label>
            <div
              className="file-upload-box"
              onClick={() => fileInputRef.current?.click()}
              title="Click to choose file"
            >
              <svg
                className="upload-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                width="32"
                height="32"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="upload-text">
                {floorDocFile ? floorDocFile.name : "Click to browse file"}
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,image/*"
              style={{ display: "none" }}
              onChange={(e) => setFloorDocFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        {/* Row 3: Notes (full width) */}
        <div className="form-field-full">
          <label className="field-label">Note</label>
          <textarea
            className="field-textarea"
            rows={3}
            value={floorForm.notes}
            onChange={(e) => updateFloorForm("notes", e.target.value)}
            placeholder="Add notes"
          />
        </div>

        {/* Submit Button */}
        <div className="form-actions-right">
          <button type="submit" className="btn-add-project">
            ADD FLOOR
          </button>
        </div>
      </form>
    </div>
  );
}
