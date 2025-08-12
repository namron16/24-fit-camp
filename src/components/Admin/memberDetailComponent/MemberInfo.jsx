import React, { useMemo } from "react";
import { useGetRemainingTime } from "../../../hooks/useGetRemainingTime";
import usePageTransition from "../../../hooks/usePageTransition";
import Loading2 from "../../Loading/Loading2";
import "./memberInfo.css";

const MemberInfo = ({ startDate, endDate, program, plan, type }) => {
  const { isPending, showContent } = usePageTransition(300);
  const formattedStartDate = useMemo(() => {
    if (!startDate) return "";
    return new Date(startDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [startDate]);

  const formattedEndDate = useMemo(() => {
    if (!endDate) return "";
    return new Date(endDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [endDate]);

  const remainingTime = useMemo(() => {
    return useGetRemainingTime(startDate, endDate);
  }, [startDate, endDate]);

  if (isPending || !showContent) return <Loading2 />;

  return (
    <div className="membership-info__container">
      <h1>Member Membership Details</h1>
      <div className="membership-info__content">
        <div className="">
          Membership Plan:
          <span className="opacity">
            {" "}
            {plan ? `${plan} membership` : "day pass"}
          </span>
        </div>
        {!startDate || !endDate ? (
          <span className="no-membership">This member has no membership</span>
        ) : (
          <>
            <div className="membership-info">
              <div className="">
                Additional Membership Program:
                {program
                  ? program.map((p, index) => (
                      <span className="opacity" key={index}>
                        {" "}
                        {p}
                        {", "}
                      </span>
                    ))
                  : "none"}
              </div>
              <div className="">
                Membership Type:
                <span className="opacity"> {type}</span>
              </div>
            </div>
            <div className="membership-date-info">
              <div className="membership-info-items">
                <span className="membership-title">Membership Start:</span>
                <span className="opacity">{formattedStartDate}</span>
              </div>
              <div className="membership-info-items">
                <span className="membership-title">Membership End:</span>
                <span className="opacity">{formattedEndDate}</span>
              </div>
              <div className="membership-info-items">
                <span className="remaining-time">{remainingTime}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MemberInfo;
