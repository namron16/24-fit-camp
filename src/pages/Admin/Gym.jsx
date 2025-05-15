import React, { useRef, useMemo, useCallback } from "react";
import { useFetchPosts } from "../../utils/FetchData";
import PostModal from "../../components/Admin/GymComponent/PostModal";
import Loading from "../../components/Loading/Loading";
import usePageTransition from "../../utils/usePageTransition";
import "./gym.css";

const Gym = () => {
  const { isPending, showContent } = usePageTransition(500);

  if (isPending || !showContent) return <Loading />;

  return (
    <section className="gym">
      <h1>Gym Page</h1>
    </section>
  );
};

export default Gym;
