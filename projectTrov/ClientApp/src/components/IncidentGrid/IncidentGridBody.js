import React, {useContext, useEffect} from "react";
import {Container, Row, Col } from "react-bootstrap";
import IncidentGridContext from "./Context/IncidentGridContext";
import IcidentInsert from "./IncidentInsert";
import IncidentGridFilter from "./IncidentGridFilter";
import AppLoading from "../AppLoading/AppLoading";
import "./IncidentGrid.css"


const IncidentGridHeader = ()=>{
    return(
        <Row>
            <Col md={12}>
                <label className="IncidentGridRowVin IncidentGridRowSpacing">Vin</label>
                <label className="IncidentGridRowDt IncidentGridRowSpacing">Date</label>
                <label className="IncidentGridRowMake IncidentGridRowSpacing">Make</label>
                <label className="IncidentGridRowModel IncidentGridRowSpacing">Model</label>
                <label className="IncidentGridRowYear IncidentGridRowSpacing">Year</label>
                <label className="IncidentGridRowNote IncidentGridRowSpacing">Note</label>
            </Col>
        </Row>
    );
}

const IncidentGridRow = ({ IncidentData }) =>{

    const {
        vin,
        incidentDate,
        note
    } = IncidentData;

    const {
        vinNumber,
        make,
        model,
        vinYear
    } = vin;

    return(
        <Row className="IncidentGridRow">
            <Col md={12}>
                <label className="IncidentGridRowVin IncidentGridRowSpacing">{vinNumber}</label>
                <label className="IncidentGridRowDt IncidentGridRowSpacing">{incidentDate}</label>
                <label className="IncidentGridRowMake IncidentGridRowSpacing">{make}</label>
                <label className="IncidentGridRowModel IncidentGridRowSpacing">{model}</label>
                <label className="IncidentGridRowYear IncidentGridRowSpacing">{vinYear}</label>
                <label className="IncidentGridRowNote IncidentGridRowSpacing">{note}</label>
            </Col>
        </Row>
    );
}

const IncidentGridBody =()=>{

    const {
        Loading,
        FilteredIncidents,
        FilteringPresent,
        Incidents
    } = useContext(IncidentGridContext);

    //force rerender if FilteringPresent changes value
    useEffect(()=>{}
    ,[FilteringPresent, Loading])

    return(
        <Container fluid={true}>
            <Row>
                <Col md={12}>
                    <Container fluid={true} className="IncidentLoading_show">
                        <Row>
                            <Col md={12}>
                                <IncidentGridFilter></IncidentGridFilter>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <IcidentInsert></IcidentInsert>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Container fluid={true}>
                                    <IncidentGridHeader></IncidentGridHeader>
                                    {
                                        (Loading)
                                        ?
                                        <AppLoading />
                                        :
                                            (FilteringPresent)
                                            ?
                                            FilteredIncidents.map(
                                                (Incident)=>(<IncidentGridRow key={Incident.id} IncidentData={Incident}></IncidentGridRow>)
                                            )
                                            :
                                            Incidents.map(
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

export default IncidentGridBody;