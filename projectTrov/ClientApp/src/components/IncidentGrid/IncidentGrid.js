import React, {useContext, useEffect} from "react";
import {Row, Col, Container, Jumbotron} from "react-bootstrap";
import IncidentGridContext from "./Context/IncidentGridContext";
import IncidentGridBody from "./IncidentGridBody";
import IncidentWarning from "./IncidentWarning";
import "./IncidentGrid.css";

const IncidentGrid = ()=>{

    const {
        Loading,
        Incidents,
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
    },[DataSeeded, Incidents]);//useEffect is tracking Loading and Incidents to determine whether or not to rerender

    return(
        <Container>
            <Row>
                <Col md={12}>
                    <Jumbotron>
                        <h1 className="IncidentHeader">Incident Project</h1>
                    </Jumbotron>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <IncidentWarning></IncidentWarning>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <IncidentGridBody></IncidentGridBody>
                </Col>
            </Row>
        </Container>

    );
}


export {IncidentGrid};