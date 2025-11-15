// import React from "react";
// import "./LeadStaticPage.css";

// const LeadStaticPage = () => {
//   const stages = [
//     "New Lead",
//     "Stage 2",
//     "Stage 3",
//     "Stage 4",
//     "Stage 5",
//     "Stage 6",
//     "Stage 7",
//     "Won",
//   ];

//   return (
//     <div className="lead-page">
//       {/* ---------------- TOP HEADER ---------------- */}
//       <div className="lead-header">
//         <div className="lead-header-left">
//           <div className="lead-title">ANURAG SHARMA</div>

//           <div className="lead-header-grid">
//             <div className="field-compact">
//               <label>Lead Owner:</label>
//               <input defaultValue="Pratik Bedekar" readOnly />
//             </div>
//             <div className="field-compact">
//               <label>Mobile:</label>
//               <input defaultValue="90xxxxxx98" readOnly />
//             </div>
//             <div className="field-compact">
//               <label>Email:</label>
//               <input defaultValue="anxxxxxxxx.com" readOnly />
//             </div>
//             <div className="field-compact">
//               <label>Lead Status:</label>
//               <input defaultValue="Fresh" readOnly />
//             </div>
//           </div>
//         </div>

//         <div className="lead-header-right">
//           <div className="action-row-top">
//             <button className="card-btn">Inventory</button>
//             <button className="card-btn active">Book Flat</button>
//             <button className="card-btn">Payments</button>
//             <button className="card-btn">Payment Link</button>
//           </div>
//           <div className="action-row-bottom">
//             <button className="card-btn small">Send Feedback</button>
//             <button className="card-btn small">Save</button>
//           </div>
//         </div>
//       </div>

//       {/* ---------------- STAGE BAR ---------------- */}
//       <div className="lead-stages">
//         {stages.map((stage, idx) => (
//           <div
//             key={stage}
//             className={`stage-item ${
//               idx === stages.length - 1 ? "stage-active" : ""
//             }`}
//           >
//             <span className="stage-dot" />
//             <span className="stage-label">{stage}</span>
//           </div>
//         ))}
//       </div>

//       {/* ---------------- MAIN CONTENT SPLIT ---------------- */}
//       <div className="content-split">
//         {/* LEFT – Lead Information box */}
//         <div className="panel panel-left">
//           <div className="panel-header">
//             <span>Lead Information</span>
//             <button className="link-btn">Edit</button>
//           </div>
//           <div className="panel-body blank-area" />
//         </div>

//         {/* RIGHT – Activity / Documents */}
//         <div className="panel panel-right">
//           {/* Tabs */}
//           <div className="tabs">
//             <button className="tab active">Activity</button>
//             <button className="tab">Comment</button>
//             <button className="tab">Booking</button>
//             <button className="tab">SMS</button>
//             <button className="tab">Email</button>
//             <button className="tab">Zoom</button>
//           </div>

//           {/* Activity form */}
//           <div className="activity-wrapper">
//             <div className="activity-row">
//               <div className="activity-icon bubble" />
//               <div className="activity-card">
//                 <div className="field-full">
//                   <label>Contact Customer</label>
//                   <input className="input-plain" readOnly />
//                 </div>
//                 <div className="field-full">
//                   <label>Things to do</label>
//                   <textarea className="input-plain tall" readOnly />
//                 </div>

//                 <div className="activity-footer">
//                   <div className="date-pill">
//                     Mon, November 17, 15:00
//                     <span className="bell">🔔</span>
//                   </div>
//                   <button className="dropdown-btn">Actions ▾</button>
//                 </div>

//                 <div className="activity-buttons">
//                   <button className="btn-primary">Save</button>
//                   <button className="btn-secondary">Cancel</button>
//                 </div>
//               </div>
//             </div>

//             {/* Add new activity */}
//             <div className="activity-row gap-top">
//               <div className="activity-icon plus">+</div>
//               <div className="activity-strip">
//                 <div className="strip-title">Add a new activity</div>
//                 <div className="strip-sub">
//                   Plan your next action in the deal to never forget about the
//                   customer
//                 </div>
//               </div>
//             </div>

//             {/* Existing activity */}
//             <div className="activity-row">
//               <div className="activity-icon info">i</div>
//               <div className="activity-strip">
//                 <div className="strip-title">Activity1</div>
//                 <div className="strip-sub">
//                   Plan your next action in the deal to never forget about the
//                   customer
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Documents */}
//           <div className="documents-wrapper">
//             <div className="documents-header">
//               <span>Documents</span>
//               <button className="link-btn">Edit</button>
//             </div>
//             <div className="documents-body">
//               <div className="documents-row">
//                 {[1, 2, 3, 4].map((n) => (
//                   <div key={n} className="doc-card">
//                     <div className="doc-icon" />
//                     <div className="doc-label">Document {n}</div>
//                   </div>
//                 ))}

