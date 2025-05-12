import React, { useRef, useMemo, useCallback } from "react";
import { useFetchPosts } from "../../utils/FetchData";
import PostModal from "../../components/Admin/GymComponent/PostModal";
import Loading from "../../components/Loading/Loading";
import usePageTransition from "../../utils/usePageTransition";
import NewPostButton from "../../components/Admin/GymComponent/NewPostButton";
import PostsList from "../../components/Admin/GymComponent/PostList";
import logo from "../../assets/24-fitcamp-logo.png";

import "./gym.css";

const Gym = () => {
  const { posts } = useFetchPosts();
  const { isPending, showContent } = usePageTransition(500);
  const postRef = useRef(null);

  const openPostModal = useCallback(() => {
    postRef?.current?.showModal();
  }, []);

  const logoElement = useMemo(
    () => <img src={logo} alt="24-fit camp logo" loading="lazy" />,
    []
  );

  if (isPending || !showContent) return <Loading />;

  return (
    <section className="gym">
      <div className="gym-container">
        <div className="gym-overlay">{logoElement}</div>

        <NewPostButton onClick={openPostModal} />

        <PostsList posts={posts?.data} />

        <PostModal postRef={postRef} />
      </div>
    </section>
  );
};

export default Gym;
