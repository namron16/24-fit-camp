import React from "react";
import "./postMenu.css";
import { useDeletePost } from "../../../utils/FetchData";

const PostMenu = ({ isActive, postId }) => {
  const { deletePost } = useDeletePost();

  const handleDeletePost = () => {
    deletePost(postId);
  };
  return (
    <div className={`card ${isActive ? "active-menu" : "inactive"}`}>
      <ul className="list">
        <li className="element">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7e8590"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-pencil"
          >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
            <path d="m15 5 4 4"></path>
          </svg>
          <button className="edit-post__btn">Edit</button>
        </li>
      </ul>
      <div className="separator"></div>
      <ul className="list">
        <li className="element delete">
          <svg
            className="lucide lucide-trash-2"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="#7e8590"
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            <line y2="17" y1="11" x2="10" x1="10"></line>
            <line y2="17" y1="11" x2="14" x1="14"></line>
          </svg>
          <button className="delete-post__btn" onClick={handleDeletePost}>
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PostMenu;
