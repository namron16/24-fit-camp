import React from "react";
import DataTable from "../DataTable";
import usePageTransition from "../../../hooks/usePageTransition";
import Loading2 from "../../Loading/Loading2";
import "./memberTransaction.css";

const MemberTransaction = ({ columns, transaction }) => {
  const { isPending, showContent } = usePageTransition();
  if (isPending || !showContent) return <Loading2 />;
  return (
    <div className="member-transaction">
      <button className="transaction-btn">New Transaction</button>
      <DataTable columns={columns} rows={transaction} />
    </div>
  );
};

export default MemberTransaction;
