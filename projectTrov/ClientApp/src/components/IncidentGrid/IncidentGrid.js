import React, {useState, useContext, useEffect} from "react";
import {Row, Col, Container, Jumbotron, Form, Button, Spinner} from "react-bootstrap";
import PropTypes from "prop-types";
import IncidentGridContext from "./Context/IncidentGridContext";
import "./IncidentGrid.css";

const IncidentGridRow = ({ IncidentData }) =>{

    const {
        Id,
        Vin,
        IncidentDate,
        MakeModel,
        VinYear
    } = IncidentData;

    return(
        <Row className="IncidentGridRow">
            <Col md={1}>{Id}</Col>
            <Col md={3}>{Vin}</Col>
            <Col md={3}>{IncidentDate}</Col>
            <Col md={3}>{MakeModel}</Col>
            <Col md={2}>{VinYear}</Col>
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


const IncidentGrid = ({IncidentGrid})=>{

    const {
        IncidentGridHeader,
        IncidentGridData
    } = IncidentGrid;
    
    const {
        Incidents,
        Loading,
        ErrorPresent,
        ErrorText,
        setLoading,
        retrieveIncidents,
        setError,
        clearError} = useContext(IncidentGridContext);

    useEffect(()=>{
        if(Incidents === null && Loading == true){
            debugger;
            retrieveIncidents();
        }
    },[Loading, Incidents]);//useEffect is tracking Loading and Incidents to determine whether or not to rerender


    return(
        <Container>
            <Row>
                <Col md={12}>
                    <Jumbotron>
                        <h1 className="IncidentHeader">{IncidentGridHeader}</h1>
                    </Jumbotron>
                </Col>
            </Row>
            {/* <Row>
                <Col md={12}>
                    <Container className={(Loading) ? "IncidentLoading_show" : "IncidentLoading_hide"}>
                        <Spinner animation="grow" className="IncidentSpinner"></Spinner>
                    </Container>
                    <Container fluid={true} className={(!Loading) ? "IncidentLoading_show" : "IncidentLoading_hide"}>
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
                                            (Incident)=>(<IncidentGridRow key={Incident.Id} IncidentData={Incident}></IncidentGridRow>)
                                        )
                                    }
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row> */}
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