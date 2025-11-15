// src/pages/SaleAddLead.jsx
import React, { useState, useEffect } from "react";
import { SetupAPI, URLS } from "../api/endpoints";
import api from "../api/axiosInstance";
import { showToast } from "../utils/toast";

const SECTION_KEY = "lead_setup";
const SECTION_TITLE = "Lead Setup";

// ---- Field config ----
const FIELDS = [
  // Lead Information
  {
    section: "lead",
    name: "first_name",
    label: "First Name",
    type: "text",
    required: true,
    span: 1,
    parse: "identity",
  },
  {
    section: "lead",
    name: "last_name",
    label: "Last Name",
    type: "text",
    required: true,
    span: 1,
    parse: "identity",
  },
  {
    section: "lead",
    name: "email",
    label: "Email",
    type: "text",
    required: false,
    span: 1,
    parse: "identity",
  },
  {
    section: "lead",
    name: "mobile_number",
    label: "Mobile Number",
    type: "text",
    required: true,
    span: 1,
    parse: "identity",
  },
  {
    section: "lead",
    name: "tel_res",
    label: "Tel(Res)",
    type: "text",
    required: false,
    span: 1,
    parse: "identity",
  },
  {
    section: "lead",
    name: "tel_office",
    label: "Tel(Office)",
    type: "text",
    required: false,
    span: 1,
    parse: "identity",
  },
  {
    section: "lead",
    name: "project_id",
    label: "Project",
    type: "select",
    required: true,
    span: 1,
    parse: "number",
    options: [],
  },
  {
    section: "lead",
    name: "budget",
    label: "Budget",
    type: "number",
    required: false,
    span: 1,
    parse: "number",
  },
  {
    section: "lead",
    name: "annual_income",
    label: "Annual Income",
    type: "number",
    required: false,
    span: 1,
    parse: "number",
  },
  {
    section: "lead",
    name: "company",
    label: "Company",
    type: "text",
    required: false,
    span: 1,
    parse: "identity",
  },
  {
    section: "lead",
    name: "lead_classification_id",
    label: "Lead Classification",
    type: "select",
    required: false,
    span: 1,
    parse: "number",
    options: [],
  },
  {
    section: "lead",
    name: "lead_subclass_id",
    label: "Lead Subclass",
    type: "select",
    required: false,
    span: 1,
    parse: "number",
    options: [],
  },
  {
    section: "lead",
    name: "lead_source_id",
    label: "Lead Source",
    type: "select",
    required: false,
    span: 1,
    parse: "number",
    options: [],
  },
  {
    section: "lead",
    name: "lead_sub_source_id",
    label: "Lead Sub Source",
    type: "select",
    required: false,
    span: 1,
    parse: "number",
    options: [],
  },
  {
    section: "lead",
    name: "status_id",
    label: "Status",
    type: "select",
    required: false,
    span: 1,
    parse: "number",
    options: [],
  },
  {
    section: "lead",
    name: "sub_status_id",
    label: "Sub Status",
    type: "select",
    required: false,
    span: 1,
    parse: "number",
    options: [],
  },
  {
    section: "lead",
    name: "lead_owner_id",
    label: "Lead Owner",
    type: "select",
    required: false,
    span: 1,
    parse: "number",
    options: [],
  },
  {
    section: "lead",
    name: "assign_to_id",
    label: "Assign To",
    type: "select",
    required: false,
    span: 1,
    parse: "number",
    options: [],
  },
  {
    section: "lead",
    name: "purpose_id",
    label: "Purpose",
    type: "select",
    required: false,
    span: 1,
    parse: "number",
    options: [],
  },
  {
    section: "lead",
    name: "offering_type",
    label: "Offering Type",
    type: "select",
    required: false,
    span: 1,
    parse: "identity",
    options: [],
  },

  // Address Information
  {
    section: "address",
    name: "flat_no",
    label: "Flat No/ Building",
    type: "text",
    required: false,
    span: 1,
    parse: "identity",
  },
  {
    section: "address",
    name: "area",
    label: "Area",
    type: "text",
    required: false,
    span: 1,
    parse: "identity",
  },
  {
    section: "address",
    name: "pin_code",
    label: "Pin Code",
    type: "text",
    required: false,
    span: 1,
    parse: "identity",
  },
  {
    section: "address",
    name: "city",
    label: "City",
    type: "text",
    required: false,
    span: 1,
    parse: "identity",
  },
  {
    section: "address",
    name: "state",
    label: "State",
    type: "text",
    required: false,
    span: 1,
    parse: "identity",
  },
  {
    section: "address",
    name: "country",
    label: "Country",
    type: "text",
    required: false,
    span: 1,
    parse: "identity",
  },

  // Description Information
  {
    section: "description",
    name: "description",
    label: "Description",
    type: "textarea",
    required: false,
    span: 3,
    parse: "identity",
  },
];

