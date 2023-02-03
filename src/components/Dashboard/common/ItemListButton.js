import React from "react";
import { NavLink } from "react-router-dom";

import { Typography } from "@material-ui/core";
import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Grid,
  Box,
} from "@mui/material";

const ItemListButton = ({
  avatarColor,
  avatarBgroundColor,
  icon,
  topicName,
  dateName,
  titleName,
  date,
  id,
  onclick,
}) => {
  return (
    <NavLink to={`/app/assignment/${id}`}>
      <ListItemButton onClick={onclick}>
        <ListItemIcon>
          <ListItemAvatar>
            <Avatar
              sx={{ color: avatarColor, backgroundColor: avatarBgroundColor }}
            >
              {icon}
            </Avatar>
          </ListItemAvatar>
        </ListItemIcon>
        <Grid container>
          <Grid item xs={12} md={6}>
            <ListItemText
              sx={{
                borderRight: "solid thin #ccc",
                marginRight: "1%",
                paddingRight: "1%",
              }}
              primary={topicName}
              secondary={`${dateName} ${date}`}
            ></ListItemText>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                minHeight: "100%",
                marginLeft: "5px",
              }}
            >
              <Typography> {titleName}</Typography>
            </Box>
          </Grid>
        </Grid>
      </ListItemButton>
    </NavLink>
  );
};

export default ItemListButton;
