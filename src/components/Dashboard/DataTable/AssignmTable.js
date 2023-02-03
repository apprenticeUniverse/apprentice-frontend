import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { Container, makeStyles } from "@material-ui/core";
import api from "../../../API/baseURL";
import * as url from "../../../API/urls";
import CommonButton from "../common/CommonButton";
import moment from "moment";




  const columns = [
    { field: "id", hide: true },
    { field: "topic", headerName: "Topic", width: 150 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "deadLine", headerName: "Due Date", width:150},
    { field: "assignmType", headerName: "Group/Individual", width:150}
  
  ]

  const userTableStyles ={
    marginTop:"20px",
    
  };

  



const AssignmTable =({userID, assignms})=>{
    const[items, setItems]= useState(assignms);


    const gettingAssignments=(list)=>{
        return(list.map((item)=>
            (item.deadLine = item.deadLine.slice(0,10),
             item.assignmType = "Pendiente")

        ));
    
    };
    gettingAssignments(assignms)


    useEffect(() => {
      api.get(url.getUserByID(userID)).then((response) => {
        setItems(response.data.apprentices);
      });
    }, []);


    return(
         <DataTable
                        
                rows={assignms}
                columns={columns}
                loading={!assignms.length}
                sx={userTableStyles}/>  
 
 
    )
}

export default AssignmTable;