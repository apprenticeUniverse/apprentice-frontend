import * as actions from "../actionTypes";



export default function addUserId(state =" ", action){
    switch (action.type){
        case actions.SET_USER_ID: 
            
            return (action.payload);
        default: 
            return state;
    }

}