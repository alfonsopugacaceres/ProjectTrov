import React, {useState, useContext, useEffect, Fragment} from "react";
import {Row, Col, Container, Jumbotron, Form, Button} from "react-bootstrap";
import PropTypes from "prop-types";
import IncidentGridContext from "./Context/IncidentGridContext";
import IncidentGridFilter from "./IncidentGridFilter";
import IncidentGridBody from "./IncidentGridBody";
import AppLoading from "../AppLoading/AppLoading";
import "./IncidentGrid.css";

const IncidentGrid = ()=>{

    const {
        IncidentGridHeader,
        IncidentGridData
    } = IncidentGrid;
    
    const {
        Incidents,
        Loading,
        DataSeeded,
        retrieveIncidents,
        seedData} = useContext(IncidentGridContext);

    //Useeffect hook is set up in a way to facilitate the original Seeding of data, then launching a data retrieval 
    //to populate the grid
    useEffect(()=>{
        if(Incidents === null && DataSeeded === false && Loading === true){
            seedData();
        }
        else if(Incidents === null && Loading === true){
            retrieveIncidents();
        }
    },[DataSeeded, Loading, Incidents]);//useEffect is tracking Loading and Incidents to determine whether or not to rerender

    return(
        <Container>
            <Row>
                <Col md={12}>
                    <Jumbotron>
                        <h1 className="IncidentHeader">{IncidentGridHeader}</h1>
                    </Jumbotron>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <IncidentGridFilter></IncidentGridFilter>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                {
                    (Loading)
                    ?
                    <AppLoading></AppLoading>
                    :
                    <IncidentGridBody></IncidentGridBody>
                }
            </Col>
        </Row>
        </Container>

    );
}

/*
IncidentGrid.propTypes  = {
    IncidentGridHeader: PropTypes.string,
    IncidentGridData: PropTypes.arrayOf(
        PropTypes.shape({
            Id: PropTypes.number,
            Vin: PropTypes.string,
            IncidentDate: PropTypes.string,
            MakeModel: PropTypes.string,
            VinYear: PropTypes.string
        })
    )
}
*/


export {IncidentGrid};