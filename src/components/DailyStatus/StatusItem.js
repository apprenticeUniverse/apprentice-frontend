import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const StatusItem = (props) => {
  const { beenDoing, willDo, createdAt } = props;

  const createdDate = new Date(createdAt);

  return (
    <>
      <Card sx={{ minWidth: 275, my: { xs: 1, md: 2 } }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Been Doing...
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {beenDoing}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Will Do...
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {willDo}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: 10 }}
          >{`Created at ${createdDate.toLocaleString()}`}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default StatusItem;
