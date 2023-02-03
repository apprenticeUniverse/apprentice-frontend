import { Grid, Link, ListItemText, Typography } from "@mui/material";

import moment from "moment";

const SubmmitItem = ({ id, object }) => {
  return (
    <Grid container key={id}>
      <Grid item xs={12}>
        <Typography variant="h6">
          {" "}
          Apprentice: {object.apprenticeName}
        </Typography>
        <hr></hr>
      </Grid>
      <Grid item xs={12}>
        <ListItemText
          primary={
            <Link href={object.fileUrl} variant="body2">
              {" "}
              Download File Uploaded.{" "}
            </Link>
          }
          secondary={`Submmited Date: ${moment(object.deadLine).format(
            "MMMM Do YYYY, h:mm:ss a"
          )}`}
        />
      </Grid>

      <Grid item container xs={12}>
        <Grid item xs={12}>
          <Typography variant="body2"> Feedback: </Typography>
        </Grid>
        {object.feedback !== null ? (
          <Grid item>
            <Typography variant="body2"> {object.feedback}</Typography>
          </Grid>
        ) : (
          <Typography> There isn't any Feedback</Typography>
        )}
        <Grid item xs={12}>
          <Typography variant="body2"> Score: </Typography>
        </Grid>
        {object.score !== null ? (
          <Grid item>
            <Typography variant="body2"> {object.score}</Typography>
          </Grid>
        ) : (
          <Typography> There isn't any score</Typography>
        )}
        <Grid item>
          <hr></hr>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SubmmitItem;
