import * as actions from "../actionTypes";



export default function addAssignmentInfo(state ={}, action){
    switch (action.type){
        case actions.SET_ASSIGNMENT: 
            
            return (action.payload);
        default: 
            return state;
    }

}