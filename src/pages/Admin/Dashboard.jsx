import React from "react";
import Statistics from "../../components/Admin/Statistics";
import Loading from "../../components/Loading/Loading";
import usePageTransition from "../../hooks/usePageTransition";
const Dashboard = () => {
  const { isPending, showContent } = usePageTransition(300);

  if (isPending || !showContent) return <Loading />;
  return (
    <section>
      <Statistics />
    </section>
  );
};

export default Dashboard;