//                 <button className="doc-card add-doc">
//                   <span className="add-symbol">+</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= BOTTOM SECTIONS ================= */}

//       {/* CP Info */}
//       <div className="section dashed-top">
//         <div className="section-header">
//           <span>CP Information</span>
//           <button className="icon-round">+</button>
//         </div>
//         <div className="section-body">
//           <div className="field-inline">
//             <label>Referral Code:</label>
//             <input />
//           </div>
//         </div>
//       </div>

//       {/* Proposal Form */}
//       <div className="section dashed-top">
//         <div className="section-header">
//           <span>Proposal Form</span>
//           <button className="icon-round">+</button>
//         </div>
//         <div className="section-body">
//           <label className="attach-label">Attachment:</label>
//           <div className="attachment-box">
//             <span className="add-symbol">+</span>
//           </div>
//         </div>
//       </div>

//       {/* Additional Information */}
//       <div className="section dashed-top">
//         <div className="section-header">
//           <span>Additional Information</span>
//           <button className="icon-round">+</button>
//         </div>
//         <div className="section-body section-grid">
//           {/* left column */}
//           <div className="column">
//             <div className="field-full">
//               <label>Date of Birth</label>
//               <input />
//             </div>
//             <div className="field-full">
//               <label>Date of Anniversary</label>
//               <input />
//             </div>
//             <div className="field-full">
//               <label>Already a part of the family?</label>
//               <div className="inline-radio">
//                 <input type="radio" /> <span>Yes</span>
//               </div>
//             </div>
//             <div className="field-full">
//               <label>Project Name</label>
//               <input />
//             </div>
//             <div className="field-full">
//               <label>Visiting On Behalf</label>
//               <select>
//                 <option>Select</option>
//               </select>
//             </div>
//             <div className="field-full">
//               <label>Current Residence Ownership</label>
//               <select>
//                 <option>Select</option>
//               </select>
//             </div>
//             <div className="field-full">
//               <label>Current Residence type</label>
//               <select>
//                 <option>Select</option>
//               </select>
//             </div>
//             <div className="field-full">
//               <label>Family Size</label>
//               <select>
//                 <option>Select</option>
//               </select>
//             </div>
//             <div className="field-full">
//               <label>Possession desired in</label>
//               <select>
//                 <option>Select</option>
//               </select>
//             </div>
//           </div>

//           {/* right column */}
//           <div className="column">
//             <div className="field-full">
//               <label>Secondary Email</label>
//               <input />
//             </div>
//             <div className="field-full">
//               <label>Alternate Mobile</label>
//               <input />
//             </div>
//             <div className="field-full">
//               <label>Alternate Tel (Res)</label>
//               <input />
//             </div>
//             <div className="field-full">
//               <label>Alternate Tel (Off)</label>
//               <input />
//             </div>
//             <div className="field-full">
//               <label>Facebook</label>
//               <input />
//             </div>
//             <div className="field-full">
//               <label>Twitter</label>
//               <input />
//             </div>
//             <div className="field-full">
//               <label>LinkedIn</label>
//               <input />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Professional Information */}
//       <div className="section dashed-top">
//         <div className="section-header">
//           <span>Professional Information</span>
//           <button className="icon-round">+</button>
//         </div>
//         <div className="section-body section-grid">
//           <div className="column">
//             <div className="field-full">
//               <label>Occupation</label>
//               <select>
//                 <option>Select</option>
//               </select>
//             </div>
//             <div className="field-full">
//               <label>Name of the Organization</label>
//               <input />
//             </div>
//             <div className="field-full">
//               <label>Designation</label>
//               <select>
//                 <option>Select</option>
//               </select>
//             </div>
//           </div>
//           <div className="column">
//             <div className="field-full">
//               <label>Office Location</label>
//               <input />
//             </div>
//             <div className="field-full">
//               <label>Pin Code</label>
//               <input />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Address Information */}
//       <div className="section dashed-top">
//         <div className="section-header">
//           <span>Address Information</span>
//           <button className="icon-round">+</button>
//         </div>
//         <div className="section-body section-grid">
//           <div className="column">
//             <div className="field-full">
//               <label>Flat no. / Building</label>
//               <input defaultValue="Guwahati" />
//             </div>
//             <div className="field-full">
//               <label>Area</label>
//               <input />
//             </div>
//             <div className="field-full">
//               <label>Pin Code</label>
//               <input defaultValue="781003" />
//             </div>
//             <div className="field-full">
//               <label>City</label>
//               <input defaultValue="Kamrup" />
//             </div>
//           </div>
//           <div className="column">
//             <div className="field-full">
//               <label>State</label>
//               <input defaultValue="Assam" />
//             </div>
//             <div className="field-full">
//               <label>Country</label>
//               <input defaultValue="India" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer buttons */}
//       <div className="footer-buttons">
//         <button className="btn-secondary big">Cancel</button>
//         <button className="btn-primary big">Submit</button>
//       </div>
//     </div>
//   );
// };

