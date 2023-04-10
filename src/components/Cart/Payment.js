import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
import { Route, Redirect, Switch, useHistory, NavLink } from "react-router-dom";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBListGroup, MDBListGroupItem, MDBRipple, MDBRow, MDBTooltip, MDBTypography, } from "mdb-react-ui-kit";
import classNames from 'classnames/bind'
import Cookies from 'js-cookie';


import styles from '../../css/paymnet.module.css'


let cx = classNames.bind(styles);

const Paymnet = () => {



    const history = useHistory();

    const getIDUser = Cookies.get('id');



    useEffect(() => {



    },);

    function getOrder() {
        axios.get(`http://localhost/Server/api/cart/order.php?getIDUser=${getIDUser}`).then(function (response) {

        });
    }





    const Toast = Swal.mixin({
        toast: true,
        position: 'center-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });


    return (
        <section style={{ backgroundColor: '#eee', width: '100%', height: '80vh' }}>
            <div className={cx('main')}>
                <div className={cx('navbar')}>
                    <NavLink className={cx('nav')} activeClassName={cx('active')} to='/payment/donhangchuaduyet'>Đơn hàng đang giao</NavLink>
                    <NavLink className={cx('nav')} activeClassName={cx('active')} to='/payment/products'>Đơn hàng chưa duyệt</NavLink>
                    <NavLink className={cx('nav')} activeClassName={cx('active')} to='/payment/order'>Đơn hàng đã giao</NavLink>

                </div>
            </div>
            <div className={cx('content')}>
                <p>Đơn hàng của bạn</p>

            </div>


        </section >
    );
}
export default Paymnet;