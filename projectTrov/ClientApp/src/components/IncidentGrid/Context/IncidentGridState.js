import React, {useReducer} from "react";
import IncidentGridContext from "./IncidentGridContext";
import IncidentGridReducer from "./IncidentGridReducer";
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
    SET_M_INCI_NOTE,
    SET_N_INCI_VIN,
    SET_N_INCI_DT,
    INSERT_DISPLAY_SET,
    FILTER_DISPLAY_SET,
    ADD_WARNING,
    DELETE_WARNING,
    CLEAR_ALL_WARNINGS
} from "./IncidentTypes";
import axios from "axios";

const IncidentGridState = (props)=>{
    const initialState = {
        Loading: true,
        Incidents: null,              //list containig all incidents
        FilterVin: "",
        FilteredIncidents: null,              
        FilterStartDate: null,
        FilterEndDate: null,
        NewIncident:{
            Id : 0,
            Note : "",
            IncidentDate: null,
            VinNumber: ""
        },
        Warnings:[],
        ErrorText: null,            //error text to display
        ErrorPresent: false,        //state variable controlling error behavior
        DataSeeded: false,           //I am using this state to determine of the data is seeded or not
        FilteringPresent: false,
        InsertDisplay: false,
        FilterDisplay: false,
        WarningDisplay: false
    }


//I created this functions to seed data into the in memory database. I was 
//having tons of issues with my project set up these past few days and I just
//needed to get the project going
const seedData = ()=>{

    const seedData = [
        {Id : 0, VinNumber : "JTKDE177160124954", Note : "Bumper crash", IncidentDate: "11-01-2020"},
        {Id : 0, VinNumber : "2GCEK13TX51128592", Note : "Rear end crash", IncidentDate: "11-06-2020"},
        {Id : 0, VinNumber : "3B6MC3667XM554105", Note : "Broken window", IncidentDate: "01-03-2020"},
        {Id : 0, VinNumber : "5J8TB4H52FL000489", Note : "Stolen", IncidentDate: "01-02-2020"},
        {Id : 0, VinNumber : "1GNEC13V44R194325",Note : "Fell off a bridge", IncidentDate: "01-01-2020"}
    ]

    //use axios to post a request to seed data into the in memory database so we have something to display on load
    if(state.DataSeeded){
        return;
    }

    axios.post(
        "http://localhost:5000/Incident/Seed", seedData, {"Content-type":"application/json"})
    .then(function(response){
        dispatch({type:SEED_DATA});
    })
    .catch(function(error){
        setLoading(false);
        addWarning({Id:"seedData", WarningHeading: "Failed to Seed data", WarningText: "Could not seed data into database"});
    });

}
const [state, dispatch] = useReducer(IncidentGridReducer, initialState)//attaching the state to the IncidentGridReducer

const setLoading = (toggle)=>{
    dispatch({type:SET_LOADING, payload: toggle});//change loading state
}

const retrieveIncidents = async ()=>{
    if(!state.Loading)
        setLoading();
    axios.get("http://localhost:5000/Incident")
    .then(function(response){
        dispatch({type:SET_INCIDENTS, payload: response});
    })
    .catch(function(error){
        setLoading(false);
        addWarning({Id:"retrieveIncidents", WarningHeading: "Failed to Retrieve Incidents", WarningText: "Could not retrieve Incident Grid Data from database"});
    });
}

const clearError = ()=>{
    dispatch({type:CLEAR_ERROR});
}

const filterIncidents = ()=>{
    if(state.Loading){
        return;
    }
    setLoading(true);
    if(!state.DataSeeded){
        setLoading(false);
        return;
    }
    else{ 
        let startTime = null;
        let endTime = null;
        let datesValid = false;
        let incidentValid = false;
        let vinValid = false;
        let filteredIncidents = null;

        if(state.Incidents !== undefined && state.Incidents !== null &&
            state.Incidents.length  > 0){
                incidentValid = true;
        }

        if(!incidentValid){
            dispatch({type: CLEAR_FILTER});
        }

        if(state.FilterVin !== undefined && state.FilterVin !== null && typeof(state.FilterVin) === "string" && state.FilterVin !== ""){
                vinValid = true;
            }

        if(state.FilterStartDate !== undefined && state.FilterStartDate !== null && 
            state.FilterEndDate !== undefined && state.FilterEndDate !== null &&
            state.FilterEndDate.getTime !== null && state.FilterStartDate.getTime !== null){
                startTime = state.FilterStartDate.getTime();
                endTime = state.FilterEndDate.getTime();
                if(endTime < startTime){
                    setLoading(false);
                    addWarning({Id:"filterIncidentsDate", WarningHeading: "Filter Date Range Invalid", WarningText: "Please enter a valid date range to filter by"});
                    return;
                }
                else{
                    datesValid = true;
                }
        }
        
        if(incidentValid){
            if(vinValid && datesValid){
                filteredIncidents = state.Incidents.filter(incident => incident.vinNumber.startsWith(state.FilterVin) && startTime <= (new Date(incident.incidentDate).getTime()) &&  (new Date(incident.incidentDate)).getTime() <= endTime);
                dispatch({type: FILTER_DATA, FilteredIncidents: filteredIncidents});
            }
            else if(vinValid){
                filteredIncidents = state.Incidents.filter(incident => incident.vinNumber.startsWith(state.FilterVin));
                dispatch({type: FILTER_DATA, FilteredIncidents: filteredIncidents});
            }
            else if(datesValid){
                filteredIncidents = state.Incidents.filter(incident => startTime <= (new Date(incident.incidentDate).getTime()) &&  (new Date(incident.incidentDate)).getTime() <= endTime);
                dispatch({type: FILTER_DATA, FilteredIncidents: filteredIncidents});
            }
            else{
                setLoading(false);
                addWarning({Id:"filterIncidentsValid", WarningHeading: "No Valid Filter Criteria", WarningText: "Please enter a valid filter criteria"});
            }
        }
    }
}


const insertIncident = ()=>{
    
    if(state.Loading){
        return;
    }
    setLoading(true);
    if(!state.DataSeeded){
        setLoading(false);
        return;
    }


    if(state.NewIncident.Note === "" || state.NewIncident.IncidentDate === null || state.NewIncident.VinNumber === ""){
        setLoading(false);
        addWarning({Id:"insertIncident", WarningHeading: "Cannot Insert Incident", WarningText: "One of the required incident fields was missing"});
        return;
    }

    let date = state.NewIncident.IncidentDate;
    let dateString = (date.getMonth()+1)  + "-" + date.getDate() + "-" + date.getFullYear();
    var newIncident = {
        "Id" : 0,
        "Note" : state.NewIncident.Note,
        "IncidentDate": dateString,
        "VinNumber": state.NewIncident.VinNumber,
        "Vin" : null
    }

    axios.post(
        "http://localhost:5000/Incident", newIncident, {"Content-type":"application/json"})
    .then(function(res){

        axios.get("http://localhost:5000/Incident")
        .then(function(response){
            dispatch({type:SET_INCIDENTS, payload: response});
        })
        .catch(function(error){
            addWarning({Id:"insertIncidentRetrieve", WarningHeading: "Failed to Retrieve Incidents", WarningText: "Could not retrieve Incident Grid Data from database after insert"});
        });
    })
    .catch(function(error){
        addWarning({Id:"insertIncidentCall", WarningHeading: "Failed to Insert into Database", WarningText: "There was an issue inserting Incident into the database"});
    });

}

    
const setFilterStartDt = (startDate)=>{
    dispatch({type:SET_FILTER_DT_START, FilterStartDate: startDate});
}

const setFilterEndDt = (endDate)=>{
    dispatch({type:SET_FILTER_DT_END, FilterEndDate: endDate});
}

const setFilterVin = (vin)=>{
    dispatch({type:SET_FILTER_VIN, FilterVin: vin});
}

const clearFilterStartDt = ()=>{
    dispatch({type:CLEAR_FILTER_DT_START});
}

const clearFilterEndDt = ()=>{
    dispatch({type:CLEAR_FILTER_DT_END});
}

const clearFilterVin = ()=>{
    dispatch({type:CLEAR_FILTER_VIN});
}

const clearFilters = ()=>{
    dispatch({type:CLEAR_FILTER});
}

const setNIncNote = (note)=>{
    dispatch({type:SET_M_INCI_NOTE, Note: note})
}
const setNIncVin = (vin)=>{
    dispatch({type:SET_N_INCI_VIN, VinNumber: vin})
}
const setNIncDate = (date)=>{
    dispatch({type:SET_N_INCI_DT, IncidentDate: date})
}
const setInsertDisplay = (val)=>{
    dispatch({type:INSERT_DISPLAY_SET, InsertDisplay: val})
}
const setFilterDisplay = (val)=>{
    dispatch({type:FILTER_DISPLAY_SET, FilterDisplay: val})
}

const addWarning = (warning)=>{

    if(state.Warnings.length > 0){
        var duplicateWarning = state.Warnings.filter(f=>f.Id === warning.Id);
        if(duplicateWarning !== null){
            return;
        }
    }
    state.Warnings.push(warning);
    dispatch({type:ADD_WARNING, Warnings: state.Warnings})
}

const deleteWarning = (Id)=>{

    var filteredWarnings = state.Warnings.filter(f=>f.Id !== Id);
    var display = (filteredWarnings.length > 0) ? true : false;
    debugger;

    dispatch({type:DELETE_WARNING, Warnings: filteredWarnings, WarningDisplay: display})
}

const clearWarnings = ()=>{

    dispatch({type:CLEAR_ALL_WARNINGS})
}





//The provider allows us to tie state variabels in a wrapper, making them available for all the children
    return <IncidentGridContext.Provider
        value={{
            Loading: state.Loading,
            Incidents: state.Incidents,
            NewIncident: state.NewIncident,
            Warnings: state.Warnings,
            FilterVin: state.FilterVin,
            FilteredIncidents: state.FilteredIncidents,
            FilterStartDate: state.FilterStartDate,
            FilterEndDate: state.FilterEndDate,
            ErrorPresent: state.ErrorPresent,
            ErrorText: state.ErrorText,
            DataSeeded: state.DataSeeded,
            FilteringPresent: state.FilteringPresent,
            InsertDisplay: state.InsertDisplay,
            FilterDisplay: state.FilterDisplay,
            WarningDisplay: state.WarningDisplay,
            setLoading,
            retrieveIncidents,
            clearError,
            seedData,
            filterIncidents,
            setFilterStartDt,
            setFilterEndDt,
            setFilterVin,
            clearFilterStartDt,
            clearFilterEndDt,
            clearFilterVin,
            clearFilters,
            setNIncNote,
            setNIncVin,
            setNIncDate,
            insertIncident,
            setInsertDisplay,
            setFilterDisplay,
            addWarning,
            deleteWarning,
            clearWarnings
        }}
    >
        {props.children}
        </IncidentGridContext.Provider>

}

export default IncidentGridState