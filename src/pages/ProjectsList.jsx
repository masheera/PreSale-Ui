import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { ProjectAPI } from "../api/endpoints";
import SalesSubnav from "../components/SalesSubnav";
import "./ProjectsList.css";

export default function ProjectsList() {
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
      if (ProjectAPI?.list) {
        data = await ProjectAPI.list(params);
      } else {
        const r = await axiosInstance.get("client/projects/", { params });
        data = r.data;
      }
      const items = Array.isArray(data) ? data : data.results ?? [];
      setRows(items);
      setCount(Array.isArray(data) ? items.length : data.count ?? items.length);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(count / 10)), [count]);

  // Subnav state (highlight "projects" on this page)
  const [section, setSection] = useState("pre");
  const [activeItem, setActiveItem] = useState("projects");

  // If you want subnav clicks to navigate between pages, uncomment and map keys:
  // const handleSubnavNavigate = (key) => {
  //   setActiveItem(key);
  //   if (key === "master-setup") navigate("/setup?open=project");
  //   if (key === "projects") navigate("/sales/projects");
  //   // add more keys/routes as needed
  // };

  return (
    <div className="projects-page">
      {/* Sales sub-navigation */}
      <SalesSubnav
        section={section}
        active={activeItem}
        onSectionChange={setSection}
        onNavigate={setActiveItem}
        // onNavigate={handleSubnavNavigate} // <- use this instead if you want routing
      />

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
            placeholder="Search projects…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchList({ q, page: 1 })}
          />
        </div>

        <button
          className="btn-primary"
          onClick={() =>
            navigate(
              `/setup?open=project&hideNav=1&return=${encodeURIComponent(
                "/sales/projects"
              )}`
            )
          }
        >
          Add
        </button>
      </div>

      <div className="pagination-hint">
        {count
          ? `${(page - 1) * 10 + 1}-${Math.min(page * 10, count)} of ${count}`
          : "0 of 0"}
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 140 }}>Action</th>
              <th>Project Name</th>
              <th>Developer Name</th>
              <th>Total Inventory</th>
              <th>Amenities List</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>Loading…</td>
              </tr>
            ) : rows.length ? (
              rows.map((p) => (
                <tr key={p.id}>
                  <td className="row-actions">
                    <button
                      title="Edit"
                      className="icon-btn"
                      onClick={() =>
                        navigate(
                          `/setup?open=project&hideNav=1&return=${encodeURIComponent(
                            "/sales/projects"
                          )}#edit-${p.id}`
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
                  <td>{p.name}</td>
                  <td>{p.developer || "-"}</td>
                  <td>{p.total_inventory ?? p.units_count ?? "-"}</td>
                  <td>
                    {Array.isArray(p.amenities_list) && p.amenities_list.length
                      ? p.amenities_list.join(", ")
                      : p.amenities || "-"}
                  </td>
                  <td>{p.notes || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No projects found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pager">
        <button
          disabled={page <= 1}
          onClick={() => {
            setPage((p) => p - 1);
            fetchList({ page: page - 1 });
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
            setPage((p) => p + 1);
            fetchList({ page: page + 1 });
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}
