import React from "react";
import { IncidentGrid }  from "../IncidentGrid/IncidentGrid";
import {Container, Row, Col} from "react-bootstrap";

const LandingPage = ()=>{

    
    return(
        <Container>
            <Row>
                <Col lg={12}>
                    <IncidentGrid></IncidentGrid>
                </Col>
            </Row>
        </Container>
    );
}

export default LandingPage;
