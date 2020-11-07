import React, {useState} from "react";
import {Container, Row, Col, Form, Button} from "react-bootstrap";


const IncidentInsert = ()=>{
    
    const [displayWrapper, setDisplay] = useState(false);

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


export default IncidentInsert;