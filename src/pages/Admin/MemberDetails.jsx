import React from "react";
import { useParams } from "react-router-dom";
import { FetchMembersDetail } from "../../utils/FetchData";
import Loading from "../../components/Loading/Loading";
import { NavLink } from "react-router-dom";

const MemberDetails = () => {
  const { memberId } = useParams();
  const { member, isLoading } = FetchMembersDetail(memberId);

  console.log(memberId);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <NavLink to=".." relative="path">
        <span>back to members</span>
      </NavLink>
      <h1>Member Detail</h1>
      <h1>{member?.data.name}</h1>
    </div>
  );
};

export default MemberDetails;
