import React from "react";
import {Container, Row, Col, Spinner} from "react-bootstrap";

const AppLoading = ()=>{
    return(
        <Container fluid={true}>
            <Row>
                <Col md={12}>
                    <Spinner animation="grow" />
                </Col>
            </Row>
        </Container>
    );
}

export default AppLoading;