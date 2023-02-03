import React, { useEffect, useState } from "react";

import { Grid, Pagination } from "@mui/material";

import FaqItem from "./FaqItem";
import api from "../../API/baseURL";
import * as url from "../../API/urls";

const FaqList = ({ questions }) => {
  const [questionsData, setQuestionsData] = useState(questions);

  useEffect(() => {
    setQuestionsData(questions);
  }, [questions]);

  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(5);
  const indexOfLastPost = currentPage * questionsPerPage;
  const indexOfFirstPost = indexOfLastPost - questionsPerPage;
  const currentPosts = questionsData.slice(indexOfFirstPost, indexOfLastPost);

  const handlePage = (event, value) => {
    setCurrentPage(value);
  };

  // DETELE
  const handleDelete = async (id) => {
    try {
      api.delete(url.deleteFaqByID(id));
      setQuestionsData(questions.filter((obj) => obj.id !== id));
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  // PUT
  const handleEdit = (editedQuestion, faqID) => {
    api.put(url.putFaqByID(faqID), editedQuestion).then((response) => {
      setQuestionsData(
        questionsData.map((obj) =>
          obj.id === response.data.id ? response.data : obj
        )
      );
    });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{ minHeight: "200px" }}>
          {currentPosts?.map((question) => (
            <Grid item xs={12} md={12} key={question.id}>
              <FaqItem
                question={question}
                onDeleteFaq={handleDelete}
                onEditFaq={handleEdit}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={Math.ceil(questions.length / 5)}
            shape="rounded"
            onChange={handlePage}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default FaqList;
