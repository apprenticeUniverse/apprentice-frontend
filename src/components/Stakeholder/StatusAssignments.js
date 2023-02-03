import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Grid
  } from "@mui/material";
  

import * as url from "../../API/urls";
import api from "../../API/baseURL";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashItem from "./DashItem";
import { addStakeAssignmsInfo } from "../../store/actions";



  const StatusAssignments =()=>{
    const userInfo  = useSelector(state =>state.userData);
    const assignments = useSelector(state=>state.stakeAssignmsData);
    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        api.get(url.getAssignmentsByStakeholderID(userInfo.id)).then((response) => {
            dispatch(addStakeAssignmsInfo(response.data))
           
          });

    }, []);

    

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    const countPendingTickets=(list)=>{
        let counter = 0;
        for (let index = 0; index < list.length; index++) {
            if(!list[index].resolved){
                counter++;
            } 
        }
        return counter;

    }
 console.log(Array.isArray(assignments) ? "yes" : "noooo")


    return(
        <>
        {assignments ? (
            <Accordion expanded={expanded === `panel1`} onChange = {handleChange(`panel1`)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls={`panel1-bh-content`}
                id={`panel1-bh-header`}>
                    <Typography variant="h5" >
                                Assignments
                    </Typography>
                    
            </AccordionSummary>
            <AccordionDetails >
                    {Object.keys(assignments) !== 0 ? 
                    (<Grid container>
                        <Grid item xs={12} md={12}>
                            <Typography variant="h6" sx={{paddingLeft: "5%"}}> Per Batch</Typography>
                        </Grid>
                        
                        {assignments.filter((item)=>{return(!item.hasOwnProperty("weeklyAssignment"))}).map((item)=>(
                            <> 
                            <Grid item md={12} container justifyContent="flex-end" gap="5%">
                            <Grid item xs={2} md={2} container flexDirection="row"
                                justifyContent="flex-end" alignItems="center" gap="5%">
                                <Typography variant={"h6"} sx={{ fontSize: {xs: "0.5rem" , md: "1rem"}}}> Apprentices </Typography>
                            </Grid>
                            <Grid item xs={2} md={2} container flexDirection="row"  
                                alignItems="center" gap="5%">
                                <Typography variant="h6" sx={{ fontSize: {xs: "0.5rem", md: "1rem"}}}> Submitted </Typography>
                            </Grid>
                        </Grid>
                            <DashItem 
                                    key={item.id}
                                    object= {item}
                                ></DashItem>
                            </>
                            

                        ))}
                        <Grid item xs={12} md={12}>
                            <Typography variant="h6" sx={{paddingLeft: "5%"}}> Weekly</Typography>
                        </Grid>
                        {assignments.filter((item)=>{return(item.hasOwnProperty("weeklyAssignment"))}).map((item)=>(
                            <>
                            <Grid item md={12} container justifyContent="flex-end" gap="5%">
                            <Grid item xs={2} md={2} container flexDirection="row"
                                justifyContent="flex-end" alignItems="center" gap="5%">
                                <Typography variant={"h6"} sx={{ fontSize: {xs: "0.5rem" , md: "1rem"}}}> Apprentices </Typography>
                            </Grid>
                            <Grid item xs={2} md={2} container flexDirection="row"  
                                alignItems="center" gap="5%">
                                <Typography variant="h6" sx={{ fontSize: {xs: "0.5rem", md: "1rem"}}}> Submitted </Typography>
                            </Grid>
                        </Grid>
                        <DashItem 
                                key={item.id}
                                object= {item}
                            ></DashItem>
                            </>
                        ))}
                    </Grid>
                    
                    ): `There aren't Assignments`}
            </AccordionDetails>
        </Accordion>
        ) : "There isn't Data "}
        </>

    );

  }

  export default StatusAssignments;