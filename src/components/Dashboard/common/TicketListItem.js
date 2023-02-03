import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Grid,
} from "@mui/material";
import moment from "moment";
import { NavLink } from "react-router-dom";

const TicketListItem = ({
  avatarColor,
  avatarBgroundColor,
  icon,
  issueName,
  dateName,
  userName,
  date,
  id,
}) => {
  return (
    <NavLink to={`/app/ticket/${id}`}>
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
                borderRight: "solid",
                marginRight: "1%",
                paddingRight: "1%",
              }}
              primary={userName}
              secondary={dateName}
            ></ListItemText>
          </Grid>

          <Grid item xs={12} md={6}>
            <ListItemText
              className="titleAssignents"
              primary={issueName}
              secondary={moment(date).format("MMMM Do YYYY, h:mm:ss a")}
            ></ListItemText>
          </Grid>
        </Grid>
      </ListItemButton>
    </NavLink>
  );
};

export default TicketListItem;
