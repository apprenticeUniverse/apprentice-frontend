import * as actions from "../actionTypes";



export default function stakeAssignmsData(state =[], action){
    switch (action.type){
        case actions.SET_STAKE_ASSIGNMENTS: 
            
            return (action.payload);
        default: 
            return state;
    }

}