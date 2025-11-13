// src/components/Navbar.jsx
import { Link } from "react-router-dom";
// import profileImg from "../assets/logo-small.png";

/* ---------- Inline SVG Icons (no external icon libs) ---------- */
const BellIcon = ({ className = "", size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    style={{ color: "white" }}
  >
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const GearIcon = ({ className = "", size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    style={{ color: "white" }}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 9 3.09V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const ProfileIcon = ({ className = "", size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    style={{ color: "white" }}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SearchIcon = ({ className = "", size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    style={{ color: "white" }}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

/* ---------- Navbar Component ---------- */
function Navbar({ onLogout }) {
  return (
    <>
      <nav
        className="custom-navbar"
        style={{
          margin: 0,
          padding: "12px 32px 12px 12px",
          width: "100%",
          backgroundColor: "#102a54",
          borderRadius: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Section */}
        <div className="d-flex align-items-center">
          {/* <img
            src={profileImg}
            alt="Profile"
            className="rounded-circle me-2"
            style={{ width: "60px", height: "60px", marginLeft: 0 }}
          /> */}
          <span
            className="text-white"
            style={{
              fontSize: "1.8rem",
              fontWeight: 600,
              fontFamily: "'Inter','Segoe UI','Roboto','Open Sans',sans-serif",
              letterSpacing: "-0.5px",
              marginLeft: 8,
              whiteSpace: "nowrap",
            }}
          >
            VibeConnect
          </span>
        </div>

        {/* Right Section */}
        <div className="ms-auto d-flex align-items-center gap-3">
          <SearchIcon className="icon" />
          <BellIcon className="icon" />
          <Link to="/setup" aria-label="Open Setup">
            <GearIcon className="icon" />
          </Link>
          <ProfileIcon className="icon" />
          <button onClick={onLogout} className="logout-btn" title="Logout">
            Logout
          </button>
        </div>
      </nav>

      {/* Merged Styles */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .custom-navbar {
          background-color: #102a54 !important;
          padding: 12px 32px 12px 12px;
          margin: 0;
          border: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          box-sizing: border-box;
        }

        .custom-navbar .d-flex {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .custom-navbar img.rounded-circle {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 50%;
          background: #fff;
          margin-left: 0;
        }

        .custom-navbar .text-white {
          color: #ffffff;
          font-size: 1.8rem;
          font-weight: 600;
          font-family: 'Inter','Segoe UI','Roboto','Open Sans',sans-serif;
          letter-spacing: -0.5px;
          white-space: nowrap;
          margin-left: 8px;
        }

        .custom-navbar .ms-auto {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .icon {
          width: 22px;
          height: 22px;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .icon:hover {
          color: #f1c40f;
          transform: translateY(-1px) scale(1.05);
        }

        .logout-btn {
          background-color: transparent;
          border: 1px solid #ffffff;
          color: #ffffff;
          padding: 6px 16px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin-left: 8px;
        }

        .logout-btn:hover {
          background-color: #ffffff;
          color: #102a54;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(255,255,255,0.2);
        }

        .logout-btn:active {
          transform: translateY(0);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .custom-navbar {
            padding: 10px 16px 10px 8px;
          }

          .custom-navbar img.rounded-circle {
            width: 48px;
            height: 48px;
          }

          .custom-navbar .text-white {
            font-size: 1.3rem;
          }

          .icon {
            width: 20px;
            height: 20px;
          }

          .custom-navbar .ms-auto {
            gap: 14px;
          }
        }

        @media (max-width: 480px) {
          .custom-navbar {
            padding: 8px 12px 8px 6px;
          }

          .custom-navbar img.rounded-circle {
            width: 40px;
            height: 40px;
          }

          .custom-navbar .text-white {
            font-size: 1.1rem;
          }

          .icon {
            width: 18px;
            height: 18px;
          }

          .custom-navbar .ms-auto {
            gap: 10px;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
