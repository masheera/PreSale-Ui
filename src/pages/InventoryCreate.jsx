// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SalesSubnav from "../components/SalesSubnav";
// import { SetupAPI, InventoryAPI } from "../api/endpoints";
// import api from "../api/axiosInstance";
// import { showToast } from "../utils/toast";
// import "./Setup.css";
// import "./InventoryCreate.css";

// const createEmptyItem = () => ({
//   project: "",
//   tower: "",
//   floor: "",
//   unit: "",
//   unit_type: "",
//   configuration: "",
//   facing: "",
//   unit_status: "",

//   carpet_area: "",
//   build_up_area: "",
//   saleable_area: "",
//   rera_area: "",
//   block_minutes: "",
//   block_days: "",
//   agreement_value: "",
//   development_charges: "",
//   gst_amount: "",
//   stamp_duty_amount: "",
//   registration_charges: "",
//   legal_fee: "",
//   total_cost: "",
//   inventory_description: "",

//   floor_plan_file: null,
//   other_file: null,
//   project_plan_file: null,
// });

// const InventoryBulkCreate = () => {
//   const navigate = useNavigate();

//   const [section, setSection] = useState("pre");
//   const [activeItem, setActiveItem] = useState("inventory");

//   const [bundle, setBundle] = useState(null);
//   const [scope, setScope] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [items, setItems] = useState([createEmptyItem()]);

//   // ---------- load setup-bundle + my-scope(include_units) ----------
//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const [b, s] = await Promise.all([
//           SetupAPI.getBundle(),
//           SetupAPI.myScope({ include_units: true }),
//         ]);
//         setBundle(b);
//         setScope(s);
//       } catch (e) {
//         console.error("Failed to load inventory setup", e);
//         setError("Failed to load configuration / scope");
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, []);

//   // ---------- derived data ----------
//   const projects = useMemo(() => scope?.projects ?? [], [scope]);
//   const unitTypes = bundle?.lookups?.unit_types ?? [];
//   const unitConfigs = bundle?.lookups?.unit_configurations ?? [];
//   const facings = bundle?.lookups?.facings ?? [];
//   const unitStatuses =
//     (bundle?.statuses?.unit ?? []).filter((u) =>
//       ["AVAILABLE", "BLOCKED", "SOLD"].includes(u.code)
//     ) ?? [];

//   const getTowers = (item) => {
//     const p = projects.find((p) => String(p.id) === String(item.project));
//     return p?.towers ?? [];
//   };

//   const getFloors = (item) => {
//     const towers = getTowers(item);
//     const t = towers.find((t) => String(t.id) === String(item.tower));
//     return t?.floors ?? [];
//   };

//   const getUnits = (item) => {
//     const floors = getFloors(item);
//     const f = floors.find((f) => String(f.id) === String(item.floor));
//     return f?.units ?? [];
//   };

//   // ---------- handlers ----------
//   const handleItemChange = (index, name, value) => {
//     setItems((prev) =>
//       prev.map((it, i) => {
//         if (i !== index) return it;
//         const next = { ...it, [name]: value };
//         // cascade reset
//         if (name === "project") {
//           next.tower = "";
//           next.floor = "";
//           next.unit = "";
//         } else if (name === "tower") {
//           next.floor = "";
//           next.unit = "";
//         } else if (name === "floor") {
//           next.unit = "";
//         }
//         return next;
//       })
//     );
//   };

//   const handleFileChange = (index, name, file) => {
//     setItems((prev) =>
//       prev.map((it, i) => (i === index ? { ...it, [name]: file } : it))
//     );
//   };

//   const handleAddItem = () => {
//     setItems((prev) => [...prev, createEmptyItem()]);
//   };

//   const handleRemoveItem = (index) => {
//     setItems((prev) =>
//       prev.length === 1 ? prev : prev.filter((_, i) => i !== index)
//     );
//   };

//   const handleCancel = () => {
//     setItems([createEmptyItem()]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const fd = new FormData();
//     const payloadItems = [];

