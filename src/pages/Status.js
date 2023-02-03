import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";

import DailyStatus from "./DailyStatus";
import TodayLearned from "./TodayLearned";
import Blockers from "./Blockers";
import api from "../API/baseURL";
import * as url from "../API/urls";
import StatusTab from "../components/DailyStatus/StatusTab";

const steps = ["Daily Status", "Today I've learned", "Any blocker?"];

const isToday = (date) => {
  const today = new Date();

  if (today.toDateString() === date.toDateString()) {
    return true;
  }

  return false;
};

const Status = () => {
  const userInfo = useSelector((state) => state.userData);
  const [activeStep, setActiveStep] = useState(0);
  const [lastStatusDate, setLastStatusDate] = useState(new Date("1"));
  const [dailyStatusList, setDailyStatusList] = useState([]);
  const [todayLearnedList, setTodayLearnedList] = useState([]);

  const userId = useSelector((state) => state.userId);

  // GET methods
  useEffect(() => {
    api.get(url.getPostUserDailies(userInfo.id)).then((response) => {
      setDailyStatusList(response.data);
    });
  }, []);

  useEffect(() => {
    api.get(url.getPostUserLearned(userInfo.id)).then((response) => {
      setTodayLearnedList(response.data);
    });
  }, []);

  useEffect(() => {
    if (dailyStatusList.length > 0) {
      setLastStatusDate(
        new Date(dailyStatusList[dailyStatusList.length - 1].createdDate)
      );
    }
  }, [dailyStatusList]);

  // POST methods

  // DailyStatus POST
  const handleDailyStatus = (obj) => {
    api.post(url.getPostUserDailies(userInfo.id), obj).then((response) => {
      setActiveStep(activeStep + 1);
      setDailyStatusList(dailyStatusList.concat(response.data));
    });
  };

  // LearnedToday POST
  const handleTodayLearned = (obj) => {
    api.post(url.getPostUserLearned(userInfo.id), obj).then((response) => {
      setActiveStep(activeStep + 1);
      setTodayLearnedList(todayLearnedList.concat(response.data));
    });
  };

  // Tickets POST
  const handleBlocker = (obj) => {
    // if obj received is null then nothing is done
    if (obj === null) {
      return;
    }
    api
      .post(url.postTicketByID(userInfo.id), obj)
      .then(setActiveStep(activeStep + 1));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <DailyStatus onDailyStatusSubmit={handleDailyStatus} />;
      case 1:
        return <TodayLearned onTodayLearnedSubmit={handleTodayLearned} />;
      case 2:
        return <Blockers onBlockerSubmit={handleBlocker} />;
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Today's Status
        </Typography>
        <Stepper
          activeStep={
            isToday(lastStatusDate) === true && activeStep === 0
              ? 3
              : activeStep
          }
          sx={{ pt: 3, pb: 5 }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ||
        (isToday(lastStatusDate) && activeStep === 0) ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you!
            </Typography>
            <Typography variant="subtitle1">
              You've successfully submitted your today's status!
            </Typography>
          </>
        ) : (
          <>{getStepContent(activeStep)}</>
        )}
      </Paper>
      <StatusTab
        statusList={dailyStatusList}
        todayLearnedList={todayLearnedList}
      />
    </Container>
  );
};

export default Status;
