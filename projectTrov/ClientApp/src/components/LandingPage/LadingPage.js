import React, {useState, useEffect}from "react";
import { IncidentGrid }  from "../IncidentGrid/IncidentGrid";
import {Container, Row, Col} from "react-bootstrap";

const LandingPage = ()=>{

    const data = {
        IncidentGridHeader: "Incident Header",
        IncidentGridData: [
            {
                Id: 1,
                Vin: "123456789",
                IncidentDate: "12/21/1990",
                MakeModel: "2019",
                VinYear: "1999"
            },
            {
                Id: 2,
                Vin: "2345678901",
                IncidentDate: "12/21/1995",
                MakeModel: "2013",
                VinYear: "2000"
            },
        ]
    }

    const [loading, setLoading] = useState(true);
    const [gridData, setGridData] = useState(null);


    useEffect(()=>{
        

    },[])
    
    return(
        <Container>
            <Row>
                <Col lg={12}>
                    <IncidentGrid IncidentGrid={data}></IncidentGrid>
                </Col>
            </Row>
        </Container>
    );


}

export default LandingPage;
