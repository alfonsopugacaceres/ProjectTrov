import React, {useState, useContext, Fragment} from "react";
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import IncidentGridContext from "./Context/IncidentGridContext";
import DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const IncidentInsert = ()=>{
    
    const {
        NewIncident,
        insertIncident,
        setNIncNote,
        setNIncVin,
        setNIncDate
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

    const [displayWrapper, setDisplay] = useState(false);

    return(
        <Fragment>
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
                            <Button variant="light" type="button" onClick={()=>{insertIncident();}}>Insert</Button>
                        </Form.Group>
                        <Form.Group as={Col} controlId="CancelIncidentInsert">
                            <Button variant="light" type="button" onClick={()=>{setDisplay(!displayWrapper)}}>Cancel</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Container>
        </Fragment>
    );
}


export default IncidentInsert;