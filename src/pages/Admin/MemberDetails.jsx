import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useFetchMembersDetail } from "../../utils/FetchData";
import MemberHeader from "../../components/Admin/memberDetailComponent/MemberHeader";
import MembershipDates from "../../components/Admin/memberDetailComponent/MembershipDates";
import MembershipType from "../../components/Admin/memberDetailComponent/MembershipType";
import QRCode from "react-qr-code";
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

  const qrCodeValue = useMemo(() => {
    return JSON.stringify(value.contact);
  }, [value.contact]);

  return (
    <section className="member-details">
      <MemberHeader profileImage={value.profileImage} />
      <div className="member-details__container">
        <div className="member-info">
          <span className="member-name">{`${value.firstName} ${value.lastName}`}</span>
          <span className="member-email">{`${value.email}`}</span>
          <div className="membership-info__container">
            <MembershipDates
              startDate={value.membershipStart}
              endDate={value.membershipEnd}
            />
            <MembershipType type={value.type} plan={value.plan} />
          </div>
        </div>

        <div className="qr-code">
          <QRCode
            size={200}
            bgColor="#fff"
            fgColor="#111"
            value={qrCodeValue}
          />
        </div>
      </div>
    </section>
  );
};

export default MemberDetails;
