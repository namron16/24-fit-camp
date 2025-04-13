import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./datatable.css";

const DataTable = ({ columns, rows }) => {
  return (
    <section className="data-table">
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
        sx={{
          
          overflow: 'visible',
          '.MuiDataGrid-virtualScroller': {
            overflow: 'visible',
          },
          '.MuiDataGrid-main': {
            overflow: 'visible',
          },
          '.MuiDataGrid-cell': {
            overflow: 'visible',
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </section>
  );
};

export default DataTable;
