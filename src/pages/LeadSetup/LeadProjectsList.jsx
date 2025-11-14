import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LeadProjectsList.css";

export default function LeadProjectsList() {
  const navigate = useNavigate();
  
  // Static dummy data
  const [leadSources] = useState([
    {
      id: 1,
      sourceName: "Website",
      subSources: "Google Search",
      type: "Apartment",
      createdBy: "Bob Smith",
      createdDate: "21-04-2025",
    },
    {
      id: 2,
      sourceName: "Referral",
      subSources: "Direct Traffic",
      type: "Commercial",
      createdBy: "Jane Doe",
      createdDate: "20-04-2025",
    },
    {
      id: 3,
      sourceName: "Social Media",
      subSources: "Facebook Ads",
      type: "Residential",
      createdBy: "John Smith",
      createdDate: "19-04-2025",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter data based on search
  const filteredData = leadSources.filter((item) =>
    item.sourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subSources.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleEdit = (id) => {
    console.log("Edit lead source:", id);
    alert(`Edit lead source ${id} (Feature coming soon)`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead source?")) {
      console.log("Delete lead source:", id);
      alert(`Delete lead source ${id} (Feature coming soon)`);
    }
  };

  const handleView = (id) => {
    console.log("View lead source:", id);
    alert(`View lead source ${id} (Feature coming soon)`);
  };

  const handleAdd = () => {
    navigate("/lead-setup?open=source");
  };

  return (
    <div className="projects-list-page">
      <div className="projects-list-container">
        {/* Header */}
        <div className="list-header">
          <div className="search-section">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search lead sources..."
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
                <th>Action</th>
                <th>Source Name</th>
                <th>Sub Sources</th>
                <th>Type</th>
                <th>Created By</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn edit-btn"
                          onClick={() => handleEdit(item.id)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(item.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                        <button
                          className="action-btn view-btn"
                          onClick={() => handleView(item.id)}
                          title="View"
                        >
                          👁️
                        </button>
                      </div>
                    </td>
                    <td>{item.sourceName}</td>
                    <td>{item.subSources}</td>
                    <td>{item.type}</td>
                    <td>{item.createdBy}</td>
                    <td>{item.createdDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "40px" }}>
                    No lead sources found
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