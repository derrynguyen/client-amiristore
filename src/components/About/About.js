import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

const About = () => {
    return (
        <div className="vh-100" style={{ backgroundColor: '#eee' }}>
            <MDBContainer>
                <MDBRow className="justify-content-center">
                    <MDBCol md="9" lg="7" xl="5" className="mt-5">
                        <MDBCard style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
                            <MDBCardBody className="p-4 text-black">
                                <div>
                                    <MDBTypography tag='h6'>Nguyễn Thanh Hải</MDBTypography>
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <p className="fw-bold mb-0">2001207201</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mb-4">
                                    <div className="flex-shrink-0">

                                    </div>

                                </div>
                                <hr />

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}
export default About;