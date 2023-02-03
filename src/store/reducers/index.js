import userData from './userData'
import LoggedReducer from "./isLogged";
import batchData from './batchData';
import assignmentInfo from './assignmentInfo';
import ticketInfo from './ticketInfo';
import {combineReducers} from 'redux';
import stakeAssignmsData from './stakeAssignmsData';
import tokenData from './tokenData';
import userId from './userId'





const allReducers = combineReducers({
    userData: userData,
    isLogged: LoggedReducer,
    batchData: batchData,
    assignmentInfo: assignmentInfo,
    ticketInfo: ticketInfo,
    stakeAssignmsData: stakeAssignmsData,
    tokenData:  tokenData,
    userId: userId
    

});

export default allReducers;