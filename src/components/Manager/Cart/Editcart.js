import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
import { Route, Redirect, Switch, useHistory, useParams, NavLink } from "react-router-dom";
import {
    MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter, MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBIcon,
    MDBFile
} from 'mdb-react-ui-kit';
import usePagination from '../../../service/usePagination ';


import classNames from 'classnames/bind'
import styles from '../../../css/editcart.module.css'

let cx = classNames.bind(styles);
const Editcart = () => {
    const history = useHistory()
    const { id } = useParams();
    const [payment, setPayment] = useState([])
    const [status, SetStatus] = useState(0);

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

    const handleOptionChange = (event) => {
        SetStatus(event.target.value);
    };

    useEffect(() => {
        axios.get(`http://localhost/Server/api/cart/detail_cart.php?id=${id}`)
            .then(response => setPayment(response.data))
            .catch(error => console.error(error));
        console.log(id);
    }, [id]);

    return (
        <div className={cx('main')}>
            <div className={cx('title')}>
                <h3>Chỉnh sửa đơn hàng</h3>
            </div>
            <div className='container'>
                <div className={cx('payment')}>
                    <div className={cx('box')}>
                        <p>Mã đơn:<span> {payment.id}</span></p>

                        <p>Người mua :<span> {payment.fullname}</span></p>
                    </div>
                    <div className={cx('box')}>
                        <p>Tên mặt hàng : <span>{payment.name}</span></p>
                    </div>
                    <div className={cx('box')}>
                        <p>Size : <span>{payment.size}</span></p>
                        <p>Số lượng : <span>{payment.amount}</span></p>

                    </div>


                    <div className={cx('box')}>
                        <p>Trạng thái</p>
                        <label>
                            <select value={SetStatus} onChange={handleOptionChange}>
                                <option value="1">Đang chuẩn bị hàng</option>
                                <option value="2">Đang giao</option>
                                <option value="3">Đã giao thành công</option>
                            </select>
                        </label>
                        <p className='mt-3'>Trạng thái: {payment.status == '1' ? <span>Đang chuẩn bị hàng</span>
                            : payment.status == '2' ? <span>Đang giao</span> : <span>Đã giao thành công</span>
                        }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Editcart;