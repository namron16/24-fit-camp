import React, { useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/Admin/DataTable";
import Loading from "../../components/Loading/Loading";
import { useFetchMembers, useDeleteMember } from "../../hooks/FetchData";
import userIcon from "../../assets/user-avatar-filled-alt.svg";
import usePageTransition from "../../hooks/usePageTransition";
import MembershipModal from "../../components/Admin/modals/MembershipModal";
import "./members.css";

const Members = () => {
  const { deleteMember } = useDeleteMember();
  const { members } = useFetchMembers();
  const { isPending, showContent } = usePageTransition(300);

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
    {
      field: "fullName",
      headerName: "Full name",
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
    { field: "email", headerName: "Email", width: 180 },
    { field: "contact", headerName: "Contact", width: 120 },

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
          <Link to={`${params.row.id}`}>
            <button className="view">
              <i className="fa-solid fa-expand"></i>
            </button>
          </Link>
          <button
            onClick={() => handleDelete(params.row.id)}
            className="delete"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ),
    },
  ]);

  const dialogRef = useRef(null);

  if (isPending || !showContent) return <Loading />;

  return (
    <section className="users">
      <div className="info">
        <button onClick={() => dialogRef.current?.showModal()}>
          <i className="fa-solid fa-plus"></i> Add member
        </button>
      </div>
      <DataTable columns={columns} rows={members?.data} />
      {/* <Modal dialogRef={dialogRef} columns={columns} slug="member" /> */}
      <MembershipModal dialogRef={dialogRef} />
    </section>
  );
};

export default Members;
