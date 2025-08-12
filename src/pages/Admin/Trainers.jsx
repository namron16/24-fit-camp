import React, { useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useFetchTrainers } from "../../hooks/FetchData";
import { useDeleteTrainer } from "../../hooks/FetchData";
import DataTable from "../../components/Admin/DataTable";
import Loading from "../../components/Loading/Loading";
import userIcon from "../../assets/user-avatar-filled-alt.svg";
import TrainerModal from "../../components/Admin/modals/TrainerModal";
import usePageTransition from "../../hooks/usePageTransition";
import "./trainers.css";

const Trainers = () => {
  const { deleteTrainer } = useDeleteTrainer();
  const { trainers } = useFetchTrainers();
  const dialogRef = useRef(null);
  const { isPending, showContent } = usePageTransition(300);

  const handleDelete = useCallback(
    (id) => {
      console.log(`${id} deleted`);
      deleteTrainer(id);
    },
    [deleteTrainer]
  );
  const columns = useMemo(() => [
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
      field: "fullName",
      headerName: "Full name",
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },

    {
      field: "email",
      headerName: "Email",
      type: "string",
      width: 200,
    },
    {
      field: "contact",
      headerName: "Contact",
      type: "string",
      width: 200,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 90,
      renderCell: (params) => {
        return (
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
        );
      },
    },
  ]);

  if (isPending || !showContent) return <Loading />;

  return (
    <section className="trainers">
      <div className="info">
        <button onClick={() => dialogRef.current?.showModal()}>
          <i className="fa-solid fa-plus"></i> Add trainer
        </button>
      </div>
      <DataTable columns={columns} rows={trainers?.data} />

      <TrainerModal dialogRef={dialogRef} />
    </section>
  );
};

export default Trainers;
