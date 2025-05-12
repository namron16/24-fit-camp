import React from "react";


const NewPostButton = ({ onClick }) => {
  return (
    <div className="new-post">
      <button onClick={onClick} className="post__btn">
        <i className="fa-solid fa-up-right-from-square"></i>
        Create Post
      </button>
    </div>
  );
};

export default NewPostButton;
