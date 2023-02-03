import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { Container, makeStyles } from "@material-ui/core";
import api from "../../../API/baseURL";
import * as url from "../../../API/urls";
import CommonButton from "../common/CommonButton";
import moment from "moment";
import { useSelector } from "react-redux";
/*moment(date).format("MMMM Do YYYY, h:mm:ss a") */



  const columns = [
    { field: "id", hide: true },
    { field: "apprenticeName", headerName: "ApprenticeName", width: 200},
    { field: "batchName", headerName: "BatchName", width: 200 },
    { field: "title", headerName: "Issue", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "createdDate", headerName: "Created Date", width:150},
    { field: "resolved", headerName: "Resolved", width:150}
  
  ]

  const userTableStyles ={
    marginTop:"20px",
    
  };

  



const TicketsTable =({tickets})=>{
    const userInfo  = useSelector(state =>state.userData);
    const userID = userInfo.id;
    const[items, setItems]= useState(tickets);

    const gettingTickets=(list)=>{
        return(list.map((item)=>
            (item.createdDate = item.createdDate.slice(0,10),
             item.description = "holaaa")));
    };

    gettingTickets(tickets);
    


    useEffect(() => {
        api.get(url.getTicketsPerUser(userID)).then((response) => {
            setItems(gettingTickets(response.data));
          });
      
    }, []);


    return(
         <div>{tickets.length === 0 ? "There aren't Tickets" : <DataTable
                        
         rows={tickets}
         columns={columns}
         loading={!tickets.length}
         sx={userTableStyles}/>
         
            }</div>  
 
 
    )
}

export default TicketsTable;