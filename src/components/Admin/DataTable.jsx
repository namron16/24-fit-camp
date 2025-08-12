import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useThemeContext } from "../../contexts/ThemeContext";
import "./datatable.css";

const DataTable = ({ columns, rows }) => {
  const { theme } = useThemeContext();
  return (
    <section className="data-table">
      <DataGrid
        className="data-table-grid"
        rows={[...(rows || [])].reverse()}
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
          ".MuiDataGrid-cell": {
            overflow: "visible",
          },
          backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
          color: theme === "dark" ? "#f0f0f0" : "#000",

          "& .MuiDataGrid-columnHeaderTitle": {
            color: theme === "dark" ? "#111" : "#111",
          },

          "& .MuiDataGrid-root": {
            backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
            color: theme === "dark" ? "#f0f0f0" : "#000",
          },

          "& .MuiDataGrid-cell": {
            backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
            color: theme === "dark" ? "#f0f0f0" : "#000",
          },

          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
            color: theme === "dark" ? "#f0f0f0" : "#000",
          },
          "& .MuiTablePagination-root, & .MuiTablePagination-toolbar, & .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-actions":
            {
              backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
              color: theme === "dark" ? "#f0f0f0" : "#000",
            },
          "& .MuiTablePagination-actions button, & .MuiIconButton-root": {
            backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
            color: theme === "dark" ? "#f0f0f0" : "#000",
          },
          "& .MuiDataGrid-toolbarContainer .MuiInputBase-root": {
            backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
            color: theme === "dark" ? "#f0f0f0" : "#000",
          },
          "& .MuiDataGrid-toolbarContainer .MuiInputBase-input": {
            backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
            color: theme === "dark" ? "#f0f0f0" : "#000",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
            color: theme === "dark" ? "#f0f0f0" : "#000",
          },
          "& .MuiDataGrid-quickFilter": {
            backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
            color: theme === "dark" ? "#f0f0f0" : "#000",
          },

          "& .MuiCheckbox-root": {
            color: theme === "dark" ? "var(--text-green)" : "#111", // unchecked color
            "&.Mui-checked": {
              color: theme === "dark" ? "var(--text-green)" : "#1565c0", // checked color
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </section>
  );
};

export default DataTable;
