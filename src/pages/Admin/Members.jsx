import React, { useRef, useMemo, useCallback } from "react";
import ActionBtn from "./ActionBtn";
import DataTable from "../../components/Admin/DataTable";
import Loading from "../../components/Loading/Loading";
import MemberModal from "../../components/Admin/MemberModal";
import { useFetchMembers, useDeleteMember } from "../../utils/FetchData";
import userIcon from "../../assets/user-avatar-filled-alt.svg";
import usePageTransition from "../../utils/usePageTransition";
import "./members.css";

const Members = () => {
  const { deleteMember } = useDeleteMember();
  const { members } = useFetchMembers();
  const { isPending, showContent } = usePageTransition(0);

  const handleDelete = useCallback(
    (id) => {
      console.log(`${id} deleted`);
      deleteMember(id);
    },
    [deleteMember]
  );

  const columns = useMemo(() => [
    {
      field: "icon",
      headerName: "Icon",
      width: 60,
      renderCell: (params) => (
        <img
          src={params.row.img || userIcon}
          className="members-icon"
          loading="lazy"
        />
      ),
    },
    { field: "name", headerName: "Full Name", width: 150 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "contact", headerName: "Contact", width: 180 },
    { field: "plan", headerName: "Plan", width: 100 },
    {
      field: "isActive",
      headerName: "Status",
      width: 110,
      renderCell: (params) => (
        <span className={params.value ? "active-status" : "inactive-status"}>
          {params.value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 90,
      renderCell: (params) => (
        <div className="actions">
          <ActionBtn handleDelete={handleDelete} paramsId={params.row.id} />
        </div>
      ),
    },
  ]);

  const dialogRef = useRef(null);

  if (!showContent || isPending) return <Loading />;

  return (
    <section className="users">
      <div className="info">
        <button onClick={() => dialogRef.current?.showModal()}>
          <i className="fa-solid fa-plus"></i> Add member
        </button>
      </div>
      <DataTable columns={columns} rows={members?.data} />
      <MemberModal dialogRef={dialogRef} columns={columns} slug="member" />
    </section>
  );
};

export default Members;
