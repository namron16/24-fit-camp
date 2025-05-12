import React from "react";
import "./memberGym.css";
import { useFetchPosts } from "../../utils/FetchData";
import Loading2 from "../../components/Loading/Loading2";
import usePageTransition from "../../utils/usePageTransition";
import PostCards from "../../components/members/PostCards";

const MemberGym = () => {
  const { posts } = useFetchPosts();

  const gymPosts = posts?.data;
  const { isPending, showContent } = usePageTransition(0);
  if (!showContent || isPending) return <Loading2 />;
  return (
    <section className="member-gym">
      <h1>Gym Posts</h1>
      <div className="gym-posts__container">
        <div className="gym-posts">
          {gymPosts?.map((post) => (
            <PostCards key={post.id} post={post} date={post.currDate} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemberGym;
