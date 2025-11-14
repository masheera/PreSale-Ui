import { useState } from "react";

export default function LeadTabs() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "quotation", label: "Quotation" },
    { id: "inventory", label: "Inventory" },
    { id: "document", label: "Document" },
    { id: "channel-partner", label: "Channel Partner" },
    { id: "profile", label: "Profile" },
  ];

  return (
    <div className="lead-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`lead-tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}