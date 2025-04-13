import React from "react";
import { Link } from "react-router-dom";
import "./actionbtn.css";
const ActionBtn = ({ handleDelete, paramsId }) => {
  return (
    <label className="popup">
      <input type="checkbox" />
      <div className="burger" tabIndex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className="popup-window">
        <legend>Actions</legend>
        <ul>
          <hr />
          <li>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <Link to={`${paramsId}`}>
                <span>View</span>
              </Link>
            </button>
          </li>
          <li>
            <button>
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                height="14"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
              </svg>
              <span>Edit</span>
            </button>
          </li>
          <hr />
          <li>
            <button>
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                height="14"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line y2="18" x2="6" y1="6" x1="18"></line>
                <line y2="18" x2="18" y1="6" x1="6"></line>
              </svg>
              <span onClick={() => handleDelete(paramsId)}>Delete</span>
            </button>
          </li>
        </ul>
      </nav>
    </label>
  );
};

export default ActionBtn;
