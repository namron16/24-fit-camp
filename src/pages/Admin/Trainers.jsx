import React, { useRef } from "react";
import { FetchTrainers } from "../../utils/FetchData";
import Loading from "../../components/Loading/Loading";
import DataTable from "../../components/Admin/DataTable";
import userIcon from "../../assets/user-avatar-filled-alt.svg";
import TrainerModal from "../../components/Admin/TrainerModal";
import { DeleteTrainer } from "../../utils/FetchData";

const Trainers = () => {
  const { deleteTrainer } = DeleteTrainer();
  const handleDelete = (id) => {
    console.log(`${id} deleted`);
    deleteTrainer(id);
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
      field: "id",
      headerName: "Id",
      width: 250,
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
            <button className="edit">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
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
  const { trainers, isLoading } = FetchTrainers();
  const dialogRef = useRef(null);

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
