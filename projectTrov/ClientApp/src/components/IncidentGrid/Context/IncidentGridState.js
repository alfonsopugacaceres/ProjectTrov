import React, {useReducer} from "react";
import IncidentGridContext from "./IncidentGridContext";
import IncidentGridReducer from "./IncidentGridReducer";
import {
    SET_INCEDENTS,
    SET_LOADING,
    SET_ERROR,
    CLEAR_ERROR
} from "./IncidentTypes";
import axios from "axios";

const IncidentGridState = (props)=>{
    const initialState ={
        Incidents: null,              //list containig all incidents
        ErrorText: null,            //error text to display
        Loading: true,              //state variable to control loading behavior
        ErrorPresent: false,        //state variable controlling error behavior
    }


const [state, dispatch] = useReducer(IncidentGridReducer, initialState)//attaching the state to the IncidentGridReducer

const setLoading = (toggle)=>{
    dispatch({type:SET_LOADING, payload: toggle});//change loading state
}

const retrieveIncidents = async ()=>{
    setLoading();
    debugger;
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.get("http://localhost:5000/Incident")
    .then(function(response){
        debugger;
        dispatch({type:SET_INCEDENTS, payload: response});
    })
    .catch(function(error){
        debugger;
        setError(error)
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
            setLoading,
            retrieveIncidents,
            setError,
            clearError
        }}
    >
        {props.children}
        </IncidentGridContext.Provider>

}

export default IncidentGridState