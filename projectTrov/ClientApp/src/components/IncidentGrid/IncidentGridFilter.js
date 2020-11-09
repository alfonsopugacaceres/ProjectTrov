import React, {useContext, useEffect, Fragment} from "react";
import {Container, Row, Col, FormControl, Button, Form} from "react-bootstrap";
import IncidentGridContext from "./Context/IncidentGridContext";
import DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const IncidentGridFilter = ()=>{

    
    const {
        FilterVin,
        FilterStartDate,
        FilterEndDate,
        FilteringPresent,
        FilterDisplay,
        setFilterStartDt,
        setFilterEndDt,
        setFilterVin,
        filterIncidents,
        clearFilters,
        setFilterDisplay
    } = useContext(IncidentGridContext);

    useEffect(()=>{},[FilteringPresent, FilterDisplay])
    
    return(
        <Fragment>
            <Container fluid={true} className={(FilterDisplay) ? "IncidentFilterWrapper_hide IncidentComponentSpacing" : "IncidentFilterWrapper_show IncidentComponentSpacing"}>
                <Row>
                    <Col md={12}>
                        <Container fluid={true}>
                            <Button variant="secondary" type="button" onClick={()=>{setFilterDisplay(true);}}>Filter Grid</Button>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Container fluid={true} className={(FilterDisplay) ? "IncidentFilterWrapper_show IncidentComponentSpacing" : "IncidentFilterWrapper_hide IncidentComponentSpacing"}>
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
                                        <Button variant="secondary" type="button" onClick={()=>{filterIncidents();}}>Search</Button>
                                    </Form.Group>
                                    <Form.Group as={Col} md={1} controlId="ClearIncidentFilter">
                                        <Button variant="secondary" type="button" onClick={()=>{clearFilters();}}>Clear</Button>
                                    </Form.Group>
                                </Form.Group>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default IncidentGridFilter;