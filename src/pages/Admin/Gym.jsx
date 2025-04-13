import React, { useRef, useMemo } from "react";
import { useFetchPosts } from "../../utils/FetchData";
import PostModal from "../../components/Admin/PostModal";
import logo from "../../assets/24-fitcamp-logo.png";
import Loading from "../../components/Loading/Loading";
import usePageTransition from "../../utils/usePageTransition";

import "./gym.css";

const Gym = () => {
  const { posts } = useFetchPosts();
  const { isPending, showContent } = usePageTransition(500);

  const displayPosts = useMemo(() => {
    return posts?.data?.map((post) => (
      <div className="post-items__container" key={post.id}>
        <div className="post-items-detail">
          <div className="post-detail">
            <img src={logo} alt="24-fit camp logo" loading="lazy" />
            <div className="post-details">
              <p>24-fit camp</p>
              <p className="post-date">{post.currDate}</p>
            </div>
          </div>
          <div className="post-menu">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
        </div>
        <div className="post-items">
          <span>{post.post}</span>
        </div>
      </div>
    ));
  }, [posts?.data]);
  const postRef = useRef(null);

  if (isPending || !showContent) return <Loading />;
  return (
    <section className="gym">
      <div className="gym-container">
        <div className="gym-overlay">
          <img src={logo} alt="24-fit camp logo" loading="lazy" />
        </div>
        <div className="new-post">
          <img src={logo} alt="24-fit camp logo" loading="lazy" />
          <button
            onClick={() => postRef?.current.showModal()}
            className="post__btn"
          >
            What do you want to let the members know?
          </button>
        </div>

        <div className="posts">
          <h4>Your Posts</h4>
          {displayPosts}
        </div>

        <PostModal postRef={postRef} />
      </div>
    </section>
  );
};

export default Gym;
