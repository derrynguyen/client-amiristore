import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
import { Route, Redirect, Switch, useHistory, NavLink } from "react-router-dom";
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
import styles from '../../../css/dashboard.module.css'

let cx = classNames.bind(styles);
const Cart = () => {
    const history = useHistory()

    const [payment, setPayment] = useState([]);

    function getPayment() {
        axios.get(`http://14.225.205.66/Server/api/cart/read_payment_admin.php`).then(function (response) {
            setPayment(response.data.data);
        });
    }

    useEffect(() => {
        getPayment();
    }, []);

    const { currentPage, totalPages, nextPage, prevPage, goToPage, paginatedData } =
        usePagination(payment, 6);

    return (
        <div >
            <MDBTable >
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Tên sản phẩm</th>
                        <th scope='col'>Người mua</th>
                        <th scope='col'>Màu</th>
                        <th scope='col'>Size</th>
                        <th scope='col'>Số lượng</th>
                        <th scope='col'>Tổng giá</th>
                        <th scope='col'>Trạng thái</th>
                        <th scope='col'>Tùy chọn</th>

                    </tr>
                </MDBTableHead>
                <MDBTableBody >
                    {paginatedData == null ? <span >Hiện tại chưa có đơn hàng nào</span> :
                        paginatedData.map((item, key) => {
                            return (

                                <tr>

                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src={require('../../../images/items/' + item.img)}
                                                alt=''
                                                style={{ width: '45px', height: '45px' }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-3'>
                                                <p className='fw-bold mb-1'>{item.name}</p>

                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <p className='fw-normal mb-1'>{item.fullname}</p>
                                    </td>

                                    <td>
                                        <p className='fw-normal mb-1'>{item.color}</p>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{item.size}</p>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{item.amount} cái</p>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{item.total.toLocaleString('en-US')} VNĐ</p>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{item.status == '1' ? <span>Đang chuẩn bị hàng</span>
                                            : item.status == '2' ? <span>Đang giao</span> : <span>Đã giao thành công</span>
                                        }</p>
                                    </td>
                                    <td >
                                        <NavLink to={`/manager/products/Editcart/${item.id}`}>
                                            <p style={{ marginLeft: '2vh' }} >Xác minh đơn hàng</p>

                                        </NavLink>

                                    </td>

                                </tr>
                            )
                        })
                    }

                </MDBTableBody>
                <div className={cx('pagination')}>
                    <button onClick={prevPage} disabled={currentPage === 1}>
                        Quay lại
                    </button>

                    <button onClick={nextPage} disabled={currentPage === totalPages}>
                        Tiếp tục
                    </button>

                    <div>
                        <input
                            style={{ border: 'none', outline: 'none' }}
                            type="number"
                            value={currentPage}
                            onChange={(e) => goToPage(e.target.value)}
                            min="1"
                            max={totalPages}
                        />
                        <span style={{ marginLeft: '-2vh' }}>tới {totalPages} </span>
                    </div>
                </div>

            </MDBTable>
        </div>
    )
}
export default Cart
