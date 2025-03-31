import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./datatable.css";
import Loading from "../Loading/Loading";
import { FetchMembers } from "../../utils/FetchData";
import { FetchTrainers } from "../../utils/FetchData";
const DataTable = ({ columns, rows }) => {
  const { loadingMembers } = FetchMembers();
  const { loadingTrainers } = FetchTrainers();
  return (
    <section>
      {loadingMembers && loadingTrainers ? (
        <Loading />
      ) : (
        <DataGrid
          className="data-table-grid"
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
      )}
    </section>
  );
};

export default DataTable;
