import {
    SET_INCIDENTS,
    SET_LOADING,
    SET_ERROR,
    CLEAR_ERROR,
    SEED_DATA
} from "./IncidentTypes";


export default (state, action)=>{
    debugger;
    switch(action.type){
        case SET_INCIDENTS:
            return {...state, Incidents: action.payload.data, Loading: false};
        case SET_LOADING:
            return{...state, Loading: action.payload};
        case SET_ERROR:
            return{...state, ErrorText: action.payload.ErrorText, ErrorPresent: true};
        case CLEAR_ERROR:
            return{...state, ErrorText: null, ErrorPresent: false};
        case SEED_DATA:
            return{...state, DataSeeded: true};
    }
}

