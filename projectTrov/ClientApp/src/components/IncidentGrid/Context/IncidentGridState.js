import React, {useReducer} from "react";
import IncidentGridContext from "./IncidentGridContext";
import IncidentGridReducer from "./IncidentGridReducer";
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
    CLEAR_FILTER_VIN,
    SET_M_INCI_NOTE,
    SET_N_INCI_VIN,
    SET_N_INCI_DT
} from "./IncidentTypes";
import axios from "axios";

const IncidentGridState = (props)=>{
    const initialState ={
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
        ErrorText: null,            //error text to display
        Loading: true,              //state variable to control loading behavior
        ErrorPresent: false,        //state variable controlling error behavior
        DataSeeded: false,           //I am using this state to determine of the data is seeded or not
        FilteringPresent: false
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
        setError({ErrorText: "There was an issue seeding data to the in memory database"});
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
        setError({ErrorText: "There was an issue retrieving data from the database"});
    });
}

const setError = (errorText)=>{
    dispatch({type:SET_ERROR, payload: errorText});
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

        if(state.FilterVin !== undefined && state.FilterVin !== null && typeof(state.FilterVin) == "string" && state.FilterVin != ""){
                vinValid = true;
            }

        if(state.FilterStartDate !== undefined && state.FilterStartDate !== null && 
            state.FilterEndDate !== undefined && state.FilterEndDate !== null &&
            state.FilterEndDate.getTime != null && state.FilterStartDate.getTime != null){
                startTime = state.FilterStartDate.getTime();
                endTime = state.FilterEndDate.getTime();
                if(endTime < startTime){
                    setLoading(false);
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
                dispatch({type: CLEAR_FILTER});
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
            setError({ErrorText: "There was an issue retrieving data from the database"});
        });
    })
    .catch(function(error){
        setError({ErrorText: "There was an inserting new incident to the in memory database"});
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


//The provider allows us to tie state variabels in a wrapper, making them available for all the children
    return <IncidentGridContext.Provider
        value={{
            Loading: state.Loading,
            Incidents: state.Incidents,
            NewIncident: state.NewIncident,
            FilterVin: state.FilterVin,
            FilteredIncidents: state.FilteredIncidents,
            FilterStartDate: state.FilterStartDate,
            FilterEndDate: state.FilterEndDate,
            Loading: state.Loading,
            ErrorPresent: state.ErrorPresent,
            ErrorText: state.ErrorText,
            DataSeeded: state.DataSeeded,
            FilteringPresent: state.FilteringPresent,
            setLoading,
            retrieveIncidents,
            setError,
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
            insertIncident
        }}
    >
        {props.children}
        </IncidentGridContext.Provider>

}

export default IncidentGridState