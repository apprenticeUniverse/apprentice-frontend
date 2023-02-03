import * as actions from "../actionTypes";



export default function tokenData(state ={}, action){
    switch (action.type){
        case actions.SET_TOKEN_DATA: 
            
            return (action.payload);
        default: 
            return state;
    }

}