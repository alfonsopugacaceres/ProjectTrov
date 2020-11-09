import {
    SET_INCIDENTS,
    SET_LOADING,
    CLEAR_ERROR,
    SEED_DATA,
    FILTER_DATA,
    CLEAR_FILTER,
    SET_FILTER_DT_START,
    SET_FILTER_DT_END,
    CLEAR_FILTER_DT_START,
    CLEAR_FILTER_DT_END,
    SET_FILTER_VIN,
    CLEAR_FILTER_VIN,
    INSERTED_INCIDENT,
    SET_N_INCI_DT,
    SET_N_INCI_VIN,
    SET_M_INCI_NOTE,
    INSERT_DISPLAY_SET,
    FILTER_DISPLAY_SET,
    ADD_WARNING,
    DELETE_WARNING,
    CLEAR_ALL_WARNINGS
} from "./IncidentTypes";


export default (state, action)=>{
    switch(action.type){
        case SET_INCIDENTS:
            return {...state, Incidents: action.payload.data, Loading: false};
        case SET_LOADING:
            return{...state, Loading: action.payload};
        case CLEAR_ERROR:
            return{...state, ErrorText: null, ErrorPresent: false};
        case SEED_DATA:
            return{...state, DataSeeded: true};
        case FILTER_DATA:
            return{...state, Loading: false, FilteringPresent: true, FilteredIncidents: action.FilteredIncidents};
        case CLEAR_FILTER:
            return{...state, Loading: false, FilteringPresent: false,  FilterStartDate: null, FilterEndDate: null, FilterVin: null, FilteredIncidents: [], FilterDisplay: false};
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
        case SET_N_INCI_DT:
            return{...state, NewIncident: {...state.NewIncident, IncidentDate: action.IncidentDate}};
        case SET_M_INCI_NOTE:
            return{...state, NewIncident: {...state.NewIncident, Note: action.Note}};
        case SET_N_INCI_VIN:
            return{...state, NewIncident: {...state.NewIncident, VinNumber: action.VinNumber}};
        case INSERTED_INCIDENT:
            return {...state, Incidents: action.payload.data, Loading: false, InsertDisplay: false, NewIncident: {...state.NewIncident, VinNumber: "", IncidentDate:null, Note: ""}};
        case INSERT_DISPLAY_SET:
            return{...state, InsertDisplay: action.InsertDisplay};
        case FILTER_DISPLAY_SET:
            return{...state, FilterDisplay: action.FilterDisplay};
        case ADD_WARNING:
            return{...state, Warnings: action.Warnings, WarningDisplay: true};
        case DELETE_WARNING:
            return{...state, Warnings: action.Warnings, WarningDisplay: action.WarningDisplay, Loading: false};
        case CLEAR_ALL_WARNINGS:
            return{...state, Warnings: [], WarningDisplay: false};
        default:
            return {...state};

    }
}

