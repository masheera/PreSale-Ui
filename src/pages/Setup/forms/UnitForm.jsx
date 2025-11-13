import { useState } from "react";
import { UnitAPI } from "../../../api/endpoints";

export default function UnitForm({
  setup,
  projects,
  towersByProject,
  floorsByTower,
  onSuccess
}) {
  const [unitForm, setUnitForm] = useState({
    project: "",
    tower: "",
    floor: "",
    unitno: "",
    unittype: "",
    carpetsqft: "",
    builtupsqft: "",
    rerasqft: "",
    facing: "",
    parkingtype: "",
    agreementvalue: "",
    constructionstart: "",
    completiondate: "",
    status: "",
    notes: "",
  });

  const updateUnitForm = (key, val) =>
    setUnitForm((f) => ({ ...f, [key]: val }));

  const towersForUnit = towersByProject[unitForm.project] || [];
  const floorsForUnit = floorsByTower[unitForm.tower] || [];

  const handleAddUnit = async (e) => {
    e.preventDefault();
    
    const required = ["project", "tower", "floor", "unitno"];
    for (const k of required) {
      if (!unitForm[k]) {
        alert("Project, Tower, Floor, and Unit Number are required");
        return;
      }
    }

    const payload = {
      project: Number(unitForm.project),
      tower: Number(unitForm.tower),
      floor: Number(unitForm.floor),
      unit_no: unitForm.unitno,
      unittype: unitForm.unittype ? Number(unitForm.unittype) : null,
      carpetsqft: unitForm.carpetsqft ? Number(unitForm.carpetsqft) : null,
      builtupsqft: unitForm.builtupsqft ? Number(unitForm.builtupsqft) : null,
      rerasqft: unitForm.rerasqft ? Number(unitForm.rerasqft) : null,
      facing: unitForm.facing ? Number(unitForm.facing) : null,
      parkingtype: unitForm.parkingtype ? Number(unitForm.parkingtype) : null,
      agreementvalue: unitForm.agreementvalue ? Number(unitForm.agreementvalue) : null,
      constructionstart: unitForm.constructionstart || null,
      completiondate: unitForm.completiondate || null,
      status: unitForm.status || "NOT_RELEASED",
      notes: unitForm.notes || "",
    };

    try {
      await UnitAPI.create(payload);
      alert("Unit created successfully!");
      
      setUnitForm({
        ...unitForm,
        unitno: "",
        unittype: "",
        carpetsqft: "",
        builtupsqft: "",
        rerasqft: "",
        facing: "",
        parkingtype: "",
        agreementvalue: "",
        constructionstart: "",
        completiondate: "",
        status: "",
        notes: "",
      });
      
      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to create unit");
    }
  };

  return (
    <div className="project-form-container">
      <div className="form-header">
        <h3>Add Flat / Unit</h3>
        <button type="button" className="btn-import">
          <span className="import-icon">📄</span>
          IMPORT EXCEL
        </button>
      </div>

      <form onSubmit={handleAddUnit} className="project-form">
        <div className="form-grid">
          <div className="form-field">
            <label className="field-label">
              Select Project <span className="required">*</span>
            </label>
            <select
              className="field-input"
              value={unitForm.project}
              onChange={(e) => {
                updateUnitForm("project", e.target.value);
                updateUnitForm("tower", "");
                updateUnitForm("floor", "");
              }}
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
              Select Tower <span className="required">*</span>
            </label>
            <select
              className="field-input"
              value={unitForm.tower}
              onChange={(e) => {
                updateUnitForm("tower", e.target.value);
                updateUnitForm("floor", "");
              }}
              disabled={!unitForm.project}
              required
            >
              <option value="">Select Tower</option>
              {towersForUnit.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label className="field-label">
              Select Floor <span className="required">*</span>
            </label>
            <select
              className="field-input"
              value={unitForm.floor}
              onChange={(e) => updateUnitForm("floor", e.target.value)}
              disabled={!unitForm.tower}
              required
            >
              <option value="">Select Floor</option>
              {floorsForUnit.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.number}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label className="field-label">
              Unit Number <span className="required">*</span>
            </label>
            <input
              className="field-input"
              value={unitForm.unitno}
              onChange={(e) => updateUnitForm("unitno", e.target.value)}
              placeholder="Enter unit number"
              required
            />
          </div>

          <div className="form-field">
            <label className="field-label">Unit Type</label>
            <select
              className="field-input"
              value={unitForm.unittype}
              onChange={(e) => updateUnitForm("unittype", e.target.value)}
            >
              <option value="">Select</option>
              {setup?.lookups?.unit_types?.map((ut) => (
                <option key={ut.id} value={ut.id}>
                  {ut.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label className="field-label">Facing</label>
            <select
              className="field-input"
              value={unitForm.facing}
              onChange={(e) => updateUnitForm("facing", e.target.value)}
            >
              <option value="">Select</option>
              {setup?.lookups?.facings?.map((fc) => (
                <option key={fc.id} value={fc.id}>
                  {fc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label className="field-label">Carpet Area (sq. ft.)</label>
            <input
              className="field-input"
              type="number"
              value={unitForm.carpetsqft}
              onChange={(e) => updateUnitForm("carpetsqft", e.target.value)}
              step="0.01"
              placeholder="Enter carpet area"
            />
          </div>

          <div className="form-field">
            <label className="field-label">Built Up Area (sq. ft.)</label>
            <input
              className="field-input"
              type="number"
              value={unitForm.builtupsqft}
              onChange={(e) => updateUnitForm("builtupsqft", e.target.value)}
              step="0.01"
              placeholder="Enter built-up area"
            />
          </div>

          <div className="form-field">
            <label className="field-label">RERA Area (sq. ft.)</label>
            <input
              className="field-input"
              type="number"
              value={unitForm.rerasqft}
              onChange={(e) => updateUnitForm("rerasqft", e.target.value)}
              step="0.01"
              placeholder="Enter RERA area"
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label className="field-label">Parking Type</label>
            <select
              className="field-input"
              value={unitForm.parkingtype}
              onChange={(e) => updateUnitForm("parkingtype", e.target.value)}
            >
              <option value="">Select</option>
              {setup?.lookups?.parking_types?.map((pk) => (
                <option key={pk.id} value={pk.id}>
                  {pk.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label className="field-label">Agreement Value</label>
            <input
              className="field-input"
              type="number"
              value={unitForm.agreementvalue}
              onChange={(e) => updateUnitForm("agreementvalue", e.target.value)}
              step="0.01"
              placeholder="Enter value"
            />
          </div>

          <div className="form-field">
            <label className="field-label">Status</label>
            <select
              className="field-input"
              value={unitForm.status}
              onChange={(e) => updateUnitForm("status", e.target.value)}
            >
              <option value="">Select</option>
              {setup?.statuses?.unit?.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label className="field-label">Construction Start Date</label>
            <input
              className="field-input"
              type="date"
              value={unitForm.constructionstart}
              onChange={(e) => updateUnitForm("constructionstart", e.target.value)}
            />
          </div>

          <div className="form-field">
            <label className="field-label">Completion Date</label>
            <input
              className="field-input"
              type="date"
              value={unitForm.completiondate}
              onChange={(e) => updateUnitForm("completiondate", e.target.value)}
            />
          </div>
        </div>

        <div className="form-field-full">
          <label className="field-label">Note</label>
          <textarea
            className="field-textarea"
            rows={3}
            value={unitForm.notes}
            onChange={(e) => updateUnitForm("notes", e.target.value)}
            placeholder="Add notes"
          />
        </div>

        <div className="form-actions-right">
          <button type="submit" className="btn-add-project">
            SAVE UNIT
          </button>
        </div>
      </form>
    </div>
  );
}
