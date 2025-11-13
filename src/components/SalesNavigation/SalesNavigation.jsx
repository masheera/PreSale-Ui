import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SalesNavigation.css";

export default function SalesNavigation() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("pre-sales");
  const [activeTab, setActiveTab] = useState("master-setup");

  // Primary section tabs
  const sections = [
    { id: "pre-sales", label: "Pre Sales" },
    { id: "post-sales", label: "Post Sales" },
  ];

  // Secondary navigation items
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", route: "/sales/dashboard" },
    { id: "master-setup", label: "Master Setup", route: "/sales/projects" },
    { id: "inventory", label: "Inventory Tracking", route: "/sales/inventory" },
    { id: "lead-sources", label: "Lead Sources Setup", route: "/sales/lead-sources" },
    { id: "sales-executive", label: "Sales Executive Setup", route: "/sales/executives" },
    { id: "cost-quotation", label: "Cost Sheet Quotation Setup", route: "/sales/quotations" },
    { id: "document-setup", label: "Document Setup", route: "/sales/documents" },
    { id: "channel-partner", label: "Channel Partner Setup", route: "/sales/partners" },
  ];

  const handleTabClick = (itemId, route) => {
    setActiveTab(itemId);
    navigate(route);
  };

  return (
    <nav className="sales-navigation">
      {/* Primary Tabs: Pre Sales / Post Sales */}
      <div className="sales-navigation__primary">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={`nav-section-btn ${
              activeSection === section.id ? "active" : ""
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Secondary Tabs: Dashboard, Master Setup, etc. */}
      <div className="sales-navigation__secondary">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-tab-btn ${activeTab === item.id ? "active" : ""}`}
            onClick={() => handleTabClick(item.id, item.route)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