// export default LeadStaticPage;

// src/pages/LeadStaticPage.jsx

// import React, { useEffect, useState, useRef } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import api from "../api/axiosInstance";
// import "./LeadStaticPage.css";

// const LeadStaticPage = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const leadId = searchParams.get("lead_id");

//   const [lead, setLead] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [activeTab, setActiveTab] = useState("activity");

//   // Activity (updates)
//   const [showActivityForm, setShowActivityForm] = useState(false);
//   const [activityForm, setActivityForm] = useState({
//     title: "",
//     info: "",
//     event_date: "",
//   });
//   const [savingActivity, setSavingActivity] = useState(false);

//   // Documents
//   const fileInputRef = useRef(null);
//   const [uploadingDoc, setUploadingDoc] = useState(false);

//   // ---------- Fetch lead on mount ----------
//   useEffect(() => {
//     if (!leadId) {
//       setError("Lead id missing in URL");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError("");

//     api
//       .get(`/sales/sales-leads/${leadId}/`, {
//         params: { include_all_stage: true },
//       })
//       .then((res) => setLead(res.data))
//       .catch((err) => {
//         console.error("Failed to load lead", err);
//         setError("Failed to load lead details.");
//       })
//       .finally(() => setLoading(false));
//   }, [leadId]);

//   // ---------- Derivations ----------
//   const fullName =
//     lead?.full_name ||
//     [lead?.first_name, lead?.last_name].filter(Boolean).join(" ") ||
//     "-";

//   const ownerName = lead?.current_owner_name || "-";
//   const mobile = lead?.mobile_number || "-";
//   const email = lead?.email || "-";
//   const statusName = lead?.status_name || "-";

//   const stages = lead?.lead_stages || [];
//   const activeStageId = lead?.current_stage_id || null;

//   const updates = lead?.updates || [];
//   const documents = lead?.documents || [];
//   const address = lead?.address || {};

//   // ---------- Helpers ----------
//   const handleActivityChange = (field, value) => {
//     setActivityForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleCreateActivity = async () => {
//     if (!lead) return;
//     if (!activityForm.title && !activityForm.info) {
//       alert("Please enter title or info");
//       return;
//     }

//     setSavingActivity(true);
//     try {
//       const payload = {
//         sales_lead: lead.id,
//         title: activityForm.title || "Activity",
//         info: activityForm.info || "",
//         event_date: activityForm.event_date || null,
//       };

//       const res = await api.post("/sales/sales-lead-updates/", payload);
//       const newUpdate = res.data;

//       // prepend in updates array
//       setLead((prev) => ({
//         ...prev,
//         updates: [newUpdate, ...(prev?.updates || [])],
//       }));

//       setActivityForm({ title: "", info: "", event_date: "" });
//       setShowActivityForm(false);
//     } catch (err) {
//       console.error("Failed to create update", err);
//       alert("Failed to save activity");
//     } finally {
//       setSavingActivity(false);
//     }
//   };

//   const handleAddDocClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file || !lead) return;

//     const formData = new FormData();
//     formData.append("sales_lead", lead.id);
//     formData.append("title", file.name);
//     formData.append("file", file);

//     setUploadingDoc(true);
//     try {
//       const res = await api.post(
//         "/sales/sales-lead-documents/",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       const newDoc = res.data;
//       setLead((prev) => ({
//         ...prev,
//         documents: [...(prev?.documents || []), newDoc],
//       }));
//     } catch (err) {
//       console.error("Failed to upload document", err);
//       alert("Failed to upload document");
//     } finally {
//       setUploadingDoc(false);
//       e.target.value = ""; // reset input
//     }
//   };

//   if (loading) {
//     return <div className="lead-page">Loading lead...</div>;
//   }

//   if (error) {
//     return (
//       <div className="lead-page">
//         <div style={{ color: "red", marginBottom: 12 }}>{error}</div>
//         <button className="btn-secondary" onClick={() => navigate(-1)}>
//           ← Back
//         </button>
//       </div>
//     );
//   }

//   if (!lead) {
//     return (
//       <div className="lead-page">
//         <div>No lead data found.</div>
//       </div>
//     );
//   }

//   return (
//     <div className="lead-page">
//       {/* ---------------- TOP HEADER ---------------- */}
//       <div className="lead-header">
//         <div className="lead-header-left">
//           <div className="lead-title">{fullName}</div>

