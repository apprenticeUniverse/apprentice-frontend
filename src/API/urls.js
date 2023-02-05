//USER
export const getUserByID = (ID) => {
  return "/api/user/" + ID.toString();
};
export const GET_ALL_USERS = "/api/user";
export const POST_NEW_USER = "/api/user";
export const GET_ALL_STAKEHOLDERS = "/api/user/stakeholder";
export const putUser = (ID) => {
  return "/api/user/" + ID;
};

export const getUserIdByEmail = (email) => {
  return `/api/user/findID?emailAddress=${email}`;
};

export const getPostUserTickets = (id) => {
  return `/api/user/${id}/tickets`;
};

export const getPostUserDailies = (id) => {
  return `/api/user/${id}/status`;
};

export const getPostUserLearned = (id) => {
  return `/api/user/${id}/learned`;
};

export const putUserPassword = (id) => {
  return `/api/user/${id}/password`;
};

//TICKETS
export const POST_TICKET = "/api/ticket";
export const GET_ALL_TICKETS = "/api/ticket";
export const getTicketByID = (ID) => {
  return "/api/ticket/" + ID.toString();
};
export const postTicketByID = (ID) => {
  return "/api/ticket/" + ID.toString();
};
export const putTicketByID = (ID) => {
  return "/api/ticket/" + ID.toString();
};
export const getTicketsPerUser = (IDuser) => {
  return `/api/user/${IDuser.toString()}/tickets`;
};
export const getTicketsByStakeholderID = (stakeholderID) => {
  return `/api/user/stakeholder/tickets/${stakeholderID.toString()}`;
};

//FAQ
export const GET_ALL_FAQ = "/api/FAQ";
export const POST_NEW_FAQ = "/api/FAQ";
export const deleteFaqByID = (id) => {
  return `/api/FAQ/${id}`;
};
export const putFaqByID = (id) => {
  return `/api/FAQ/${id}`;
};

//BATCHES
export const getBatchByID = (ID) => {
  return "/api/batch/" + ID.toString();
};
export const postApprenticetoBatch = (batchID, apprenticeID) => {
  return `/api/batch/${batchID.toString()}/add/${apprenticeID.toString}`;
};
export const postAssignmentToBatch = (batchID) => {
  return `/api/assignment/batch/${batchID.toString()}`;
};
export const POST_NEW_BATCH = "/api/batch";
export const GET_ALL_BATCHES = "/api/batch";
export const GET_ALL_ARCHIVED_BATCHES = "/api/batch/archive";
export const putBatch = (ID) => {
  return "/api/batch/" + ID;
};
export const postNewUserAndAddToBatch = (batchID) => {
  return `api/batch/${batchID}/newUser`;
};

//ASSIGNMENTS
export const GET_ALL_USERS_ASSIGNMENTS = "/api/assignment";
export const getAssignmentByID = (ID) => {
  return "/api/assignment/" + ID.toString();
};
export const getAssignmentsByStakeholderID = (stakeholderID) => {
  return "/api/user/stakeholder/assignments/" + stakeholderID.toString();
};

export const deleteAssignmentByID = (ID) => {
  return "/api/assignment/" + ID.toString();
};
export const getAssignmentsPerUser = (IDuser) => {
  return `/api/user/${IDuser.toString()}/assignments`;
};
export const POST_ASSIGNMENT_TO_APPRENTICE_ID = "/api/assignment/apprentice/";
export const POST_ASSIGNMENT_TO_BATCH_ID = "/api/assignment/batch/";
export const postIndividualAssignmentByApprenticeID = (ID) => {
  return `/api/assignment/apprentice/${ID.toString()}`;
};
export const postWeeklyAssignmentByBatchID = (ID) => {
  return "/api/assignment/weekly/" + ID.toString();
};
export const putAssignmentByBatchID = (ID) => {
  return "/api/assignment/" + ID.toString();
};
export const postSolutionToAssignment = (assignmentID, userID) => {
  return `/api/assignment/${assignmentID}/user/${userID}`;
};
export const putFeedbackToSolution = (assignmentID, userID) => {
  return `/api/assignment/${assignmentID}/user/${userID}`;
};
export const POST_WEEKLY_ASSIGNMENT = "/api/assignment/weekly/new";

// AUTH ROUTE

export const LOGIN_AUTH = "/api/v1/auth/authenticate";
