import { useState, useEffect } from "react";

export function useLeadSetupData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminIdForScope, setAdminIdForScope] = useState("");

  // Static dummy data
  const [leadSetup] = useState({
    statuses: {
      lead: [
        { code: "NEW", label: "New" },
        { code: "CONTACTED", label: "Contacted" },
        { code: "QUALIFIED", label: "Qualified" },
        { code: "CONVERTED", label: "Converted" },
        { code: "LOST", label: "Lost" },
      ],
    },
    lookups: {
      classifications: [
        { id: 1, name: "Hot Lead", code: "HOT" },
        { id: 2, name: "Warm Lead", code: "WARM" },
        { id: 3, name: "Cold Lead", code: "COLD" },
      ],
      sources: [
        { id: 1, name: "Website", code: "WEBSITE" },
        { id: 2, name: "Referral", code: "REFERRAL" },
        { id: 3, name: "Social Media", code: "SOCIAL" },
      ],
    },
  });

  const [leadScope] = useState({
    projects: [
      { id: 1, name: "Grand Heights Residencies" },
      { id: 2, name: "Ocean View Towers" },
      { id: 3, name: "Urban Living Complex" },
    ],
    units: [
      { id: 1, name: "Unit 101", project: 1 },
      { id: 2, name: "Unit 102", project: 1 },
      { id: 3, name: "Unit 201", project: 2 },
    ],
  });

  const [users] = useState([
    { id: 1, username: "admin01", role: "ADMIN" },
    { id: 2, username: "sales01", role: "SALES" },
    { id: 3, username: "sales02", role: "SALES" },
  ]);

  // Derived data
  const projects = leadScope.projects || [];
  const units = leadScope.units || [];
  const isStaff = false; // Change to true if needed

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Reload function (does nothing for now)
  const reload = () => {
    console.log("Reload called (static mode - no actual reload)");
  };

  // Handle load scope for admin (does nothing for now)
  const handleLoadScopeForAdmin = () => {
    console.log("Load admin scope called (static mode)");
    alert(`Loading scope for admin ID: ${adminIdForScope}`);
  };

  return {
    leadSetup,
    leadScope,
    loading,
    error,
    isStaff,
    adminIdForScope,
    setAdminIdForScope,
    handleLoadScopeForAdmin,
    reload,
    projects,
    units,
    users,
  };
}