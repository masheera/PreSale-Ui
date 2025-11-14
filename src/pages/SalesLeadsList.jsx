// src/pages/SalesLeadsList.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { LeadAPI } from "../api/endpoints"; // we'll add this below
import SalesSubnav from "../components/SalesSubnav";
import "./ProjectsList.css"; // reuse same styling

export default function SalesLeadsList() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const fetchList = async (opts = {}) => {
    setLoading(true);
    try {
      const params = { search: opts.q ?? q, page: opts.page ?? page };

      let data;
      if (LeadAPI?.list) {
        // preferred: centralized in endpoints.js
        data = await LeadAPI.list(params);
      } else {
        // fallback: update this URL to your actual leads endpoint
        const r = await axiosInstance.get("leadManagement/v2/sales-leads/", {
          params,
        });
        data = r.data;
      }

      const items = Array.isArray(data) ? data : data.results ?? [];
      setRows(items);
      setCount(Array.isArray(data) ? items.length : data.count ?? items.length);
    } catch (e) {
      console.error("Failed to load leads", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(count / 10)), [count]);

  // Subnav state – highlight "leads" instead of "projects"
  const [section, setSection] = useState("pre");
  const [activeItem, setActiveItem] = useState("leads");

  return (
    <div className="projects-page">
      {/* Top Sales subnav */}
      <SalesSubnav
        section={section}
        active={activeItem}
        onSectionChange={setSection}
        onNavigate={setActiveItem}
      />

      {/* Toolbar: search + Add button */}
      <div className="projects-toolbar">
        <div className="search-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path
              d="M21 21l-4.3-4.3M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <input
            className="search-input"
            placeholder="Search leads…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchList({ q, page: 1 })}
          />
        </div>

        {/* Add → open SaleAddLead form */}
        <button
          className="btn-primary"
          onClick={() => navigate("/Sale-Add-Lead")}
        >
          Add
        </button>
      </div>

      {/* "1–10 of 34" style text */}
      <div className="pagination-hint">
        {count
          ? `${(page - 1) * 10 + 1}-${Math.min(page * 10, count)} of ${count}`
          : "0 of 0"}
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 140 }}>Action</th>
              <th>Lead ID</th>
              <th>Lead Name</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Source</th>
              <th>Project</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10}>Loading…</td>
              </tr>
            ) : rows.length ? (
              rows.map((lead) => {
                const leadId = lead.lead_code || lead.code || lead.id;
                const leadName =
                  lead.lead_name ||
                  [lead.first_name, lead.last_name].filter(Boolean).join(" ") ||
                  "-";
                const contact =
                  lead.mobile_number ||
                  lead.contact_number ||
                  lead.phone ||
                  "-";
                const email = lead.email || "-";
                const source =
                  lead.source_name ||
                  lead.lead_source_name ||
                  lead.lead_source?.name ||
                  "-";
                const project = lead.project_name || lead.project?.name || "-";
                const budget =
                  lead.budget ||
                  lead.budget_min ||
                  lead.estimated_budget ||
                  "-";
                const status =
                  lead.status_name ||
                  lead.lead_status?.name ||
                  lead.stage_name ||
                  "-";
                const assignedTo =
                  lead.assigned_to_name ||
                  lead.assign_to_name ||
                  lead.assign_to?.name ||
                  "-";

                return (
                  <tr key={lead.id}>
                    <td className="row-actions">
                      <button
                        title="Edit"
                        className="icon-btn"
                        onClick={() =>
                          navigate(
                            `/Sale-Add-Lead?lead_id=${encodeURIComponent(
                              lead.id
                            )}`
                          )
                        }
                      >
                        ✏️
                      </button>
                      <button title="Delete" className="icon-btn">
                        🗑️
                      </button>
                      <button title="View" className="icon-btn">
                        👁️
                      </button>
                    </td>
                    <td>{leadId}</td>
                    <td>{leadName}</td>
                    <td>{contact}</td>
                    <td>{email}</td>
                    <td>{source}</td>
                    <td>{project}</td>
                    <td>{budget}</td>
                    <td>{status}</td>
                    <td>{assignedTo}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={10}>No leads found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pager arrows bottom-right style */}
      <div className="pager">
        <button
          disabled={page <= 1}
          onClick={() => {
            const next = page - 1;
            setPage(next);
            fetchList({ page: next });
          }}
        >
          ‹
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => {
            const next = page + 1;
            setPage(next);
            fetchList({ page: next });
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}
