import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import {useSelector } from "react-redux";



  const columns = [
    { field: "id", hide: true },
    { field: "firstName", headerName: "Name", width: 150 },
    { field: "lastName", headerName: "LastName", width: 150 },
    { field: "emailAddress", headerName: "Email", width: 150 },
  
  ];

  const userTableStyles ={
    marginTop:"20px",
    
  };



const UserTable =()=>{
  const userBatch = useSelector(state => state.batchData);

    


    return(

      <div>
        {!userBatch.apprentices.length ? "There aren't members" 
                      : 
      <DataTable
            
          rows={userBatch.apprentices}
          loading={!userBatch.apprentices.length}
          columns={columns}
          sx={userTableStyles}/>
        }
      </div>

      
        
    )
}

export default UserTable;