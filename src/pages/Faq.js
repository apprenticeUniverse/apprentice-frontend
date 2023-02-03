import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Container, Divider, Grid, Typography, Box } from "@mui/material";

import NewFaq from "../components/FAQ/NewFaq";
import FaqList from "../components/FAQ/FaqList";
import api from "../API/baseURL";
import * as url from "../API/urls";

export default function Faq() {
  const [questions, setQuestions] = useState([]);
  const { role } = useSelector((state) => state.userData);
  const currentRole = role === "ADMIN" || role === "STAKEHOLDER";

  // GET
  useEffect(() => {
    api.get(url.GET_ALL_FAQ).then((response) => {
      setQuestions(response.data);
    });
  }, []);

  // POST
  const addQuestion = (newQuestion) => {
    api.post(url.POST_NEW_FAQ, newQuestion).then((response) => {
      setQuestions(questions.concat(response.data));
    });
  };

  return (
    <Container>
      <Box marginTop={3}>
        <Typography variant="h4" sx={{ color: "#4d9dff" }}>
          Frequently Asked Questions
        </Typography>
        <Divider />

        <Grid container>
          <Grid item xs={12} md={12}>
            <FaqList questions={questions} />
          </Grid>
          {currentRole && (
            <Grid item xs={12} md={12}>
              <NewFaq buttonText={"Add a FAQ"} onAddedQuestion={addQuestion} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
