import {
    SET_INCEDENTS,
    SET_LOADING,
    SET_ERROR,
    CLEAR_ERROR,
} from "./IncidentTypes";


export default (state, action)=>{
    switch(action.type){
        case SET_INCEDENTS:
            return {...state, Incidents: action.Incidents};
        case SET_LOADING:
            return{...state, Loading: action.payload};
        case SET_ERROR:
            return{...state, ErrorText: action.payload.ErrorText, ErrorPresent: true};
            case CLEAR_ERROR:
                return{...state, ErrorText: null, ErrorPresent: false};
    }
}