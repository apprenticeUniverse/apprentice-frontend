import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import ItemListButton from "../Dashboard/common/ItemListButton";
import { PlaylistAddCheckCircleSharp } from "@mui/icons-material";
import moment from "moment";

const ExpansiveListAssignments = ({ id, object }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getTypeAssign = (Obj) => {
    if (Obj.hasOwnProperty("weeklyAssignment")) {
      return "Weekly Assignment";
    } else if (Obj.hasOwnProperty("apprenticeID")) {
      return "Individual Assignment";
    } else if (Obj.hasOwnProperty("batchID")) {
      return "Group Assignment";
    } else {
      return "";
    }
  };
  const backgroundColor = (item) => {
    let itemDate = new Date(item.deadLine);
    let todayDate = new Date();
    let blue = "#4d9dff";
    let red = "#c6404b";
    let green = "#bad531";
    //let yellow = "#fcef56";

    if (item.totalUsers == item.timesCompleted) {
      return green;
    }
    if (itemDate.getTime() <= todayDate.getTime()) {
      return red;
    }
    if (itemDate.getTime() >= todayDate.getTime()) {
      return blue;
    }
  };

  const response = (o) => {
    if (o.totalUsers === o.timesCompleted) {
      return "All Apprentices delivered a solution";
    }
    if (o.totalUsers > o.timesCompleted) {
      return `Total Apprentices: ${o.totalUsers}    Total solutions: ${o.timesCompleted}`;
    }
  };

  return (
    <Accordion
      key={id}
      expanded={expanded === `panel${id}`}
      onChange={handleChange(`panel${id}`)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${id}bh-content`}
        id={`panel${id}bh-header`}
        sx={{ width: "100%" }}
      >
        <Typography
          sx={{
            width: { xs: "50%", md: "33%" },
            paddingRight: { xs: "1%" },
            flexShrink: 0,
          }}
        >
          {getTypeAssign(object)}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {response(object)}{" "}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ width: { xs: "100%", md: "50%" }, flexShrink: 0 }}
      >
        <ItemListButton
          id={id}
          avatarColor={"white"}
          avatarBgroundColor={backgroundColor(object)}
          icon={<PlaylistAddCheckCircleSharp />}
          topicName={object.topic}
          dateName={"Deadline:"}
          titleName={object.title}
          date={moment(object.deadLine).format("MMMM Do YYYY, h:mm:ss a")}
        ></ItemListButton>
      </AccordionDetails>
    </Accordion>
  );
};

export default ExpansiveListAssignments;
