import * as actions from "../actionTypes";



export default function setBatchData(state ={}, action){
    switch (action.type){
        case actions.SET_BATCH: 
            
            return (action.payload);
        default: 
            return state;
    }

}