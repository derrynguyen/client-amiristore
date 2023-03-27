import React from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import { Route, Redirect, Switch, NavLink, useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

const Profile = () => {

    const getName = Cookies.get('name');
    const getEmail = Cookies.get('email');
    const getPhone = Cookies.get('phone');
    const getaddreas = Cookies.get('addreas');
    const getSex = Cookies.get('sex');
    const getAmountOrder = Cookies.get('amount_order');
    const getRole = Cookies.get('role');
    const getPoint = Cookies.get('point');
    const getAvatar = Cookies.get('avatar');
    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">

                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src={require('../../images/avatar/' + getAvatar + '.png')}
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '140px', height: '17vh' }}
                                    fluid />
                                <p className="text-muted mb-1 mt-3">{getName}</p>
                                <p className="text-muted mb-4">{getaddreas}</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <div>{getRole == '1' ? <button type="button" class="btn btn-primary" >Khách hàng</button>
                                        : <button type="button" class="btn btn-danger">Quản lý</button>
                                    }</div>
                                </div>
                                <div className="d-flex justify-content-center mb-2">
                                    <NavLink to='/edit'>
                                        <button type="button" class="btn btn-success">Chỉnh sửa thông tin</button>
                                    </NavLink>
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4 mb-lg-0">
                            <MDBCardBody className="p-0">
                                <MDBListGroup className="rounded-3">
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fas icon="globe fa-lg text-warning" />Điểm uy tín
                                        <MDBCardText>{getPoint} điểm</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fas icon="globe fa-lg text-warning" />Số đơn đã mua
                                        <MDBCardText>{getAmountOrder} đơn</MDBCardText>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Họ và tên</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{getName}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{getEmail}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Giới tính</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{getSex == '1' ? <span>Nam</span> : <span>Nữ</span>}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Số điện thoại</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{getPhone}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Địa chỉ</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{getaddreas}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBRow>
                            <MDBCol md="6">
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Đơn hàng đang chờ</span></MDBCardText>
                                        <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Chưa có</MDBCardText>

                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>

                            <MDBCol md="6">
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Đơn hàng đã nhận</span></MDBCardText>
                                        <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Chưa có</MDBCardText>

                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
export default Profile;