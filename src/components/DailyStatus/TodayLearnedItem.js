import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const TodayLearnedItem = (props) => {
  const { description, learnedAt } = props;

  const learnedDate = new Date(learnedAt);

  return (
    <>
      <Card sx={{ minWidth: 275, my: { xs: 1, md: 2 } }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Description
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {description}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: 10 }}
          >{`Created at ${learnedDate.toLocaleString()}`}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default TodayLearnedItem;
