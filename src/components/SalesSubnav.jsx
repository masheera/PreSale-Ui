// src/components/SalesSubnav.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./SalesSubnav.css";

export default function SalesSubnav({
  section = "pre", 
  active = "master-setup", 
  onSectionChange, 
  onNavigate,
}) {
  const navigate = useNavigate();

  const PRIMARY_TABS = [
    { key: "pre", label: "Pre Sales" },
    { key: "post", label: "Post Sales" },
  ];

  const SECONDARY_ITEMS = [
    { key: "dashboard", label: "Dashboard" },
    { key: "master-setup", label: "Master Setup" },
    { key: "inventory", label: "Inventory" },
    { key: "lead-sources", label: "Lead Sources Setup" },
    { key: "sales-exec", label: "Sales Executive Setup" },
    { key: "cost-quotation", label: "Cost Sheet Quotation Setup" },
    { key: "document-setup", label: "Document Setup" },
    { key: "channel-partner", label: "Channel Partner Setup" },
  ];

  const handleSecondaryClick = (key) => {
    onNavigate && onNavigate(key);

    if (key === "master-setup") {
      navigate("/sales/projects");
    }

    if (key === "lead-sources") {
      navigate("/Sale-Add-Lead");
    }

    if (key === "inventory") {
      navigate("/inventory/list");
    }

    // /sales/leads
    // Example extras you can enable:
    // else if (key === "dashboard") navigate("/sales/dashboard");
    // else if (key === "inventory") navigate("/sales/inventory");
  };

  return (
    <nav className="sales-subnav" aria-label="Sales sub-navigation">
      {/* Row 1: Pre/Post Sales */}
      <div className="sales-subnav__primary">
        {PRIMARY_TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`subnav-link ${section === t.key ? "is-active" : ""}`}
            onClick={() => onSectionChange && onSectionChange(t.key)}
          >
            {t.label}
            <span className="active-underline" aria-hidden />
          </button>
        ))}
      </div>

      {/* Row 2: Section items */}
      <div className="sales-subnav__secondary">
        {SECONDARY_ITEMS.map((it) => (
          <button
            key={it.key}
            type="button"
            title={it.label}
            className={`subnav-link ${active === it.key ? "is-active" : ""}`}
            onClick={() => handleSecondaryClick(it.key)}
          >
            {it.label}
            <span className="active-underline" aria-hidden />
          </button>
        ))}
      </div>
    </nav>
  );
}
