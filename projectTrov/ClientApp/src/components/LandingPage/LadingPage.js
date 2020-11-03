import React from "react";
import {Container, Row, Col} from "react-bootstrap";

const LandingPage = ()=>{


    return(
        <Container>
            <Row>
                <Col lg={12}>
                    <h1>This is the landing page</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <h1>Check Vin</h1>
                </Col>
                <Col lg={6}>
                    <input></input>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <h1>This is the landing page</h1>
                </Col>
                <Col lg={6}>
                    <input></input>
                </Col>
            </Row>

        </Container>
    );


}

export default LandingPage;
