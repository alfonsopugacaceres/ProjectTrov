import {
    SET_INCIDENTS,
    SET_LOADING,
    SET_ERROR,
    CLEAR_ERROR,
    SEED_DATA,
    FILTER_DATA,
    CLEAR_FILTER,
    SET_FILTER_DT_START,
    SET_FILTER_DT_END,
    CLEAR_FILTER_DT_START,
    CLEAR_FILTER_DT_END,
    SET_FILTER_VIN,
    CLEAR_FILTER_VIN
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
        case FILTER_DATA:
            debugger;
            return{...state, Loading: false, FilteringPresent: true, FilteredIncidents: action.FilteredIncidents};
        case CLEAR_FILTER:
            debugger;
            return{...state, Loading: false, FilteringPresent: false, FilteredIncidents: []};
        case SET_FILTER_DT_START:
            return{...state, FilterStartDate: action.FilterStartDate};
        case SET_FILTER_DT_END:
            return{...state, FilterEndDate: action.FilterEndDate};
        case SET_FILTER_VIN:
            return{...state, FilterVin: action.FilterVin};
        case CLEAR_FILTER_DT_START:
            return{...state, FilterStartDate: null};
        case CLEAR_FILTER_DT_END:
            return{...state, FilterEndDate: null};
        case CLEAR_FILTER_VIN:
            return{...state, FilterEndDate: null};
    }
}

