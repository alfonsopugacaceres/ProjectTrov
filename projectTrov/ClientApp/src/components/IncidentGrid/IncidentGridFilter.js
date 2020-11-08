import React, {useState,useContext, useEffect} from "react";
import {Container, Row, Col, InputGroup, FormControl, Button, Form} from "react-bootstrap";
import IncidentGridContext from "./Context/IncidentGridContext";
import DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const IncidentGridFilter = ()=>{

    
    const {
        FilterVin,
        FilterStartDate,
        FilterEndDate,
        FilteringPresent,
        setFilterStartDt,
        setFilterEndDt,
        setFilterVin,
        filterIncidents,
        clearFilters
    } = useContext(IncidentGridContext);

    useEffect(()=>{},[FilteringPresent])
    
    return(
        <Container fluid={true}>
            <Row>
                <Col md={12}>
                    <Container>
                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label column md={3}>
                                    Vin Number
                                </Form.Label>
                                <Form.Label column md={2}>
                                    Start Date
                                </Form.Label>
                                <Form.Label column  md={2}>
                                    End Date
                                </Form.Label>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col md={3}>
                                    <FormControl 
                                        onChange={event => {setFilterVin(event.target.value);}}
                                        value={FilterVin}
                                        placeholder="Enter Vin Number"
                                        aria-describedby="basic-addon2"
                                    />
                                </Col>
                                <Col md={2}>
                                    <DatePicker className="IncidentGridFilterDate" selected={FilterStartDate} onChange={date => {setFilterStartDt(date);}}></DatePicker>
                                </Col>
                                <Col md={2}>
                                    <DatePicker className="IncidentGridFilterDate" selected={FilterEndDate} onChange={date => {setFilterEndDt(date);}}></DatePicker>
                                </Col>
                                <Form.Group as={Col} md={1} controlId="SearchIncidentFilter">
                                    <Button variant="light" type="button" onClick={()=>{filterIncidents();}}>Search</Button>
                                </Form.Group>
                                <Form.Group as={Col} md={1} controlId="ClearIncidentFilter">
                                    <Button variant="light" type="button" onClick={()=>{clearFilters();}}>Clear</Button>
                                </Form.Group>
                            </Form.Group>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default IncidentGridFilter;