//     items.forEach((item, index) => {
//       const hasCore =
//         item.project || item.tower || item.floor || item.unit || item.unit_type;
//       if (!hasCore) return;

//       const docs = [];
//       let docIdx = 0;

//       if (item.floor_plan_file) {
//         const key = `doc_${index}_${docIdx++}`;
//         fd.append(key, item.floor_plan_file);
//         docs.push({ doc_type: "FLOOR_PLAN", file_field: key });
//       }
//       if (item.project_plan_file) {
//         const key = `doc_${index}_${docIdx++}`;
//         fd.append(key, item.project_plan_file);
//         docs.push({ doc_type: "PROJECT_PLAN", file_field: key });
//       }
//       if (item.other_file) {
//         const key = `doc_${index}_${docIdx++}`;
//         fd.append(key, item.other_file);
//         docs.push({ doc_type: "OTHER", file_field: key });
//       }

//       payloadItems.push({
//         // IMPORTANT: inko EXACT `Inventory` model ke field names se match karo
//         project: item.project ? Number(item.project) : null,
//         tower: item.tower ? Number(item.tower) : null,
//         floor: item.floor ? Number(item.floor) : null,
//         unit: item.unit ? Number(item.unit) : null,
//         unit_type: item.unit_type ? Number(item.unit_type) : null,
//         configuration: item.configuration ? Number(item.configuration) : null,
//         facing: item.facing ? Number(item.facing) : null,

//         availability_status: item.unit_status || "AVAILABLE",
//         unit_status: item.unit_status || "AVAILABLE",

//         // yahan bhi apne actual model ki fields ke hisaab se rename karo
//         carpet_area: item.carpet_area || null,
//         build_up_area: item.build_up_area || null,
//         saleable_area: item.saleable_area || null,
//         rera_area: item.rera_area || null,
//         block_minutes: item.block_minutes || null,
//         block_days: item.block_days || null,
//         agreement_value: item.agreement_value || null,
//         development_charges: item.development_charges || null,
//         gst_amount: item.gst_amount || null,
//         stamp_duty_amount: item.stamp_duty_amount || null,
//         registration_charges: item.registration_charges || null,
//         legal_fee: item.legal_fee || null,
//         total_cost: item.total_cost || null,
//         description: item.inventory_description || "",

//         documents: docs,
//       });
//     });

//     if (!payloadItems.length) {
//       showToast("Please fill at least one inventory block", "error");
//       return;
//     }

//     fd.append("items", JSON.stringify(payloadItems));

//     try {
//       // agar upar InventoryAPI helper banaya hai to usko use karo:
//       // await InventoryAPI.bulkCreate(fd);
//       await api.post("client/inventory/bulk-create/", fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       showToast("Inventory created successfully", "success");
//       setItems([createEmptyItem()]);
//     } catch (err) {
//       console.error("Bulk inventory create failed", err);
//       const msg =
//         err?.response?.data?.detail ||
//         "Failed to create inventory. Please check the data.";
//       showToast(msg, "error");
//     }
//   };

//   // ---------- small render helpers ----------
//   const renderSelect = (
//     label,
//     name,
//     item,
//     index,
//     options,
//     placeholder = "Select"
//   ) => (
//     <div className="form-field">
//       <label className="form-label">{label}</label>
//       <select
//         className="form-input"
//         value={item[name] || ""}
//         onChange={(e) => handleItemChange(index, name, e.target.value)}
//       >
//         <option value="">{placeholder}</option>
//         {options.map((opt) => (
//           <option key={opt.value ?? opt.id} value={opt.value ?? opt.id}>
//             {opt.label ?? opt.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );

//   const renderNumber = (label, name, item, index) => (
//     <div className="form-field">
//       <label className="form-label">{label}</label>
//       <input
//         className="form-input"
//         type="number"
//         value={item[name]}
//         onChange={(e) => handleItemChange(index, name, e.target.value)}
//       />
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="inventory-page">
//         <SalesSubnav
//           section={section}
//           active={activeItem}
//           onSectionChange={setSection}
//           onNavigate={setActiveItem}
//         />
//         <div style={{ padding: 24 }}>Loading…</div>
//       </div>
//     );
//   }

