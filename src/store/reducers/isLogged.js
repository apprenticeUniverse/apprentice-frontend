import * as actions from "../actionTypes";

export default function LoggedReducer(state =false, action){
    switch (action.type){
        case actions.SIGN_IN:
            return !state;
        default: 
            return false;
    }

}