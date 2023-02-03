import * as actions from "../actionTypes";



export default function addTicketInfo(state ={}, action){
    switch (action.type){
        case actions.SET_TICKET: 
            
            return (action.payload);
        default: 
            return state;
    }

}