//   return (
//     <div className="inventory-page">
//       <SalesSubnav
//         section={section}
//         active={activeItem}
//         onSectionChange={setSection}
//         onNavigate={(key) => {
//           setActiveItem(key);
//           if (key === "projects") navigate("/sales/projects");
//           if (key === "leads") navigate("/sales/leads");
//           if (key === "inventory") navigate("/sales/inventory/new");
//         }}
//       />

//       <div className="setup-section">
//         <div className="section-content">
//           {error && <div className="error-banner">{error}</div>}

//           <form onSubmit={handleSubmit}>
//             {items.map((item, index) => {
//               const towers = getTowers(item);
//               const floors = getFloors(item);
//               const units = getUnits(item);

//               return (
//                 <div className="inventory-block" key={index}>
//                   <div className="inventory-block-header">
//                     <span>Inventory {index + 1}</span>
//                     {items.length > 1 && (
//                       <button
//                         type="button"
//                         className="inventory-block-remove"
//                         onClick={() => handleRemoveItem(index)}
//                       >
//                         Remove
//                       </button>
//                     )}
//                   </div>

//                   {/* Row 1: Project / Tower / Floor */}
//                   <div className="form-row">
//                     {renderSelect(
//                       "Project Name:",
//                       "project",
//                       item,
//                       index,
//                       projects.map((p) => ({ value: p.id, label: p.name }))
//                     )}

//                     {renderSelect(
//                       "Tower:",
//                       "tower",
//                       item,
//                       index,
//                       towers.map((t) => ({ value: t.id, label: t.name })),
//                       "Select tower"
//                     )}

//                     {renderSelect(
//                       "Floor:",
//                       "floor",
//                       item,
//                       index,
//                       floors.map((f) => ({ value: f.id, label: f.number })),
//                       "Select floor"
//                     )}
//                   </div>

//                   {/* Row 2: Unit / Unit Type / Configuration */}
//                   <div className="form-row">
//                     {renderSelect(
//                       "Unit:",
//                       "unit",
//                       item,
//                       index,
//                       units.map((u) => ({
//                         value: u.id,
//                         label: u.unit_no || `Unit #${u.id}`,
//                       })),
//                       "Select unit"
//                     )}

//                     {renderSelect(
//                       "Unit Type:",
//                       "unit_type",
//                       item,
//                       index,
//                       unitTypes.map((u) => ({ value: u.id, label: u.name }))
//                     )}

//                     {renderSelect(
//                       "Unit Configuration:",
//                       "configuration",
//                       item,
//                       index,
//                       unitConfigs.map((u) => ({ value: u.id, label: u.name }))
//                     )}
//                   </div>

//                   {/* Row 3: Facing / Unit Status */}
//                   <div className="form-row">
//                     {renderSelect(
//                       "Facing:",
//                       "facing",
//                       item,
//                       index,
//                       facings.map((f) => ({ value: f.id, label: f.name }))
//                     )}

//                     {renderSelect(
//                       "Unit Status:",
//                       "unit_status",
//                       item,
//                       index,
//                       unitStatuses.map((u) => ({
//                         value: u.code,
//                         label: u.label,
//                       }))
//                     )}

//                     <div className="form-field" />
//                   </div>

//                   {/* Areas */}
//                   <div className="form-row">
//                     {renderNumber(
//                       "Carpet Area (Sq.ft):",
//                       "carpet_area",
//                       item,
//                       index
//                     )}
//                     {renderNumber(
//                       "Build Up Area (Sq.ft):",
//                       "build_up_area",
//                       item,
//                       index
//                     )}
//                     {renderNumber(
//                       "Saleable Area:",
//                       "saleable_area",
//                       item,
//                       index
//                     )}
//                   </div>

//                   {/* RERA + block */}
//                   <div className="form-row">
//                     {renderNumber("RERA Area:", "rera_area", item, index)}
//                     {renderNumber(
//                       "Block Period (Minutes):",
//                       "block_minutes",
//                       item,
//                       index
//                     )}
//                     {renderNumber(
//                       "Block Period (Days):",
//                       "block_days",
//                       item,
//                       index
//                     )}
//                   </div>