//           <div className="lead-header-grid">
//             <div className="field-compact">
//               <label>Lead Owner:</label>
//               <input value={ownerName} readOnly />
//             </div>
//             <div className="field-compact">
//               <label>Mobile:</label>
//               <input value={mobile} readOnly />
//             </div>
//             <div className="field-compact">
//               <label>Email:</label>
//               <input value={email} readOnly />
//             </div>
//             <div className="field-compact">
//               <label>Lead Status:</label>
//               <input value={statusName} readOnly />
//             </div>
//           </div>
//         </div>

//         <div className="lead-header-right">
//           <div className="action-row-top">
//             <button className="card-btn">Inventory</button>
//             <button className="card-btn active">Book Flat</button>
//             <button className="card-btn">Payments</button>
//             <button className="card-btn">Payment Link</button>
//           </div>
//           <div className="action-row-bottom">
//             <button className="card-btn small">Send Feedback</button>
//             <button className="card-btn small">Save</button>
//           </div>
//         </div>
//       </div>

//       {/* ---------------- STAGE BAR ---------------- */}
//       <div className="lead-stages">
//         {stages.length === 0 && (
//           <div className="stage-item">
//             <span className="stage-label">No stages configured</span>
//           </div>
//         )}
//         {stages.map((stage, idx) => {
//           const isActive =
//             activeStageId != null
//               ? stage.id === activeStageId
//               : stage.is_won || idx === 0;

//           return (
//             <div
//               key={stage.id}
//               className={`stage-item ${isActive ? "stage-active" : ""}`}
//             >
//               <span className="stage-dot" />
//               <span className="stage-label">{stage.name}</span>
//             </div>
//           );
//         })}
//       </div>

//       {/* ---------------- MAIN CONTENT SPLIT ---------------- */}
//       <div className="content-split">
//         {/* LEFT – Lead Information box */}
//         <div className="panel panel-left">
//           <div className="panel-header">
//             <span>Lead Information</span>
//             <button className="link-btn">Edit</button>
//           </div>
//           <div className="panel-body blank-area">
//             <div className="field-compact">
//               <label>Project:</label>
//               <input
//                 value={lead.project_name || `#${lead.project}`}
//                 readOnly
//               />
//             </div>
//             <div className="field-compact">
//               <label>Budget:</label>
//               <input value={lead.budget ?? ""} readOnly />
//             </div>
//             <div className="field-compact">
//               <label>Company:</label>
//               <input value={lead.company || ""} readOnly />
//             </div>
//             <div className="field-compact">
//               <label>Purpose:</label>
//               <input value={lead.purpose_name || ""} readOnly />
//             </div>
//           </div>
//         </div>

//         {/* RIGHT – Activity / Documents */}
//         <div className="panel panel-right">
//           {/* Tabs */}
//           <div className="tabs">
//             <button
//               className={`tab ${activeTab === "activity" ? "active" : ""}`}
//               onClick={() => setActiveTab("activity")}
//             >
//               Activity
//             </button>
//             <button
//               className={`tab ${activeTab === "comment" ? "active" : ""}`}
//               onClick={() => setActiveTab("comment")}
//             >
//               Comment
//             </button>
//             <button className="tab">Booking</button>
//             <button className="tab">SMS</button>
//             <button className="tab">Email</button>
//             <button className="tab">Zoom</button>
//           </div>

//           {activeTab === "activity" && (
//             <>
//               {/* Activity form (new update) */}
//               {showActivityForm && (
//                 <div className="activity-wrapper">
//                   <div className="activity-row">
//                     <div className="activity-icon bubble" />
//                     <div className="activity-card">
//                       <div className="field-full">
//                         <label>Title</label>
//                         <input
//                           className="input-plain"
//                           value={activityForm.title}
//                           onChange={(e) =>
//                             handleActivityChange("title", e.target.value)
//                           }
//                         />
//                       </div>
//                       <div className="field-full">
//                         <label>Things to do</label>
//                         <textarea
//                           className="input-plain tall"
//                           value={activityForm.info}
//                           onChange={(e) =>
//                             handleActivityChange("info", e.target.value)
//                           }
//                         />
//                       </div>

//                       <div className="field-full">
//                         <label>Event Date</label>
//                         <input
//                           type="datetime-local"
//                           className="input-plain"
//                           value={activityForm.event_date}
//                           onChange={(e) =>
//                             handleActivityChange(
//                               "event_date",
//                               e.target.value || ""
//                             )
//                           }
//                         />
//                       </div>

