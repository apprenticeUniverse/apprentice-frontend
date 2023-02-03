import React from "react";
import { useSelector } from "react-redux";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Grid } from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import NewFaq from "./NewFaq";

const FaqItem = ({ question, onDeleteFaq, onEditFaq }) => {
  const { role } = useSelector((state) => state.userData);
  const currentRole = role === "ADMIN" || role === "STAKEHOLDER";
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDelte = (event) => {
    onDeleteFaq(question.id);
  };

  const handleEdit = (editedQuestion, faqID) => {
    onEditFaq(editedQuestion, faqID);
  };

  return (
    <>
      <Box
        marginTop={2}
        marginBottom={2}
        sx={{
          wordWrap: "break-word",
        }}
      >
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Grid container>
              <Grid item xs={12} md={9}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    wordBreak: "break-all",
                    whiteSpace: "normal",
                    flexShrink: 0,
                  }}
                >
                  {question.question}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography
                  sx={{ color: "text.secondary", marginLeft: "10px" }}
                >
                  {question.topic}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                wordWrap: "break-word",
              }}
            >
              {question.answer}
            </Typography>
            {currentRole && (
              <Box marginTop={2} textAlign={"center"}>
                <NewFaq
                  buttonText={"Edit"}
                  toEdit={question}
                  onEditedQuestion={handleEdit}
                />
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ marginTop: "10px", marginBottom: "10px" }}
                  onClick={handleDelte}
                >
                  DELETE
                </Button>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default FaqItem;