//                   {/* Money */}
//                   <div className="form-row">
//                     {renderNumber(
//                       "Agreement Value:",
//                       "agreement_value",
//                       item,
//                       index
//                     )}
//                     {renderNumber(
//                       "Development Charges:",
//                       "development_charges",
//                       item,
//                       index
//                     )}
//                     {renderNumber("GST:", "gst_amount", item, index)}
//                   </div>

//                   <div className="form-row">
//                     {renderNumber(
//                       "Stamp Duty Amount:",
//                       "stamp_duty_amount",
//                       item,
//                       index
//                     )}
//                     {renderNumber(
//                       "Registration Charges:",
//                       "registration_charges",
//                       item,
//                       index
//                     )}
//                     {renderNumber("Legal Fee:", "legal_fee", item, index)}
//                   </div>

//                   <div className="form-row">
//                     {renderNumber("Total Cost:", "total_cost", item, index)}
//                     <div className="form-field-full">
//                       <label className="form-label">
//                         Inventory Description:
//                       </label>
//                       <input
//                         className="form-input"
//                         type="text"
//                         value={item.inventory_description}
//                         onChange={(e) =>
//                           handleItemChange(
//                             index,
//                             "inventory_description",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </div>
//                   </div>

//                   {/* Upload row + inline Add (like screenshot) */}
//                   <div className="form-row inventory-upload-row">
//                     <div className="form-field-full">
//                       <label className="form-label">Floor Plans:</label>
//                       <label className="upload-box">
//                         <span className="upload-icon">⬆</span>
//                         <span>
//                           {item.floor_plan_file ? "Change file" : "Upload"}
//                         </span>
//                         <input
//                           type="file"
//                           style={{ display: "none" }}
//                           onChange={(e) =>
//                             handleFileChange(
//                               index,
//                               "floor_plan_file",
//                               e.target.files[0]
//                             )
//                           }
//                         />
//                       </label>
//                     </div>

//                     <div className="form-field-full">
//                       <label className="form-label">Other:</label>
//                       <label className="upload-box">
//                         <span className="upload-icon">⬆</span>
//                         <span>
//                           {item.other_file ? "Change file" : "Upload"}
//                         </span>
//                         <input
//                           type="file"
//                           style={{ display: "none" }}
//                           onChange={(e) =>
//                             handleFileChange(
//                               index,
//                               "other_file",
//                               e.target.files[0]
//                             )
//                           }
//                         />
//                       </label>
//                     </div>

//                     <div className="form-field-full">
//                       <label className="form-label">Project Plans:</label>
//                       <label className="upload-box">
//                         <span className="upload-icon">⬆</span>
//                         <span>
//                           {item.project_plan_file ? "Change file" : "Upload"}
//                         </span>
//                         <input
//                           type="file"
//                           style={{ display: "none" }}
//                           onChange={(e) =>
//                             handleFileChange(
//                               index,
//                               "project_plan_file",
//                               e.target.files[0]
//                             )
//                           }
//                         />
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}

//             {/* Add new inventory block button */}
//             <div className="inventory-add-row">
//               <button
//                 type="button"
//                 className="btn-primary btn-small"
//                 onClick={handleAddItem}
//               >
//                 Add
//               </button>
//             </div>

//             {/* Global Cancel / Submit */}
//             <div className="form-row">
//               <div className="form-field-full">
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     gap: "40px",
//                     marginTop: "40px",
//                     marginBottom: "20px",
//                   }}
//                 >
//                   <button
//                     type="button"
//                     className="btn-secondary"
//                     onClick={handleCancel}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn-primary">
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InventoryBulkCreate;







import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SalesSubnav from "../components/SalesSubnav";
import { SetupAPI, InventoryAPI } from "../api/endpoints";
import api from "../api/axiosInstance";
import { showToast } from "../utils/toast";
import "./Setup.css";
import "./InventoryCreate.css";

