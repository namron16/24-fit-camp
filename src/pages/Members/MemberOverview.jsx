import React, { useMemo } from "react";
import "./memberOverview.css";
import QRCode from "react-qr-code";
import { useFetchMember } from "../../utils/FetchData";
import MembershipType from "../../components/Admin/memberDetailComponent/MembershipType";
import MembershipDates from "../../components/Admin/memberDetailComponent/MembershipDates";
import usePageTransition from "../../utils/usePageTransition";
import Loading2 from "../../components/Loading/Loading2";

const MemberOverview = () => {
  const { member } = useFetchMember();
  const memberDetails = member?.data?.[0];
  const value = useMemo(
    () => ({
      firstName: memberDetails?.firstName,
      lastName: memberDetails?.lastName,
      email: memberDetails?.email,
      contact: memberDetails?.contact,
      type: memberDetails?.type,
      plan: memberDetails?.plan,
      membershipStart: memberDetails?.membershipStart,
      membershipEnd: memberDetails?.membershipEnd,
    }),
    [memberDetails]
  );

  const qrCodeValue = useMemo(() => {
    return JSON.stringify(value.contact);
  }, [value.contact]);

  const { isPending, showContent } = usePageTransition(100);
  if (!showContent || isPending) return <Loading2 />;

  return (
    <section className="overview">
      <h1>Overview</h1>

      <div className="member-details__container">
        <div className="member-info">
          <div className="member-membership">
            <MembershipDates
              startDate={value.membershipStart}
              endDate={value.membershipEnd}
            />
            <MembershipType type={value.type} plan={value.plan} />
          </div>
        </div>

        <div className="member-qr-code">
          {qrCodeValue ? (
            <div className="member-qr">
              <QRCode
                size={200}
                bgColor="#fff"
                fgColor="#111"
                value={qrCodeValue}
              />
            </div>
          ) : (
            <div>
              <h1>No QR Code</h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MemberOverview;
