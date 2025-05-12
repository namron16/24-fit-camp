import React, { useState } from "react";
import "./postmodal.css";
import logo from "../../../assets/24-fitcamp-logo.png";
import { useAddNewPost } from "../../../utils/FetchData";
import { v4 as uuidV4 } from "uuid";

const PostModal = ({ postRef }) => {
  const { addNewPost } = useAddNewPost();
  const [post, setPost] = useState({
    post: "",
  });

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const currDate = `${year}-${month}-${day}`;

  const handleAddPost = (e) => {
    e.preventDefault();
    const newPost = { ...post, id: uuidV4(), currDate, author: "24 Fit camp" };
    addNewPost(newPost);
    postRef.current?.close();
    setPost({ post: "" });
  };
  return (
    <dialog ref={postRef} className="postModal">
      <div className="post-modal-detail">
        <span
          onClick={() => postRef.current?.close()}
          className="close-post-modal"
        >
          {" "}
          <i className="fa-solid fa-circle-xmark"></i>
        </span>
        <img src={logo} alt="24-fit-camp logo" loading="lazy" />
        <span>24-fit camp</span>
      </div>
      <input
        type="text"
        name="post"
        placeholder="what's on your mind, admin?"
        value={post.post}
        onChange={(e) => setPost({ ...post, post: e.target.value })}
      />
      <div className="post-img-vid">
        <i className="fa-solid fa-images post-img"></i>
        <i className="fa-solid fa-video post-vid"></i>
      </div>
      <button
        className={`add-post ${
          post.post.trim().length > 0 ? "active-post-btn" : ""
        }`}
        disabled={post.post.trim().length === 0}
        onClick={(e) => {
          handleAddPost(e);
        }}
      >
        Post
      </button>
    </dialog>
  );
};

export default PostModal;