const createEmptyItem = () => ({
  project: "",
  tower: "",
  floor: "",
  unit: "",
  unit_type: "",
  configuration: "",
  facing: "",
  unit_status: "",

  carpet_area: "",
  build_up_area: "",
  saleable_area: "",
  rera_area: "",
  block_minutes: "",
  block_days: "",
  agreement_value: "",
  development_charges: "",
  gst_amount: "",
  stamp_duty_amount: "",
  registration_charges: "",
  legal_fee: "",
  total_cost: "",
  inventory_description: "",

  floor_plan_file: null,
  other_file: null,
  project_plan_file: null,
});

const InventoryBulkCreate = () => {
  const navigate = useNavigate();

  const [section, setSection] = useState("pre");
  const [activeItem, setActiveItem] = useState("inventory");

  const [bundle, setBundle] = useState(null);
  const [scope, setScope] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [items, setItems] = useState([createEmptyItem()]);

  // ---- Excel upload state ----
  const [excelProjectId, setExcelProjectId] = useState("");
  const [excelUploading, setExcelUploading] = useState(false);
  const excelFileInputRef = useRef(null);

  // ---------- load setup-bundle + my-scope(include_units) ----------
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [b, s] = await Promise.all([
          SetupAPI.getBundle(),
          SetupAPI.myScope({ include_units: true }),
        ]);
        setBundle(b);
        setScope(s);
      } catch (e) {
        console.error("Failed to load inventory setup", e);
        setError("Failed to load configuration / scope");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ---------- derived data ----------
  const projects = useMemo(() => scope?.projects ?? [], [scope]);
  const unitTypes = bundle?.lookups?.unit_types ?? [];
  const unitConfigs = bundle?.lookups?.unit_configurations ?? [];
  const facings = bundle?.lookups?.facings ?? [];
  const unitStatuses =
    (bundle?.statuses?.unit ?? []).filter((u) =>
      ["AVAILABLE", "BLOCKED", "SOLD"].includes(u.code)
    ) ?? [];

  const getTowers = (item) => {
    const p = projects.find((p) => String(p.id) === String(item.project));
    return p?.towers ?? [];
  };

  const getFloors = (item) => {
    const towers = getTowers(item);
    const t = towers.find((t) => String(t.id) === String(item.tower));
    return t?.floors ?? [];
  };

  const getUnits = (item) => {
    const floors = getFloors(item);
    const f = floors.find((f) => String(f.id) === String(item.floor));
    return f?.units ?? [];
  };

  // ---------- handlers ----------
  const handleItemChange = (index, name, value) => {
    setItems((prev) =>
      prev.map((it, i) => {
        if (i !== index) return it;
        const next = { ...it, [name]: value };
        // cascade reset
        if (name === "project") {
          next.tower = "";
          next.floor = "";
          next.unit = "";
        } else if (name === "tower") {
          next.floor = "";
          next.unit = "";
        } else if (name === "floor") {
          next.unit = "";
        }
        return next;
      })
    );
  };

  const handleFileChange = (index, name, file) => {
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, [name]: file } : it))
    );
  };

  const handleAddItem = () => {
    setItems((prev) => [...prev, createEmptyItem()]);
  };

  const handleRemoveItem = (index) => {
    setItems((prev) =>
      prev.length === 1 ? prev : prev.filter((_, i) => i !== index)
    );
  };

  const handleCancel = () => {
    setItems([createEmptyItem()]);
  };

  // ---------- Excel import handlers ----------
  const handleExcelImportClick = () => {
    if (excelFileInputRef.current) {
      excelFileInputRef.current.click();
    }
  };

  const handleExcelFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Prefer project selected in Excel bar; fallback to first block's project
    let projectId = excelProjectId || items[0]?.project || "";

    if (!projectId) {
      showToast(
        "Please select a Project (Excel Import) or set Project in first block.",
        "error"
      );
      e.target.value = "";
      return;
    }

    const fd = new FormData();
    fd.append("project_id", projectId);
    fd.append("file", file);

    setExcelUploading(true);
    try {
      const res = await api.post("client/inventory/upload-excel/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data || {};
      const created = data.created_units ?? data.created ?? 0;
      const updated = data.updated_units ?? data.updated ?? 0;
      const errors = data.errors ?? [];

      let msg = `Excel import done. Created: ${created}, Updated: ${updated}.`;
      if (errors.length) {
        msg += ` ${errors.length} row(s) had issues.`;
        console.warn("Inventory Excel import errors:", errors);
      }
      showToast(msg, "success");

      // (Optional) you can refresh scope/bundle or navigate somewhere
      // For now we just stay on the page.
    } catch (err) {
      console.error("Excel inventory upload failed", err);
      const msg =
        err?.response?.data?.detail ||
        "Failed to upload Excel. Please check the file format.";
      showToast(msg, "error");
    } finally {
      setExcelUploading(false);
      e.target.value = ""; // reset input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    const payloadItems = [];

    items.forEach((item, index) => {
      const hasCore =
        item.project || item.tower || item.floor || item.unit || item.unit_type;
      if (!hasCore) return;

      const docs = [];
      let docIdx = 0;

      if (item.floor_plan_file) {
        const key = `doc_${index}_${docIdx++}`;
        fd.append(key, item.floor_plan_file);
        docs.push({ doc_type: "FLOOR_PLAN", file_field: key });
      }
      if (item.project_plan_file) {
        const key = `doc_${index}_${docIdx++}`;
        fd.append(key, item.project_plan_file);
        docs.push({ doc_type: "PROJECT_PLAN", file_field: key });
      }
      if (item.other_file) {
        const key = `doc_${index}_${docIdx++}`;
        fd.append(key, item.other_file);
        docs.push({ doc_type: "OTHER", file_field: key });
      }

      payloadItems.push({
        project: item.project ? Number(item.project) : null,
        tower: item.tower ? Number(item.tower) : null,
        floor: item.floor ? Number(item.floor) : null,
        unit: item.unit ? Number(item.unit) : null,
        unit_type: item.unit_type ? Number(item.unit_type) : null,
        configuration: item.configuration ? Number(item.configuration) : null,
        facing: item.facing ? Number(item.facing) : null,

        availability_status: item.unit_status || "AVAILABLE",
        unit_status: item.unit_status || "AVAILABLE",

        carpet_area: item.carpet_area || null,
        build_up_area: item.build_up_area || null,
        saleable_area: item.saleable_area || null,
        rera_area: item.rera_area || null,
        block_minutes: item.block_minutes || null,
        block_days: item.block_days || null,
        agreement_value: item.agreement_value || null,
        development_charges: item.development_charges || null,
        gst_amount: item.gst_amount || null,
        stamp_duty_amount: item.stamp_duty_amount || null,
        registration_charges: item.registration_charges || null,
        legal_fee: item.legal_fee || null,
        total_cost: item.total_cost || null,
        description: item.inventory_description || "",

        documents: docs,
      });
    });

    if (!payloadItems.length) {
      showToast("Please fill at least one inventory block", "error");
      return;
    }

    fd.append("items", JSON.stringify(payloadItems));

    try {
      await api.post("client/inventory/bulk-create/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast("Inventory created successfully", "success");
      setItems([createEmptyItem()]);
    } catch (err) {
      console.error("Bulk inventory create failed", err);
      const msg =
        err?.response?.data?.detail ||
        "Failed to create inventory. Please check the data.";
      showToast(msg, "error");
    }
  };

  // ---------- small render helpers ----------
  const renderSelect = (
    label,
    name,
    item,
    index,
    options,
    placeholder = "Select"
  ) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <select
        className="form-input"
        value={item[name] || ""}
        onChange={(e) => handleItemChange(index, name, e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value ?? opt.id} value={opt.value ?? opt.id}>
            {opt.label ?? opt.name}
          </option>
        ))}
      </select>
    </div>
  );

  const renderNumber = (label, name, item, index) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <input
        className="form-input"
        type="number"
        value={item[name]}
        onChange={(e) => handleItemChange(index, name, e.target.value)}
      />
    </div>
  );

  if (loading) {
    return (
      <div className="inventory-page">
        <SalesSubnav
          section={section}
          active={activeItem}
          onSectionChange={setSection}
          onNavigate={setActiveItem}
        />
        <div style={{ padding: 24 }}>Loading…</div>
      </div>
    );
  }

  return (
    <div className="inventory-page">
      <SalesSubnav
        section={section}
        active={activeItem}
        onSectionChange={setSection}
        onNavigate={(key) => {
          setActiveItem(key);
          if (key === "projects") navigate("/sales/projects");
          if (key === "leads") navigate("/sales/leads");
          if (key === "inventory") navigate("/sales/inventory/new");
        }}
      />

      <div className="setup-section">
        <div className="section-content">
          {error && <div className="error-banner">{error}</div>}

          {/* --------- EXCEL IMPORT BAR --------- */}
          <div className="inventory-excel-bar" style={{ marginBottom: 24 }}>
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">
                  Project (for Excel Import):
                </label>
                <select
                  className="form-input"
                  value={excelProjectId}
                  onChange={(e) => setExcelProjectId(e.target.value)}
                >
                  <option value="">Select project</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {/* <div className="form-hint" style={{ fontSize: 12 }}>
                  If left empty, first inventory block&apos;s Project will be
                  used.
                </div>
                <div className="form-hint" style={{ fontSize: 11 }}>
                  Expected columns: Tower Name, Floor Number, Unit Number, BHK
                  Type, Carpet Area, Saleable Area, Status, Facing, Remarks
                </div> */}
              </div>

              <div
                className="form-field"
                style={{ display: "flex", alignItems: "flex-end" }}
              >
                <button
                  type="button"
                  className="import-btn"
                  onClick={handleExcelImportClick}
                  disabled={excelUploading}
                >
                  <svg
                    className="btn-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  {excelUploading ? "IMPORTING..." : "IMPORT EXCEL"}
                </button>
                <input
                  type="file"
                  accept=".xlsx"
                  ref={excelFileInputRef}
                  style={{ display: "none" }}
                  onChange={handleExcelFileChange}
                />
              </div>
            </div>
          </div>

          {/* --------- EXISTING FORM --------- */}
          <form onSubmit={handleSubmit}>
            {items.map((item, index) => {
              const towers = getTowers(item);
              const floors = getFloors(item);
              const units = getUnits(item);

              return (
                <div className="inventory-block" key={index}>
                  <div className="inventory-block-header">
                    <span>Inventory {index + 1}</span>
                    {items.length > 1 && (
                      <button
                        type="button"
                        className="inventory-block-remove"
                        onClick={() => handleRemoveItem(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Row 1: Project / Tower / Floor */}
                  <div className="form-row">
                    {renderSelect(
                      "Project Name:",
                      "project",
                      item,
                      index,
                      projects.map((p) => ({ value: p.id, label: p.name }))
                    )}

                    {renderSelect(
                      "Tower:",
                      "tower",
                      item,
                      index,
                      towers.map((t) => ({ value: t.id, label: t.name })),
                      "Select tower"
                    )}

                    {renderSelect(
                      "Floor:",
                      "floor",
                      item,
                      index,
                      floors.map((f) => ({ value: f.id, label: f.number })),
                      "Select floor"
                    )}
                  </div>

                  {/* Row 2: Unit / Unit Type / Configuration */}
                  <div className="form-row">
                    {renderSelect(
                      "Unit:",
                      "unit",
                      item,
                      index,
                      units.map((u) => ({
                        value: u.id,
                        label: u.unit_no || `Unit #${u.id}`,
                      })),
                      "Select unit"
                    )}

                    {renderSelect(
                      "Unit Type:",
                      "unit_type",
                      item,
                      index,
                      unitTypes.map((u) => ({ value: u.id, label: u.name }))
                    )}

                    {renderSelect(
                      "Unit Configuration:",
                      "configuration",
                      item,
                      index,
                      unitConfigs.map((u) => ({ value: u.id, label: u.name }))
                    )}
                  </div>

                  {/* Row 3: Facing / Unit Status */}
                  <div className="form-row">
                    {renderSelect(
                      "Facing:",
                      "facing",
                      item,
                      index,
                      facings.map((f) => ({ value: f.id, label: f.name }))
                    )}

                    {renderSelect(
                      "Unit Status:",
                      "unit_status",
                      item,
                      index,
                      unitStatuses.map((u) => ({
                        value: u.code,
                        label: u.label,
                      }))
                    )}

                    <div className="form-field" />
                  </div>

                  {/* Areas */}
                  <div className="form-row">
                    {renderNumber(
                      "Carpet Area (Sq.ft):",
                      "carpet_area",
                      item,
                      index
                    )}
                    {renderNumber(
                      "Build Up Area (Sq.ft):",
                      "build_up_area",
                      item,
                      index
                    )}
                    {renderNumber(
                      "Saleable Area:",
                      "saleable_area",
                      item,
                      index
                    )}
                  </div>

                  {/* RERA + block */}
                  <div className="form-row">
                    {renderNumber("RERA Area:", "rera_area", item, index)}
                    {renderNumber(
                      "Block Period (Minutes):",
                      "block_minutes",
                      item,
                      index
                    )}
                    {renderNumber(
                      "Block Period (Days):",
                      "block_days",
                      item,
                      index
                    )}
                  </div>

                  {/* Money */}
                  <div className="form-row">
                    {renderNumber(
                      "Agreement Value:",
                      "agreement_value",
                      item,
                      index
                    )}
                    {renderNumber(
                      "Development Charges:",
                      "development_charges",
                      item,
                      index
                    )}
                    {renderNumber("GST:", "gst_amount", item, index)}
                  </div>

                  <div className="form-row">
                    {renderNumber(
                      "Stamp Duty Amount:",
                      "stamp_duty_amount",
                      item,
                      index
                    )}
                    {renderNumber(
                      "Registration Charges:",
                      "registration_charges",
                      item,
                      index
                    )}
                    {renderNumber("Legal Fee:", "legal_fee", item, index)}
                  </div>

                  <div className="form-row">
                    {renderNumber("Total Cost:", "total_cost", item, index)}
                    <div className="form-field-full">
                      <label className="form-label">
                        Inventory Description:
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        value={item.inventory_description}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "inventory_description",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* Upload row + inline Add (like screenshot) */}
                  <div className="form-row inventory-upload-row">
                    <div className="form-field-full">
                      <label className="form-label">Floor Plans:</label>
                      <label className="upload-box">
                        <span className="upload-icon">⬆</span>
                        <span>
                          {item.floor_plan_file ? "Change file" : "Upload"}
                        </span>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            handleFileChange(
                              index,
                              "floor_plan_file",
                              e.target.files[0]
                            )
                          }
                        />
                      </label>
                    </div>

                    <div className="form-field-full">
                      <label className="form-label">Other:</label>
                      <label className="upload-box">
                        <span className="upload-icon">⬆</span>
                        <span>
                          {item.other_file ? "Change file" : "Upload"}
                        </span>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            handleFileChange(
                              index,
                              "other_file",
                              e.target.files[0]
                            )
                          }
                        />
                      </label>
                    </div>

                    <div className="form-field-full">
                      <label className="form-label">Project Plans:</label>
                      <label className="upload-box">
                        <span className="upload-icon">⬆</span>
                        <span>
                          {item.project_plan_file ? "Change file" : "Upload"}
                        </span>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            handleFileChange(
                              index,
                              "project_plan_file",
                              e.target.files[0]
                            )
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add new inventory block button */}
            <div className="inventory-add-row">
              <button
                type="button"
                className="btn-primary btn-small"
                onClick={handleAddItem}
              >
                Add
              </button>
            </div>

            {/* Global Cancel / Submit */}
            <div className="form-row">
              <div className="form-field-full">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "40px",
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
    </div>
  );
};

export default InventoryBulkCreate;
