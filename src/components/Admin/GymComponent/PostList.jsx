import React from "react";
import PostItem from "./PostItem";

const PostsList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div className="posts">
      <span className="post-title">Posts</span>
      {[...posts].reverse().map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
