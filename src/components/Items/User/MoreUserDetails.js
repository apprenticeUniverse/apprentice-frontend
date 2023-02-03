import React from "react";

import { Box, Tabs, Tab, Typography } from "@mui/material";
import PropTypes from "prop-types";
import TablesDetails from "./TablesDetails";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function MoreUserDetails({ userID }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Daily Status" {...a11yProps(0)} />
          <Tab label="TIL" {...a11yProps(1)} />
          <Tab label="Tickets" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TablesDetails tabIndex={0} userID={userID} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TablesDetails tabIndex={1} userID={userID} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TablesDetails tabIndex={2} userID={userID} />
      </TabPanel>
    </Box>
  );
}

export default MoreUserDetails;
