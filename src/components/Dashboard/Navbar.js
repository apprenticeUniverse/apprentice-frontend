import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { IconButton, makeStyles } from "@material-ui/core";
import { Notifications } from "@mui/icons-material";
import { deepOrange } from "@mui/material/colors";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import {
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { ReactComponent as Logo } from "../universeLogo.svg";
import SvgIcon from "@material-ui/core/SvgIcon";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.dark,
    color: "white",
  },

  icons: {
    display: "flex",
    alignItems: "baseline",
  },
  badge: {
    marginRight: theme.spacing(2),
  },
}));

function Navbar() {
  // let user = JSON.parse(localStorage.getItem('SavedToken'));
  const navigate = useNavigate();
  const [ancorElUser, setAncorElUser] = useState(null);
  const userInfo = useSelector((state) => state.userData);

  const classes = useStyles();

  const handleOpenUserMenu = (even) => {
    setAncorElUser(even.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAncorElUser(null);
  };
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
    navigate(0);
  };

  const getInitials = (object) => {
    let firstLetter = object?.firstName?.slice(0, 1);
    let secondLetter = object?.lastName?.slice(0, 1);

    return `${firstLetter}${secondLetter}`;
  };

  return (
    <AppBar position="fixed" sx={{ display: "felx" }}>
      <Toolbar className={classes.toolbar}>
        <SvgIcon>
          <Logo sx={{ width: "30px" }}></Logo>
        </SvgIcon>
        <Typography varian="h6" className={classes.logoLg}>
          Apprentice Universe
        </Typography>
        {localStorage.getItem("SavedToken") !== null && (
          <div className={classes.icons}>
            {/* <IconButton>
              <Badge
                badgeContent={2}
                color="secondary"
                className={classes.badge}
              >
                <Notifications />
              </Badge>
            </IconButton> */}
            <Tooltip title={"Open settings"}>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar sx={{ bgcolor: "#8fc745" }}>
                  {!userInfo ? "EN" : getInitials(userInfo)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={ancorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(ancorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogOut}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
