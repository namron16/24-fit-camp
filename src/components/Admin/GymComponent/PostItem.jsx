import React, { useState } from "react";
import logo from "../../../assets/24-fitcamp-logo.png";
import PostMenu from "./PostMenu";

const PostItem = ({ post }) => {
  const [isActive, setActive] = useState(false);

  const handleActive = () => {
    setActive(!isActive);
  };

  return (
    <div className="post-items__container" key={post.id}>
      <div className="post-items-detail">
        <div className="post-detail">
          <img src={logo} alt="24-fit camp logo" loading="lazy" />
          <div className="post-details">
            <p>{post.author}</p>
            <p className="post-date">{post.currDate}</p>
          </div>
        </div>
        <div className="post-menu">
          <button onClick={handleActive}>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
          <PostMenu isActive={isActive} postId={post.id} />
        </div>
      </div>
      <div className="post-items">
        <span>{post.post}</span>
      </div>
    </div>
  );
};

export default PostItem;
