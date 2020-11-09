import React, {useEffect, useContext, Fragment} from "react";
import {Container, Col, Form, Button} from "react-bootstrap";
import IncidentGridContext from "./Context/IncidentGridContext";
import DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const IncidentInsert = ()=>{
    
    const {
        NewIncident,
        InsertDisplay,
        insertIncident,
        setNIncNote,
        setNIncVin,
        setNIncDate,
        setInsertDisplay
    } = useContext(IncidentGridContext);

    const{
        VinNumber,
        IncidentDate,
        Note
    } = NewIncident;

    const updateDate = (date)=>{
        setNIncDate(date);
    }
    const updateNote = (value)=>{
        setNIncNote(value);
    }
    const updateVin = (value)=>{
        setNIncVin(value);
    }

    useEffect(()=>{},
    [InsertDisplay])

    return(
        <Fragment>
            <Container fluid={true} className={(InsertDisplay) ? "IncidentAddWrapper_hide" : "IncidentAddWrapper_show"}>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="ActivateInsertControl">
                            <Button variant="secondary" type="button" onClick={()=>{setInsertDisplay(true)}}>Add Incident</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Container>
            <Container fluid={true} className={(InsertDisplay) ? "IncidentAddWrapper_show" : "IncidentAddWrapper_hide"}>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="IncidentVin">
                            <Form.Label>Vin #</Form.Label>
                            <Form.Control type="text"  value={VinNumber} onChange={event=>{updateVin(event.target.value);}} placeholder="Enter Vin" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="IncidentDate">
                            <Form.Label>Incident Date</Form.Label>
                            <DatePicker className="IncidentGridFilterDate" wrapperClassName={"form-control"} selected={IncidentDate} onChange={date=>{updateDate(date);}} ></DatePicker>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="IncidentNote">
                            <Form.Label>Incident Note</Form.Label>
                            <Form.Control as="textarea" value={Note} onChange={event=>{updateNote(event.target.value);}} rows={3} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="AcceptIncidentInsert">
                            <Button variant="secondary" type="button" onClick={()=>{insertIncident();}}>Insert</Button>
                        </Form.Group>
                        <Form.Group as={Col} controlId="CancelIncidentInsert">
                            <Button variant="secondary" type="button" onClick={()=>{setInsertDisplay(false)}}>Cancel</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Container>
        </Fragment>
    );
}


export default IncidentInsert;