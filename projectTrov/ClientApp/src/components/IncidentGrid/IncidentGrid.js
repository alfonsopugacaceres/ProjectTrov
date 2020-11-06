import React, {useState, useContext, useEffect, Fragment} from "react";
import {Row, Col, Container, Jumbotron, Form, Button} from "react-bootstrap";
import PropTypes from "prop-types";
import IncidentGridContext from "./Context/IncidentGridContext";
import AppLoading from "../AppLoading/AppLoading";
import "./IncidentGrid.css";

const IncidentGridRow = ({ IncidentData }) =>{

    debugger;
    const {
        id,
        vin,
        incidentDate,
        makeModel,
        vinYear
    } = IncidentData;

    return(
        <Row className="IncidentGridRow">
            <Col md={1}><label>{id}</label></Col>
            <Col md={3}><label>{vin}</label></Col>
            <Col md={3}><label>{incidentDate}</label></Col>
            <Col md={3}><label>{makeModel}</label></Col>
            <Col md={2}><label>{vinYear}</label></Col>
        </Row>
    );
}

const IcidentInsert = ()=>{
    
    const [displayWrapper, setDisplay] = useState(false);


    const CreateNewTicket = ()=>{

    }

    return(
        <div>
            <Container fluid={true} className={(displayWrapper) ? "IncidentAddWrapper_hide" : "IncidentAddWrapper_show"}>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="ActivateInsertControl">
                            <Button variant="light" type="button" onClick={()=>{setDisplay(!displayWrapper)}}>Add Incident</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Container>
            <Container fluid={true} className={(displayWrapper) ? "IncidentAddWrapper_show" : "IncidentAddWrapper_hide"}>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="IncidentVin">
                            <Form.Label>Vin #</Form.Label>
                            <Form.Control type="text" placeholder="Enter Vin" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="IncidentDate">
                            <Form.Label>Incident Date</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="IncidentNote">
                            <Form.Label>Incident Note</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="CancelIncidentInsert">
                            <Button variant="light" type="button" onClick={()=>{setDisplay(!displayWrapper)}}>Cancel</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Container>
        </div>
    );
}

const IncidentGridBody =({IncidentGridData})=>{
    debugger;
    return(
        <Container fluid={true}>
            <Row>
                <Col md={12}>
                    <Container fluid={true} className="IncidentLoading_show">
                        <Row>
                            <Col md={12}>
                                <Container fluid={true}>
                                    <IcidentInsert></IcidentInsert>
                                </Container>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Container fluid={true}>
                                    {
                                        IncidentGridData.map(
                                            (Incident)=>(<IncidentGridRow key={Incident.id} IncidentData={Incident}></IncidentGridRow>)
                                        )
                                    }
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row> 
        </Container>
    );
}

const IncidentGrid = ({IncidentGrid})=>{

    const {
        IncidentGridHeader,
        IncidentGridData
    } = IncidentGrid;
    
    const {
        Incidents,
        Loading,
        DataSeeded,
        ErrorPresent,
        ErrorText,
        setLoading,
        retrieveIncidents,
        setError,
        clearError,
        seedData} = useContext(IncidentGridContext);

    //Useeffect hook is set up in a way to facilitate the original Seeding of data, then launching a data retrieval 
    //to populate the grid
    useEffect(()=>{
        debugger;
        if(Incidents === null && DataSeeded === false && Loading === true){
            seedData();
        }
        else if(Incidents === null && Loading === true){
            retrieveIncidents();
        }
    },[DataSeeded, Loading, Incidents]);//useEffect is tracking Loading and Incidents to determine whether or not to rerender

    debugger;
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
                {
                    (Loading)
                    ?
                    <AppLoading></AppLoading>
                    :
                    <IncidentGridBody IncidentGridData={Incidents}></IncidentGridBody>
                }
            </Col>
        </Row>
        </Container>

    );
}


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


export {IncidentGrid};