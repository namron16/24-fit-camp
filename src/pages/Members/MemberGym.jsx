import React from "react";
import "./memberGym.css";
import Loading2 from "../../components/Loading/Loading2";
import usePageTransition from "../../utils/usePageTransition";

const MemberGym = () => {
  const { isPending, showContent } = usePageTransition(0);
  if (!showContent || isPending) return <Loading2 />;
  return (
    <section className="member-gym">
      <h1>Gym Points</h1>
    </section>
  );
};

export default MemberGym;
