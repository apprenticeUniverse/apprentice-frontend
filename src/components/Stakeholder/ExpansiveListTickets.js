import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    makeStyles,
  } from "@mui/material";
  
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { LocalActivity } from "@mui/icons-material";

import TicketListItem from "../Dashboard/common/TicketListItem";



  const ExpansiveListTickets =({id,object})=>{

    const [expanded, setExpanded] = useState(false);

    

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };



    return(
        <Accordion key={id} expanded={expanded === `panel1`} onChange = {handleChange(`panel1`)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls={`panel1bh-content`}
                id={`panel1bh-header`}
                sx={{ width: '100%'}}
                >
                    <Typography sx={{ width: {xs:'50%', md: '33%'}, flexShrink: 0 }}>
                        {`Batch: ${object.batchName}`}
                    </Typography>
                    
                    <Typography sx={{ color: 'text.secondary' }}> {object.apprenticeName}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ width: {xs:'100%', md: '50%'}, flexShrink: 0 }}>
            <TicketListItem
                   
                    id={id}
                    avatarColor={"white"}
                    avatarBgroundColor={object.resolved ? "#bad531" : "red"}
                    icon={<LocalActivity/>}
                    userName={object.apprenticeName}
                    dateName={"Created Date:"}
                    issueName={object.title}
                    date={object.createdDate}
                  ></TicketListItem>
            </AccordionDetails>
        </Accordion>

    );

  }

  export default ExpansiveListTickets;