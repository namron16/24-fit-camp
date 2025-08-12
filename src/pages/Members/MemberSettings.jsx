import React from "react";
import ToggleButton from "../../components/Admin/ToggleButton";
import usePageTransition from "../../hooks/usePageTransition";
import Loading2 from "../../components/Loading/Loading2";
import "./memberSettings.css";

const MemberSettings = () => {
  const { isPending, showContent } = usePageTransition(100);
  if (!showContent || isPending) return <Loading2 />;

  return (
    <section className="member-settings">
      <div className="member-settings__container">
        <div className="member-settings-reset">
          <h3>Reset Password</h3>
          <button className="member-reset-btn">Reset Password</button>
        </div>
        <div className="member-settings-theme">
          <h3>Theme</h3>
          <ToggleButton />
        </div>
        <div className="member-settings-delete">
          <h3>Danger Zone</h3>
          <button className="member-delete-btn">Delete Account</button>
        </div>
      </div>
    </section>
  );
};

export default MemberSettings;
