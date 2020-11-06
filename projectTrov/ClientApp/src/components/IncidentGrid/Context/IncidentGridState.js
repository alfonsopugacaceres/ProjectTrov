import React, {useReducer} from "react";
import IncidentGridContext from "./IncidentGridContext";
import IncidentGridReducer from "./IncidentGridReducer";
import {
    SET_INCIDENTS,
    SET_LOADING,
    SET_ERROR,
    CLEAR_ERROR,
    SEED_DATA
} from "./IncidentTypes";
import axios from "axios";

const IncidentGridState = (props)=>{
    const initialState ={
        Incidents: null,              //list containig all incidents
        ErrorText: null,            //error text to display
        Loading: true,              //state variable to control loading behavior
        ErrorPresent: false,        //state variable controlling error behavior
        DataSeeded: false           //I am using this state to determine of the data is seeded or not
    }


//I created this functions to seed data into the in memory database. I was 
//having tons of issues with my project set up these past few days and I just
//needed to get the project going
const seedData = ()=>{

    const seedData = [
        {Id : 0, Vin : "JTKDE177160124954", VinYear : "2006", MakeModel : "TOYOTA", Note : "Bumper crash"},
        {Id : 0, Vin : "2GCEK13TX51128592", VinYear : "2005", MakeModel : "CHEVROLET", Note : "Rear end crash"},
        {Id : 0, Vin : "3B6MC3667XM554105", VinYear : "1999", MakeModel : "DODGE", Note : "Broken window"},
        {Id : 0, Vin : "5J8TB4H52FL000489", VinYear : "2015", MakeModel : "ACURA", Note : "Stolen"},
        {Id : 0, Vin : "1GNEC13V44R194325", VinYear : "2004", MakeModel : "CHEVROLET", Note : "Fell off a bridge"}
    ]

    //use axios to post a request to seed data into the in memory database so we have something to display on load
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




//The provider allows us to tie state variabels in a wrapper, making them available for all the children
    return <IncidentGridContext.Provider
        value={{
            Incidents: state.Incidents,
            Loading: state.Loading,
            ErrorPresent: state.ErrorPresent,
            ErrorText: state.ErrorText,
            DataSeeded: state.DataSeeded,
            setLoading,
            retrieveIncidents,
            setError,
            clearError,
            seedData
        }}
    >
        {props.children}
        </IncidentGridContext.Provider>

}

export default IncidentGridState