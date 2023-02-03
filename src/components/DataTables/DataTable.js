import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function DataTable({ tableData, columns, customID }) {
  const [pageSize, setPageSize] = useState(5);

  // If data doesnt have an ID
  function generateRandom() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {tableData ? <div style={{ flexGrow: 1 }}>
        <DataGrid
          item
          xs={12}
          md={6}
          rowHeight={100}
          autoHeight
          rows={tableData}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50]}
          pagination
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => (customID ? generateRandom() : row.id)}
        />
      </div> : "There isn't Data"}
    </div>
  );
}

export default DataTable;
