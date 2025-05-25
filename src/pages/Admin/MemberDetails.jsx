import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useFetchMembersDetail } from "../../utils/FetchData";
import userIcon from "../../assets/user-avatar-filled-alt.svg";
import MemberHeader from "../../components/Admin/memberDetailComponent/MemberHeader";
import MembershipDates from "../../components/Admin/memberDetailComponent/MembershipDates";
import MembershipType from "../../components/Admin/memberDetailComponent/MembershipType";
import "./memberdetail.css";

const MemberDetails = () => {
  const { memberId } = useParams();
  const { memberDetails } = useFetchMembersDetail(memberId);

  const value = useMemo(
    () => ({
      firstName: memberDetails?.data?.firstName,
      lastName: memberDetails?.data?.lastName,
      email: memberDetails?.data?.email,
      contact: memberDetails?.data?.contact,
      type: memberDetails?.data?.type,
      plan: memberDetails?.data?.plan,
      membershipStart: memberDetails?.data?.membershipStart,
      membershipEnd: memberDetails?.data?.membershipEnd,
      profileImage: memberDetails?.data?.profileImage,
    }),
    [memberDetails]
  );
  return (
    <section className="member-details">
      <MemberHeader />
      <div className="member-details__container">
        <div className="member-info">
          <div className="member-info-details__container">
            <div className="member-info-details">
              <img
                src={value.profileImage || userIcon}
                className="members-detail-icon"
                loading="lazy"
                alt="Member avatar"
              />
              <div className="member-name-email">
                <span className="member-name">{`${value.firstName} ${value.lastName}`}</span>
                <span className="member-email">{`${value.email}`}</span>
              </div>
            </div>
            <div className="update-membership">
              <button className="update-membership__btn">Update Membership</button>
            </div>
          </div>
          <div className="membership-info__container">
            <MembershipDates
              startDate={value.membershipStart}
              endDate={value.membershipEnd}
            />
            <MembershipType type={value.type} plan={value.plan} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberDetails;
