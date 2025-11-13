import { useState } from "react";
import { TowerAPI } from "../../../api/endpoints";
import axiosInstance from "../../../api/axiosInstance";

export default function TowerForm({ setup, projects, onSuccess }) {
  const [towerForm, setTowerForm] = useState({
    project: "",
    name: "",
    towertype: "",
    totalfloors: "",
    status: "",
    notes: "",
  });

  const updateTowerForm = (key, val) =>
    setTowerForm((f) => ({ ...f, [key]: val }));

  const handleAddTower = async (e) => {
    e.preventDefault();
    if (!towerForm.project || !towerForm.name.trim()) {
      alert("Project and Tower Name are required");
      return;
    }

    const payload = {
      project: Number(towerForm.project),
      name: towerForm.name,
      towertype: towerForm.towertype ? Number(towerForm.towertype) : null,
      totalfloors: towerForm.totalfloors ? Number(towerForm.totalfloors) : 0,
      status: towerForm.status || "DRAFT",
      notes: towerForm.notes || "",
    };

    try {
      await TowerAPI.create(payload);
      alert("Tower created successfully!");
      
      setTowerForm({
        project: towerForm.project, // Keep project selected for convenience
        name: "",
        towertype: "",
        totalfloors: "",
        status: "",
        notes: "",
      });
      
      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to create tower");
    }
  };

  return (
    <div className="project-form-container">
      <div className="form-header">
        <h3>Add Tower</h3>
        <button type="button" className="btn-import">
          <span className="import-icon">📄</span>
          IMPORT EXCEL
        </button>
      </div>

      <form onSubmit={handleAddTower} className="project-form">
        {/* Row 1: Project, Tower Name, Tower Type */}
        <div className="form-grid">
          <div className="form-field">
            <label className="field-label">
              Select Project <span className="required">*</span>
            </label>
            <select
              className="field-input"
              value={towerForm.project}
              onChange={(e) => updateTowerForm("project", e.target.value)}
              required
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label className="field-label">
              Tower Name <span className="required">*</span>
            </label>
            <input
              className="field-input"
              value={towerForm.name}
              onChange={(e) => updateTowerForm("name", e.target.value)}
              placeholder="Enter tower name"
              required
            />
          </div>

          <div className="form-field">
            <label className="field-label">Tower Type</label>
            <select
              className="field-input"
              value={towerForm.towertype}
              onChange={(e) => updateTowerForm("towertype", e.target.value)}
            >
              <option value="">Select</option>
              {setup?.lookups?.tower_types?.map((tt) => (
                <option key={tt.id} value={tt.id}>
                  {tt.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Total Floors, Status */}
        <div className="form-grid">
          <div className="form-field">
            <label className="field-label">Total Floors</label>
            <input
              className="field-input"
              type="number"
              value={towerForm.totalfloors}
              onChange={(e) => updateTowerForm("totalfloors", e.target.value)}
              placeholder="Enter total floors"
              min="0"
            />
          </div>

          <div className="form-field">
            <label className="field-label">Status</label>
            <select
              className="field-input"
              value={towerForm.status}
              onChange={(e) => updateTowerForm("status", e.target.value)}
            >
              <option value="">Select</option>
              {setup?.statuses?.floor?.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Notes (full width) */}
        <div className="form-field-full">
          <label className="field-label">Note</label>
          <textarea
            className="field-textarea"
            rows={3}
            value={towerForm.notes}
            onChange={(e) => updateTowerForm("notes", e.target.value)}
            placeholder="Add notes"
          />
        </div>

        {/* Submit Button */}
        <div className="form-actions-right">
          <button type="submit" className="btn-add-project">
            ADD TOWER
          </button>
        </div>
      </form>
    </div>
  );
}
