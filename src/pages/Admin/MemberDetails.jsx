import React, { useMemo, useState } from "react";
import MemberHeader from "../../components/Admin/memberDetailComponent/MemberHeader";
import TabsHeader from "../../components/Admin/memberDetailComponent/TabsHeader";
import MemberInfo from "../../components/Admin/memberDetailComponent/MemberInfo";
import MemberTransaction from "../../components/Admin/memberDetailComponent/MemberTransaction";
import { useParams } from "react-router-dom";
import { useFetchMembersDetail } from "../../hooks/FetchData";
import "./memberdetail.css";

const MemberDetails = () => {
  const { memberId } = useParams();
  const { memberDetails } = useFetchMembersDetail(memberId);
  const [activeTab, setActiveTab] = useState("info");

  const value = useMemo(
    () => ({
      firstName: memberDetails?.data?.firstName,
      lastName: memberDetails?.data?.lastName,
      email: memberDetails?.data?.email,
      contact: memberDetails?.data?.contact,
      program: memberDetails?.data?.program,
      type: memberDetails?.data?.type,
      plan: memberDetails?.data?.plan,
      membershipStartDate: memberDetails?.data?.membershipStartDate,
      membershipEndDate: memberDetails?.data?.membershipEndDate,
      profileImage: memberDetails?.data?.profileImage,
      transaction: memberDetails?.data?.transaction,
    }),
    [memberDetails]
  );

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Transaction ID", width: 200 },
      { field: "name", headerName: "Member", width: 150 },
      { field: "type", headerName: "Type", width: 150 },
      { field: "item", headerName: "Item", width: 120 },
      { field: "amount", headerName: "Amount", width: 120 },
      { field: "date", headerName: "Date", width: 120 },
    ],
    []
  );

  return (
    <section className="member-details">
      <MemberHeader
        profileImage={value.profileImage}
        firstName={value.firstName}
        lastName={value.lastName}
        email={value.email}
      />

      <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="member-details__container">
        <div className="member-details__content">
          {activeTab === "info" ? (
            <MemberInfo
              startDate={value.membershipStartDate}
              endDate={value.membershipEndDate}
              program={value.program}
              type={value.type}
              plan={value.plan}
            />
          ) : (
            <MemberTransaction
              columns={columns}
              transaction={value.transaction}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default MemberDetails;