//                       <div className="activity-buttons">
//                         <button
//                           type="button"
//                           className="btn-primary"
//                           onClick={handleCreateActivity}
//                           disabled={savingActivity}
//                         >
//                           {savingActivity ? "Saving..." : "Save"}
//                         </button>
//                         <button
//                           type="button"
//                           className="btn-secondary"
//                           onClick={() => {
//                             setShowActivityForm(false);
//                             setActivityForm({
//                               title: "",
//                               info: "",
//                               event_date: "",
//                             });
//                           }}
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Add new activity call-to-action */}
//               <div className="activity-wrapper">
//                 <div className="activity-row gap-top">
//                   <div className="activity-icon plus">+</div>
//                   <div
//                     className="activity-strip"
//                     onClick={() => setShowActivityForm(true)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <div className="strip-title">Add a new activity</div>
//                     <div className="strip-sub">
//                       Plan your next action in the deal to never forget about
//                       the customer
//                     </div>
//                   </div>
//                 </div>

//                 {/* Existing activities: updates */}
//                 {updates.map((u) => (
//                   <div key={u.id} className="activity-row">
//                     <div className="activity-icon info">i</div>
//                     <div className="activity-strip">
//                       <div className="strip-title">{u.title}</div>
//                       <div className="strip-sub">{u.info}</div>
//                       {u.event_date && (
//                         <div className="strip-sub small">
//                           Event: {u.event_date}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}

//                 {updates.length === 0 && (
//                   <div className="activity-row">
//                     <div className="activity-icon info">i</div>
//                     <div className="activity-strip">
//                       <div className="strip-title">
//                         No activities yet for this lead.
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}

//           {/* Documents */}
//           <div className="documents-wrapper">
//             <div className="documents-header">
//               <span>Documents</span>
//               {/* future: edit mode etc */}
//             </div>
//             <div className="documents-body">
//               <div className="documents-row">
//                 {documents.map((doc) => (
//                   <div key={doc.id} className="doc-card">
//                     <div className="doc-icon" />
//                     <div className="doc-label">
//                       {doc.file_url ? (
//                         <a
//                           href={doc.file_url}
//                           target="_blank"
//                           rel="noreferrer"
//                         >
//                           {doc.title || "Document"}
//                         </a>
//                       ) : (
//                         doc.title || "Document"
//                       )}
//                     </div>
//                   </div>
//                 ))}

//                 <button
//                   className="doc-card add-doc"
//                   onClick={handleAddDocClick}
//                   type="button"
//                   disabled={uploadingDoc}
//                 >
//                   <span className="add-symbol">
//                     {uploadingDoc ? "…" : "+"}
//                   </span>
//                 </button>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   style={{ display: "none" }}
//                   onChange={handleFileChange}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= BOTTOM SECTIONS ================= */}
//       {/* I’ve only wired Address with real data – baaki optional hai, static hi rehne do abhi */}

//       {/* Address Information */}
//       <div className="section dashed-top">
//         <div className="section-header">
//           <span>Address Information</span>
//           <button className="icon-round">+</button>
//         </div>
//         <div className="section-body section-grid">
//           <div className="column">
//             <div className="field-full">
//               <label>Flat no. / Building</label>
//               <input value={address.flat_or_building || ""} readOnly />
//             </div>
//             <div className="field-full">
//               <label>Area</label>
//               <input value={address.area || ""} readOnly />
//             </div>
//             <div className="field-full">
//               <label>Pin Code</label>
//               <input value={address.pincode || ""} readOnly />
//             </div>
//             <div className="field-full">
//               <label>City</label>
//               <input value={address.city || ""} readOnly />
//             </div>
//           </div>
//           <div className="column">
//             <div className="field-full">
//               <label>State</label>
//               <input value={address.state || ""} readOnly />
//             </div>
//             <div className="field-full">
//               <label>Country</label>
//               <input value={address.country || ""} readOnly />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer buttons */}
//       <div className="footer-buttons">
//         <button
//           className="btn-secondary big"
//           type="button"
//           onClick={() => navigate(-1)}
//         >
//           Cancel
//         </button>
//         <button className="btn-primary big" type="button">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LeadStaticPage;


import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import "./LeadStaticPage.css";

const LeadStaticPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const leadId = searchParams.get("lead_id");

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("activity");

  // Activity (updates)
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [activityForm, setActivityForm] = useState({
    title: "",
    info: "",
    event_date: "",
  });
  const [savingActivity, setSavingActivity] = useState(false);

  // Documents
  const fileInputRef = useRef(null);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [docTitle, setDocTitle] = useState("");

  // Stage change modal
  const [stageModal, setStageModal] = useState({
    open: false,
    stage: null,
  });
  const [savingStage, setSavingStage] = useState(false);

  // ---------- Fetch lead on mount ----------
  useEffect(() => {
    if (!leadId) {
      setError("Lead id missing in URL");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    api
      .get(`/sales/sales-leads/${leadId}/`, {
        params: { include_all_stage: true },
      })
      .then((res) => setLead(res.data))
      .catch((err) => {
        console.error("Failed to load lead", err);
        setError("Failed to load lead details.");
      })
      .finally(() => setLoading(false));
  }, [leadId]);

  // ---------- Derivations ----------
  const fullName =
    lead?.full_name ||
    [lead?.first_name, lead?.last_name].filter(Boolean).join(" ") ||
    "-";

  const ownerName = lead?.current_owner_name || "-";
  const mobile = lead?.mobile_number || "-";
  const email = lead?.email || "-";
  const statusName = lead?.status_name || "-";

  const stages = lead?.lead_stages || [];
  const stageHistory = lead?.stage_history || [];

  // active stage = latest stage_history entry (by event_date/created_at), else null
  let activeStageId = null;
  if (stageHistory.length > 0) {
    const sorted = [...stageHistory].sort((a, b) => {
      const aKey = a.event_date || a.created_at || "";
      const bKey = b.event_date || b.created_at || "";
      if (aKey < bKey) return -1;
      if (aKey > bKey) return 1;
      return (a.id || 0) - (b.id || 0);
    });
    activeStageId = sorted[sorted.length - 1].stage; // stage id
  }

  const activeStageOrder =
    activeStageId && stages.length
      ? stages.find((s) => s.id === activeStageId)?.order ?? null
      : null;

  const updates = lead?.updates || [];
  const documents = lead?.documents || [];
  const address = lead?.address || {};

  // ---------- Helpers: Activity ----------
  const handleActivityChange = (field, value) => {
    setActivityForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateActivity = async () => {
    if (!lead) return;
    if (!activityForm.title && !activityForm.info) {
      alert("Please enter title or info");
      return;
    }

    setSavingActivity(true);
    try {
      const payload = {
        sales_lead: lead.id,
        title: activityForm.title || "Activity",
        info: activityForm.info || "",
        event_date: activityForm.event_date || null,
      };

      const res = await api.post("/sales/sales-lead-updates/", payload);
      const newUpdate = res.data;

      // prepend in updates array
      setLead((prev) => ({
        ...prev,
        updates: [newUpdate, ...(prev?.updates || [])],
      }));

      setActivityForm({ title: "", info: "", event_date: "" });
      setShowActivityForm(false);
    } catch (err) {
      console.error("Failed to create update", err);
      alert("Failed to save activity");
    } finally {
      setSavingActivity(false);
    }
  };

  // ---------- Helpers: Documents ----------
  const handleAddDocClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // store file, open modal for title
    setPendingFile(file);
    // default title = filename without extension
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    setDocTitle(baseName);
    setDocModalOpen(true);

    // reset input
    e.target.value = "";
  };

  const handleCancelUploadDoc = () => {
    if (uploadingDoc) return;
    setDocModalOpen(false);
    setPendingFile(null);
    setDocTitle("");
  };

  const handleConfirmUploadDoc = async () => {
    if (!pendingFile || !leadId) return;

    const formData = new FormData();
    formData.append("sales_lead", leadId);
    formData.append("title", docTitle || pendingFile.name);
    formData.append("file", pendingFile);

    setUploadingDoc(true);
    try {
      const res = await api.post("/sales/sales-lead-documents/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newDoc = res.data;
      setLead((prev) => ({
        ...prev,
        documents: [...(prev?.documents || []), newDoc],
      }));
      setDocModalOpen(false);
      setPendingFile(null);
      setDocTitle("");
    } catch (err) {
      console.error("Failed to upload document", err);
      alert("Failed to upload document");
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleInventoryClick = () => {
  if (!lead) return;

  // your detail API already returns "project": 1
  const projectId = lead.project;

  if (!projectId) {
    console.warn("No project id on lead", lead);
    alert("Project is not linked for this lead.");
    return;
  }

  navigate(`/inventory-planning/?project_id=${projectId}`);
};


  // ---------- Helpers: Stage change ----------
  const handleStageClick = (stage) => {
    if (!lead) return;
    // agar same active stage pe click hai toh ignore
    if (activeStageId && stage.id === activeStageId) return;

    setStageModal({
      open: true,
      stage,
    });
  };

  const handleCancelStageChange = () => {
    if (savingStage) return;
    setStageModal({ open: false, stage: null });
  };

  const handleConfirmStageChange = async () => {
    if (!lead || !stageModal.stage) return;

    setSavingStage(true);
    try {
      const payload = {
        sales_lead: lead.id,
        stage: stageModal.stage.id,
        status: lead.status || null,
        sub_status: lead.sub_status || null,
        event_date: new Date().toISOString(),
        notes: "",
      };

      const res = await api.post("/sales/sales-lead-stages/", payload);
      const newHistory = res.data;

      // push new history entry
      setLead((prev) => ({
        ...prev,
        stage_history: [...(prev?.stage_history || []), newHistory],
      }));
    } catch (err) {
      console.error("Failed to change stage", err);
      alert("Failed to change stage");
    } finally {
      setSavingStage(false);
      setStageModal({ open: false, stage: null });
    }
  };

  // ---------- Rendering ----------
  if (loading) {
    return <div className="lead-page">Loading lead...</div>;
  }

  if (error) {
    return (
      <div className="lead-page">
        <div style={{ color: "red", marginBottom: 12 }}>{error}</div>
        <button className="btn-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="lead-page">
        <div>No lead data found.</div>
      </div>
    );
  }

  return (
    <div className="lead-page">
      {/* ---------------- TOP HEADER ---------------- */}
      <div className="lead-header">
        <div className="lead-header-left">
          <div className="lead-title">{fullName}</div>

          <div className="lead-header-grid">
            <div className="field-compact">
              <label>Lead Owner:</label>
              <input value={ownerName} readOnly />
            </div>
            <div className="field-compact">
              <label>Mobile:</label>
              <input value={mobile} readOnly />
            </div>
            <div className="field-compact">
              <label>Email:</label>
              <input value={email} readOnly />
            </div>
            <div className="field-compact">
              <label>Lead Status:</label>
              <input value={statusName} readOnly />
            </div>
          </div>
        </div>

        <div className="lead-header-right">
          <div className="action-row-top">
            <button className="card-btn" onClick={handleInventoryClick}>
              Inventory
            </button>
            <button className="card-btn active">Book Flat</button>
            <button className="card-btn">Payments</button>
            <button className="card-btn">Payment Link</button>
          </div>
          <div className="action-row-bottom">
            <button className="card-btn small">Send Feedback</button>
            <button className="card-btn small">Save</button>
          </div>
        </div>
      </div>

      {/* ---------------- STAGE BAR ---------------- */}
      <div className="lead-stages">
        {stages.length === 0 && (
          <div className="stage-item">
            <span className="stage-label">No stages configured</span>
          </div>
        )}
        {stages.map((stage, idx) => {
          let extraClass = "";

          if (activeStageId) {
            if (stage.id === activeStageId) {
              extraClass = "stage-active";
            } else if (
              activeStageOrder != null &&
              stage.order < activeStageOrder
            ) {
              extraClass = "stage-done"; // purane stage
            } else {
              extraClass = "stage-pending";
            }
          } else {
            // koi history nahi -> sirf first stage active
            extraClass = idx === 0 ? "stage-active" : "stage-pending";
          }

          return (
            <div
              key={stage.id}
              className={`stage-item ${extraClass}`}
              onClick={() => handleStageClick(stage)}
              style={{ cursor: "pointer" }}
            >
              <span className="stage-dot" />
              <span className="stage-label">{stage.name}</span>
            </div>
          );
        })}
      </div>

      {/* ---------------- MAIN CONTENT SPLIT ---------------- */}
      <div className="content-split">
        {/* LEFT – Lead Information box */}
        <div className="panel panel-left">
          <div className="panel-header">
            <span>Lead Information</span>
            <button className="link-btn">Edit</button>
          </div>
          <div className="panel-body blank-area">
            <div className="field-compact">
              <label>Project:</label>
              <input value={lead.project_name || `#${lead.project}`} readOnly />
            </div>
            <div className="field-compact">
              <label>Budget:</label>
              <input value={lead.budget ?? ""} readOnly />
            </div>
            <div className="field-compact">
              <label>Company:</label>
              <input value={lead.company || ""} readOnly />
            </div>
            <div className="field-compact">
              <label>Purpose:</label>
              <input value={lead.purpose_name || ""} readOnly />
            </div>
          </div>
        </div>

        {/* RIGHT – Activity / Documents */}
        <div className="panel panel-right">
          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === "activity" ? "active" : ""}`}
              onClick={() => setActiveTab("activity")}
            >
              Activity
            </button>
            <button
              className={`tab ${activeTab === "comment" ? "active" : ""}`}
              onClick={() => setActiveTab("comment")}
            >
              Comment
            </button>
            <button className="tab">Booking</button>
            <button className="tab">SMS</button>
            <button className="tab">Email</button>
            <button className="tab">Zoom</button>
          </div>

          {activeTab === "activity" && (
            <>
              {/* Activity form (new update) */}
              {showActivityForm && (
                <div className="activity-wrapper">
                  <div className="activity-row">
                    <div className="activity-icon bubble" />
                    <div className="activity-card">
                      <div className="field-full">
                        <label>Title</label>
                        <input
                          className="input-plain"
                          value={activityForm.title}
                          onChange={(e) =>
                            handleActivityChange("title", e.target.value)
                          }
                        />
                      </div>
                      <div className="field-full">
                        <label>Things to do</label>
                        <textarea
                          className="input-plain tall"
                          value={activityForm.info}
                          onChange={(e) =>
                            handleActivityChange("info", e.target.value)
                          }
                        />
                      </div>

                      <div className="field-full">
                        <label>Event Date</label>
                        <input
                          type="datetime-local"
                          className="input-plain"
                          value={activityForm.event_date}
                          onChange={(e) =>
                            handleActivityChange(
                              "event_date",
                              e.target.value || ""
                            )
                          }
                        />
                      </div>

                      <div className="activity-buttons">
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={handleCreateActivity}
                          disabled={savingActivity}
                        >
                          {savingActivity ? "Saving..." : "Save"}
                        </button>
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => {
                            setShowActivityForm(false);
                            setActivityForm({
                              title: "",
                              info: "",
                              event_date: "",
                            });
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Add new activity call-to-action */}
              <div className="activity-wrapper">
                <div className="activity-row gap-top">
                  <div className="activity-icon plus">+</div>
                  <div
                    className="activity-strip"
                    onClick={() => setShowActivityForm(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="strip-title">Add a new activity</div>
                    <div className="strip-sub">
                      Plan your next action in the deal to never forget about
                      the customer
                    </div>
                  </div>
                </div>

                {/* Existing activities: updates */}
                {updates.map((u) => (
                  <div key={u.id} className="activity-row">
                    <div className="activity-icon info">i</div>
                    <div className="activity-strip">
                      <div className="strip-title">{u.title}</div>
                      <div className="strip-sub">{u.info}</div>
                      {u.event_date && (
                        <div className="strip-sub small">
                          Event: {u.event_date}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {updates.length === 0 && (
                  <div className="activity-row">
                    <div className="activity-icon info">i</div>
                    <div className="activity-strip">
                      <div className="strip-title">
                        No activities yet for this lead.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Documents */}
          <div className="documents-wrapper">
            <div className="documents-header">
              <span>Documents</span>
            </div>
            <div className="documents-body">
              <div className="documents-row">
                {documents.map((doc) => {
                  const label =
                    doc.title && doc.title.trim()
                      ? doc.title.trim()
                      : "Untitled";

                  return (
                    <div key={doc.id} className="doc-card">
                      <div className="doc-icon" />
                      <div className="doc-label">
                        {doc.file_url ? (
                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {label}
                          </a>
                        ) : (
                          label
                        )}
                      </div>
                    </div>
                  );
                })}

                <button
                  className="doc-card add-doc"
                  onClick={handleAddDocClick}
                  type="button"
                  disabled={uploadingDoc}
                >
                  <span className="add-symbol">{uploadingDoc ? "…" : "+"}</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM SECTIONS ================= */}

      {/* Address Information */}
      <div className="section dashed-top">
        <div className="section-header">
          <span>Address Information</span>
          <button className="icon-round">+</button>
        </div>
        <div className="section-body section-grid">
          <div className="column">
            <div className="field-full">
              <label>Flat no. / Building</label>
              <input value={address.flat_or_building || ""} readOnly />
            </div>
            <div className="field-full">
              <label>Area</label>
              <input value={address.area || ""} readOnly />
            </div>
            <div className="field-full">
              <label>Pin Code</label>
              <input value={address.pincode || ""} readOnly />
            </div>
            <div className="field-full">
              <label>City</label>
              <input value={address.city || ""} readOnly />
            </div>
          </div>
          <div className="column">
            <div className="field-full">
              <label>State</label>
              <input value={address.state || ""} readOnly />
            </div>
            <div className="field-full">
              <label>Country</label>
              <input value={address.country || ""} readOnly />
            </div>
          </div>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="footer-buttons">
        <button
          className="btn-secondary big"
          type="button"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button className="btn-primary big" type="button">
          Submit
        </button>
      </div>

      {/* ---------- Stage change modal ---------- */}
      {stageModal.open && stageModal.stage && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-title">
              Move to "{stageModal.stage.name}"?
            </div>
            <div className="modal-body">
              Are you sure you want to move this lead to{" "}
              <strong>{stageModal.stage.name}</strong>?
            </div>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                type="button"
                onClick={handleCancelStageChange}
                disabled={savingStage}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                type="button"
                onClick={handleConfirmStageChange}
                disabled={savingStage}
              >
                {savingStage ? "Updating..." : "Yes, move"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Document title modal ---------- */}
      {docModalOpen && pendingFile && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-title">Add Document</div>
            <div className="modal-body">
              <div className="field-full">
                <label>Document Title</label>
                <input
                  className="input-plain"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                />
              </div>
              <div className="field-full" style={{ marginTop: 8 }}>
                <small>File: {pendingFile.name}</small>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                type="button"
                onClick={handleCancelUploadDoc}
                disabled={uploadingDoc}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                type="button"
                onClick={handleConfirmUploadDoc}
                disabled={uploadingDoc}
              >
                {uploadingDoc ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadStaticPage;
