import React, { useRef, useMemo, useCallback } from "react";
import { useFetchTrainers } from "../../utils/FetchData";
import { useDeleteTrainer } from "../../utils/FetchData";
import DataTable from "../../components/Admin/DataTable";
import Loading from "../../components/Loading/Loading";
import userIcon from "../../assets/user-avatar-filled-alt.svg";
import TrainerModal from "../../components/Admin/TrainerModal";
import ActionBtn from "./ActionBtn";
import usePageTransition from "../../utils/usePageTransition";

const Trainers = () => {
  const { deleteTrainer } = useDeleteTrainer();
  const { trainers } = useFetchTrainers();
  const dialogRef = useRef(null);
  const { isPending, showContent } = usePageTransition(100);

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
            <ActionBtn handleDelete={handleDelete} paramsId={params.row.id} />
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

      <TrainerModal dialogRef={dialogRef} columns={columns} slug={"trainer"} />
    </section>
  );
};

export default Trainers;
