import { Container, Grid, Pagination, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import SubmmitItem from "../../Items/Assignment/SubmmitItem";
import AssignmentDashButton from "../AssignmentDashButton";
import ExpansiveListAssignments from "../ExpansiveListAssignments";
import ExpansiveListTickets from "../ExpansiveListTickets";

const ListContainer = ({ list, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  const assignments = useSelector((state) => state.stakeAssignmsData);

  const indexOfLastPost = currentPage * itemPerPage;
  const indexOfFirstPost = indexOfLastPost - itemPerPage;
  const currentList = list.slice(indexOfFirstPost, indexOfLastPost);

  const handlePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ minHeight: "200px" }}>
        {Object.keys(list).length !== 0 ? (
          <>
            {type === "assignments"
              ? currentList.map((item) => (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    key={item.id}
                    sx={{ marginTop: 2 }}
                  >
                    <ExpansiveListAssignments
                      key={item.id}
                      id={item.id}
                      object={item}
                    ></ExpansiveListAssignments>
                  </Grid>
                ))
              : type === "tickets"
              ? currentList.map((item) => (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    key={item.id}
                    sx={{ marginTop: 2 }}
                  >
                    <ExpansiveListTickets
                      key={item.id}
                      id={item.id}
                      object={item}
                    ></ExpansiveListTickets>{" "}
                  </Grid>
                ))
              : type === "feedback"
              ? currentList.map((item) => (
                  <SubmmitItem
                    key={item.apprenticeID}
                    id={item.id}
                    object={item}
                  ></SubmmitItem>
                ))
              : type === "dashboard"
              ? currentList.map((item) => (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    key={item.id}
                    sx={{ marginTop: 2, width: "100%" }}
                  >
                    <AssignmentDashButton assignment={item} />
                  </Grid>
                ))
              : "There aren't any items"}
          </>
        ) : (
          "No data"
        )}
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(list.length / 5)}
          shape="rounded"
          onChange={handlePage}
        />
      </Grid>
    </Grid>
  );
};

export default ListContainer;
