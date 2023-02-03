//file where I'll buid my functions to dispatch an action

import * as actions from "./actionTypes";


export const addUserInfo = (info) =>{
    return {
        type: actions.SET_USER,
        payload: info
    };
};

export const changeIsLogged = (value) =>{
    return {
        type: actions.SIGN_IN,
        payload: value
    };
};

export const addUserID = (id) =>{
    return {
        type: actions.SET_USER_ID,
        payload: id
    };
};

export const addTokenData = (info) =>{
    return {
        type: actions.SET_TOKEN_DATA,
        payload: info
    };
};

export const addBatchInfo = (data) =>{
    return {
        type: actions.SET_BATCH,
        payload: data
    };
};


export const addAssignmInfo = (data) =>{
    return {
        type: actions.SET_ASSIGNMENT,
        payload: data
    };
};

export const addStakeAssignmsInfo = (data) =>{
    return {
        type: actions.SET_STAKE_ASSIGNMENTS,
        payload: data
    };
};

export const addTicketInfo = (data)=>{
    return{
        type: actions.SET_TICKET,
        payload: data

    }
}
