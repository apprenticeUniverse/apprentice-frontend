import * as actions from "../actionTypes";



export default function userData(state ={}, action){
    switch (action.type){
        case actions.SET_USER: 
            
            return (action.payload);
        default: 
            return state;
    }

}