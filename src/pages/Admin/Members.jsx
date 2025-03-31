"use client";

import React, { useRef } from "react";
import DataTable from "../../components/Admin/DataTable";
import MemberModal from "../../components/Admin/MemberModal";
import { FetchMembers } from "../../utils/FetchData";
import { DeleteMember } from "../../utils/FetchData";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import userIcon from "../../assets/user-avatar-filled-alt.svg";
import "./members.css";

const Members = () => {
  const { deleteMember } = DeleteMember();
  const handleDelete = (id) => {
    console.log(`${id} deleted`);
    deleteMember(id);
  };
  const columns = [
    {
      field: "icon",
      headerName: "Icon",
      width: 60,
      renderCell: (params) => {
        return (
          <img
            src={params.row.img ? params.row.img : userIcon}
            className="members-icon"
          />
        );
      },
    },
    {
      field: "name",
      headerName: "Full Name",
      width: 150,
      type: "string",
      editable: true,
    },

    {
      field: "email",
      headerName: "Email",
      type: "string",
      width: 180,
    },
    {
      field: "contact",
      headerName: "Contact",
      type: "string",
      width: 180,
    },

    {
      field: "plan",
      headerName: "Plan",
      type: "string",
      with: 100,
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 110,
      type: Boolean,
      renderCell: (params) => {
        return (
          <span className={params.value ? "active-status" : "inactive-status"}>
            {params.value ? "Active" : "Inactive"}
          </span>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 90,
      renderCell: (params) => {
        return (
          <div className="actions">
            <Link to={`${params.row.id}`} className="edit">
              <i className="fa-solid fa-pen-to-square"></i>
            </Link>
            <button
              className="delete"
              onClick={() => handleDelete(params.row.id)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        );
      },
    },
  ];
  const { members, isLoading } = FetchMembers();
  const dialogRef = useRef(null);
  return (
    <section className="users">
      <div className="info">
        <button onClick={() => dialogRef.current?.showModal()}>
          <i className="fa-solid fa-plus"></i> Add member
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <DataTable columns={columns} rows={members?.data} />
      )}
      <MemberModal dialogRef={dialogRef} columns={columns} slug={"member"} />
    </section>
  );
};

export default Members;
