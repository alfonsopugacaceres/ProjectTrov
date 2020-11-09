import React, {useEffect, useContext, Fragment} from "react";
import IncidentGridContext from "./Context/IncidentGridContext";
import {Container, Row, Col, Alert} from "react-bootstrap";


const Warning = ({Id, WarningText, WarningHeading, Remove})=>{
    return(
        <Row>
            <Col md={12}>
                <Alert variant="danger" onClose={Remove} dismissible>
                <Alert.Heading>{WarningHeading}</Alert.Heading>
                    <p>
                        {WarningText}
                    </p>
                </Alert>
            </Col>
        </Row>
    );
}

const IncidentWarning = ()=>{

    const {
        Warnings,
        WarningDisplay,
        deleteWarning
    } = useContext(IncidentGridContext);


    useEffect(()=>{},[Warnings, WarningDisplay])

    return(
    <Container fluid={true}>
    {
        (WarningDisplay)
        ?
        Warnings.map(
            (warn)=>(<Warning 
                key={warn.Id} 
                Id={warn.Id} 
                WarningHeading={warn.WarningHeading}
                WarningText={warn.WarningText}
                Remove={()=>{deleteWarning(warn.Id)}}
                >
                </Warning>)
        )
        :
        <Fragment></Fragment>
    }
    </Container>    
        
    );
}

export default IncidentWarning;
