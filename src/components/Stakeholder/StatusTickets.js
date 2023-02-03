import React, { useState } from "react";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StatusTickets = ({ tickets }) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const countPendingTickets = (list) => {
    let counter = 0;
    for (let index = 0; index < list.length; index++) {
      if (!list[index].resolved) {
        counter++;
      }
    }
    return counter;
  };

  return (
    <Accordion
      expanded={expanded === `panel1`}
      onChange={handleChange(`panel1`)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel1-bh-content`}
        id={`panel1-bh-header`}
      >
        <Grid container alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h5">Tickets</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ color: "text.secondary" }}>
              {Object.keys(tickets) !== 0
                ? `Total Tickets: ${tickets.length}`
                : `Total Tickets: 0`}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          width: { xs: "100%", md: "50%" },
          flexShrink: 0,
          paddingLeft: "10%",
        }}
      >
        {Object.keys(tickets) !== 0 ? (
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              container
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
              gap="5%"
            >
              <Typography variant="h6"> Pending: </Typography>
              <Typography variant="h6">
                {" "}
                {countPendingTickets(tickets)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              container
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
              gap="5%"
            >
              <Typography variant="h6"> Completed: </Typography>
              <Typography variant="h6">
                {" "}
                {tickets.length - countPendingTickets(tickets)}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          `There aren't Tickets`
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default StatusTickets;
