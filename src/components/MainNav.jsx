import React, { useState } from "react";
import "./MainNav.css";

const MainNav = () => {
  const [activeTab, setActiveTab] = useState("pre-sales");
  const [activeSubNav, setActiveSubNav] = useState("master-setup");

  return (
    <div className="main-nav-wrapper">
      {/* Top Navigation */}
      <div className="top-nav">
        <div className="top-nav-content">
          <button className="nav-back-btn">
            <svg
              className="icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="nav-text">Setup</span>
          <span className="nav-separator">◄◄</span>
          <span className="nav-text">Pre/Post Sales</span>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "pre-sales" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("pre-sales")}
          >
            Pre Sales
          </button>
          <button
            className={`tab ${activeTab === "post-sales" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("post-sales")}
          >
            Post Sales
          </button>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="sub-nav">
        <div className="sub-nav-content">
          <button
            className={`sub-nav-item ${
              activeSubNav === "dashboard" ? "sub-nav-active" : ""
            }`}
            onClick={() => setActiveSubNav("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`sub-nav-item ${
              activeSubNav === "master-setup" ? "sub-nav-active" : ""
            }`}
            onClick={() => setActiveSubNav("master-setup")}
          >
            Master Setup
          </button>
          <button
            className={`sub-nav-item ${
              activeSubNav === "inventory" ? "sub-nav-active" : ""
            }`}
            onClick={() => setActiveSubNav("inventory")}
          >
            Inventory Tracking
          </button>
          <button
            className={`sub-nav-item ${
              activeSubNav === "lead-sources" ? "sub-nav-active" : ""
            }`}
            onClick={() => setActiveSubNav("lead-sources")}
          >
            Lead Sources Setup
          </button>
          <button
            className={`sub-nav-item ${
              activeSubNav === "sales-executive" ? "sub-nav-active" : ""
            }`}
            onClick={() => setActiveSubNav("sales-executive")}
          >
            Sales Executive Setup
          </button>
          <button
            className={`sub-nav-item ${
              activeSubNav === "cost-sheet" ? "sub-nav-active" : ""
            }`}
            onClick={() => setActiveSubNav("cost-sheet")}
          >
            Cost Sheet Quotation Setup
          </button>
          <button
            className={`sub-nav-item ${
              activeSubNav === "document" ? "sub-nav-active" : ""
            }`}
            onClick={() => setActiveSubNav("document")}
          >
            Document Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
