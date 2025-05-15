import React, { useState } from "react";
import "./postmodal.css";
import { v4 as uuidV4 } from "uuid";

const PostModal = ({ postRef }) => {
  return <dialog ref={postRef} className="postModal"></dialog>;
};

export default PostModal;
