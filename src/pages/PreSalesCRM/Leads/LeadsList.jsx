import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LeadsList.css";

export default function LeadsList() {
  const navigate = useNavigate();
  
  // Static dummy data
  const [leads] = useState([
    {
      id: "L001",
      leadName: "John Doe",
      contactNumber: "9876543210",
      email: "john.doe@email.com",
      source: "Website",
      project: "Grand Heights",
      budget: "₹50,00,000",
      status: "New",
      assignedTo: "Bob Smith",
    },
    {
      id: "L002",
      leadName: "Jane Smith",
      contactNumber: "9876543211",
      email: "jane.smith@email.com",
      source: "Referral",
      project: "Ocean View",
      budget: "₹75,00,000",
      status: "Contacted",
      assignedTo: "Alice Johnson",
    },
    {
      id: "L003",
      leadName: "Mike Johnson",
      contactNumber: "9876543212",
      email: "mike.j@email.com",
      source: "Social Media",
      project: "Urban Living",
      budget: "₹1,00,00,000",
      status: "Qualified",
      assignedTo: "Bob Smith",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter data based on search
  const filteredData = leads.filter((item) =>
    item.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.contactNumber.includes(searchQuery) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleAdd = () => {
    navigate("/leads/new");
  };

  const handleView = (id) => {
    navigate(`/leads/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/leads/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      console.log("Delete lead:", id);
      alert("Delete functionality coming soon");
    }
  };

  return (
    <div className="leads-list-page">
      <div className="leads-list-container">
        {/* Header */}
        <div className="list-header">
          <div className="search-section">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <button className="btn-add" onClick={handleAdd}>
              Add
            </button>
          </div>

          <div className="pagination-info">
            {filteredData.length > 0 ? (
              <>
                {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of{" "}
                {filteredData.length}
              </>
            ) : (
              "No results"
            )}
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ❮
            </button>
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              ❯
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Lead Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Source</th>
                <th>Project</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.id}</td>
                    <td>{lead.leadName}</td>
                    <td>{lead.contactNumber}</td>
                    <td>{lead.email}</td>
                    <td>{lead.source}</td>
                    <td>{lead.project}</td>
                    <td>{lead.budget}</td>
                    <td>
                      <span className={`status-badge status-${lead.status.toLowerCase()}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td>{lead.assignedTo}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn view-btn"
                          onClick={() => handleView(lead.id)}
                          title="View"
                        >
                          👁️
                        </button>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => handleEdit(lead.id)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(lead.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center", padding: "40px" }}>
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}