// ---------- helpers ----------

const buildInitialFormState = () => {
  const form = {};
  FIELDS.forEach((field) => {
    form[field.name] = field.type === "checkbox" ? false : "";
  });
  return form;
};

const evaluateExpression = (expr, { form, setup, scope }) => {
  if (!expr) return false;
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function("form", "setup", "scope", `return (${expr});`);
    return !!fn(form, setup, scope);
  } catch {
    return false;
  }
};

const resolvePathFromSetup = (setup, path) => {
  if (!path || !setup) return undefined;
  const keys = path.split(".").filter(Boolean);
  let current = setup;
  for (const k of keys) {
    if (current == null) return undefined;
    current = current[k];
  }
  return current;
};

const normalizeScalarValue = (value, field) => {
  if (value === "" || value === undefined || value === null) return null;

  if (field.parse === "number") {
    const n = Number(value);
    return Number.isNaN(n) ? null : n;
  }

  if (field.parse === "date") return value || null;

  if (
    field.type === "select" &&
    typeof value === "string" &&
    /^\d+$/.test(value)
  ) {
    return Number(value);
  }

  return value;
};

// =================== MAIN COMPONENT ===================

const SaleAddLead = ({ handleLeadSubmit }) => {
  const [form, setForm] = useState(buildInitialFormState);

  // collapsible groups
  const [openGroups, setOpenGroups] = useState({
    lead: true,
    address: true,
    description: true,
  });

  // dynamic data
  const [projects, setProjects] = useState([]);
  const [masters, setMasters] = useState(null);
  const [loadingMasters, setLoadingMasters] = useState(false);

  // ------- load my-scope projects on mount -------
  useEffect(() => {
    SetupAPI.myScope()
      .then((data) => {
        const list =
          data?.projects || data?.project_list || data?.results || [];
        setProjects(list);
      })
      .catch((err) => {
        console.error("Failed to load scope", err);
        showToast("Failed to load project scope", "error");
      });
  }, []);

  // ------- when project changes, fetch lead masters -------
  useEffect(() => {
    if (!form.project_id) {
      setMasters(null);
      return;
    }
    setLoadingMasters(true);
    api
      .get(URLS.leadMasters, {
        params: { project_id: form.project_id },
      })
      .then((res) => {
        setMasters(res.data);
      })
      .catch((err) => {
        console.error("Failed to load lead masters", err);
        showToast("Failed to load lead masters", "error");
      })
      .finally(() => setLoadingMasters(false));
  }, [form.project_id]);

  const toggleGroup = (groupKey) => {
    setOpenGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isFieldHidden = (field) =>
    evaluateExpression(field.hiddenWhen, {
      form,
      setup: { masters, projects },
      scope: null,
    });

  const isFieldDisabled = (field) =>
    evaluateExpression(field.disabledWhen, {
      form,
      setup: { masters, projects },
      scope: null,
    });

  // map masters/projects to select options
  const getOptionsForField = (field) => {
    const toOptions = (items) =>
      (items || []).map((item) => ({
        value: item.id,
        label: item.name || item.label || item.title || `#${item.id}`,
      }));

    // Project select uses my-scope projects
    if (field.name === "project_id") {
      return (projects || []).map((p) => ({
        value: p.id,
        label: p.name || p.project_name || p.title || `Project #${p.id}`,
      }));
    }

    if (!masters) {
      if (field.options && field.options.length) return field.options;
      return [];
    }

    switch (field.name) {
      case "lead_classification_id":
        return toOptions(masters.classifications);

      case "lead_subclass_id": {
        const selectedId = form.lead_classification_id
          ? String(form.lead_classification_id)
          : null;
        const root = (masters.classifications || []).find(
          (c) => String(c.id) === selectedId
        );
        return toOptions(root?.children || root?.subclasses);
      }

      case "lead_source_id":
        return toOptions(masters.sources);

      case "lead_sub_source_id": {
        const selectedId = form.lead_source_id
          ? String(form.lead_source_id)
          : null;
        const root = (masters.sources || []).find(
          (s) => String(s.id) === selectedId
        );
        return toOptions(root?.children || root?.sub_sources);
      }

      case "status_id":
        return toOptions(masters.statuses);

      case "sub_status_id": {
        const selectedId = form.status_id ? String(form.status_id) : null;
        const st = (masters.statuses || []).find(
          (s) => String(s.id) === selectedId
        );
        return toOptions(st?.sub_statuses);
      }

      case "purpose_id":
        return toOptions(masters.purposes);

      case "offering_type":
        return toOptions(masters.offering_types);

      case "lead_owner_id":
      case "assign_to_id":
        return (masters.assign_users || []).map((u) => ({
          value: u.id,
          label: u.name || u.username,
        }));

      default: {
        if (field.options && field.options.length) return field.options;

        if (field.optionsFrom) {
          const src = resolvePathFromSetup(
            { masters, projects },
            field.optionsFrom
          );
          if (Array.isArray(src)) {
            const valueKey = field.valueKey || "id";
            const labelKey = field.labelKey || "name";
            return src.map((item) => ({
              value: item[valueKey],
              label: item[labelKey],
            }));
          }
        }
        return [];
      }
    }
  };

  const buildRowsForSection = (sectionName) => {
    const fields = FIELDS.filter((f) => f.section === sectionName);
    const rows = [];
    let currentRow = [];
    let currentSpan = 0;

    fields.forEach((field) => {
      if (isFieldHidden(field)) return;

      const span = field.span || 1;
      if (currentSpan + span > 3) {
        rows.push(currentRow);
        currentRow = [];
        currentSpan = 0;
      }
      currentRow.push(field);
      currentSpan += span;
    });

    if (currentRow.length) rows.push(currentRow);
    return rows;
  };

  const validateRequired = () => {
    const missing = [];

    FIELDS.forEach((field) => {
      if (!field.required || isFieldHidden(field)) return;
      const v = form[field.name];
      if (v === "" || v === null || v === undefined) {
        missing.push(field.label);
      }
    });

    if (missing.length) {
      window.alert("Please fill required fields");
      return false;
    }
    return true;
  };

  const buildPayload = () => {
    const payload = {};
    FIELDS.forEach((field) => {
      if (isFieldHidden(field)) return;
      const raw = form[field.name];
      payload[field.name] = normalizeScalarValue(raw, field);
    });
    return payload;
  };

const onSubmit = async (e) => {
  e.preventDefault();
  if (!validateRequired()) return;

  const normalized = buildPayload();

  if (!normalized.project_id) {
    showToast("Please select a project", "error");
    return;
  }

  // ✅ Backend ab sirf `project` expect karta hai
  const leadPayload = {
    project: normalized.project_id, // 👈 IMPORTANT CHANGE

    first_name: normalized.first_name || null,
    last_name: normalized.last_name || null,

    email: normalized.email,
    mobile_number: normalized.mobile_number,
    tel_res: normalized.tel_res,
    tel_office: normalized.tel_office,

    company: normalized.company,
    budget: normalized.budget,
    annual_income: normalized.annual_income,

    classification: normalized.lead_classification_id,
    sub_classification: normalized.lead_subclass_id,
    source: normalized.lead_source_id,
    sub_source: normalized.lead_sub_source_id,
    status: normalized.status_id,
    sub_status: normalized.sub_status_id,
    purpose: normalized.purpose_id,

    current_owner: normalized.lead_owner_id || null,
    assign_to: normalized.assign_to_id || null,

    offering_types:
      normalized.offering_type != null && normalized.offering_type !== ""
        ? [normalized.offering_type]
        : [],

    address: {
      flat_or_building: normalized.flat_no || "",
      area: normalized.area || "",
      pincode: normalized.pin_code || "",
      city: normalized.city || "",
      state: normalized.state || "",
      country: normalized.country || "",
      description: normalized.description || "",
    },
  };

  const body = {
    lead: leadPayload,
    first_update: {
      title: "Lead created",
      info: `${normalized.first_name || ""} ${
        normalized.last_name || ""
      }`.trim(),
    },
  };

  try {
    const res = await api.post(URLS.salesLeadBundleCreate, body);
    showToast("Lead saved successfully", "success");

    if (typeof handleLeadSubmit === "function") {
      handleLeadSubmit(res.data);
    }

    setForm(buildInitialFormState());
    setMasters(null);
  } catch (err) {
    console.error("Failed to save lead", err);

    let msg = "Failed to save lead. Please check the data.";
    const data = err?.response?.data;
    if (data) {
      if (typeof data === "string") msg = data;
      else if (data.detail) msg = data.detail;
      else if (data.lead && typeof data.lead === "object") {
        const firstKey = Object.keys(data.lead)[0];
        const firstVal = data.lead[firstKey];
        msg = Array.isArray(firstVal) ? firstVal.join(" ") : String(firstVal);
      }
    }

    showToast(msg, "error");
  }
};



  const handleCancel = () => {
    setForm(buildInitialFormState());
    setMasters(null);
  };

  const renderField = (field) => {
    const id = `${SECTION_KEY}_${field.name}`;
    const disabled = isFieldDisabled(field);
    const baseInputClass =
      "form-input" + (disabled ? " form-input-disabled" : "");
    const label = (
      <label htmlFor={id} className="form-label">
        {field.label}
        {field.required && <span className="required">*</span>}
      </label>
    );

    if (field.type === "textarea") {
      return (
        <div
          key={field.name}
          className={field.span === 3 ? "form-field-full" : "form-field"}
        >
          {label}
          <textarea
            id={id}
            className="form-textarea"
            value={form[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            disabled={disabled}
          />
        </div>
      );
    }

    if (field.type === "select") {
      const options = getOptionsForField(field);
      return (
        <div
          key={field.name}
          className={field.span === 3 ? "form-field-full" : "form-field"}
        >
          {label}
          <select
            id={id}
            className={baseInputClass}
            value={form[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            disabled={
              disabled ||
              (field.name !== "project_id" && !masters && loadingMasters)
            }
          >
            <option value="">
              {field.name === "project_id"
                ? "Select project"
                : loadingMasters
                ? "Loading..."
                : "Select"}
            </option>
            {options.map((opt) => (
              <option key={String(opt.value)} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    // text / number / date
    return (
      <div
        key={field.name}
        className={field.span === 3 ? "form-field-full" : "form-field"}
      >
        {label}
        <input
          id={id}
          className={baseInputClass}
          type={field.type === "number" ? "number" : field.type || "text"}
          value={form[field.name] || ""}
          onChange={(e) => handleChange(field.name, e.target.value)}
          disabled={disabled}
        />
      </div>
    );
  };

  const renderSectionGroup = (groupKey, title) => {
    const rows = buildRowsForSection(groupKey);
    if (!rows.length) return null;

    const open = openGroups[groupKey];

    return (
      <div style={{ marginBottom: "12px" }}>
        <button
          type="button"
          className="section-header"
          onClick={() => toggleGroup(groupKey)}
        >
          <div className="section-title">{title}</div>
          <div className={`chevron-icon ${open ? "open" : ""}`}>⌄</div>
        </button>

        {open && (
          <div style={{ marginTop: "10px" }}>
            {rows.map((row, idx) => {
              const totalSpan = row.reduce((sum, f) => sum + (f.span || 1), 0);
              const rowClass =
                totalSpan === 2 && row.length <= 2 ? "form-row-2" : "form-row";

              return (
                <div key={`${groupKey}_${idx}`} className={rowClass}>
                  {row.map((field) => renderField(field))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="setup-section" id={SECTION_KEY}>
      <div className="section-content">
        <form onSubmit={onSubmit}>
          {renderSectionGroup("lead", "Lead Information")}
          {renderSectionGroup("address", "Address Information")}
          {renderSectionGroup("description", "Description Information")}
          {/* Buttons row */}
          <div className="form-row">
            <div className="form-field-full">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "40px", // buttons ke beech ka distance
                  marginTop: "40px",
                  marginBottom: "20px",
                }}
              >
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button type="submit" className="btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleAddLead;
