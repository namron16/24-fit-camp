import React, { Suspense } from "react";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { useFetchMembersDetail } from "../../utils/FetchData";
import { NavLink } from "react-router-dom";

const MemberDetails = () => {
  const { memberId } = useParams();
  const { memberDetails } = useFetchMembersDetail(memberId);

  return (
    <section className="member-details">
      <Suspense fallback={<Loading />}>
        <NavLink to=".." relative="path">
          <span>back to members</span>
        </NavLink>
        <h1>Member Detail</h1>
        <h1>{memberDetails?.data?.name}</h1>
      </Suspense>
    </section>
  );
};

export default MemberDetails;
