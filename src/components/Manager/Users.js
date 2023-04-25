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
import usePagination from '../../service/usePagination ';


import classNames from 'classnames/bind'
import styles from '../../css/dashboard.module.css'


let cx = classNames.bind(styles);
const Users = () => {
    const [users, setUsers] = useState([]);
    const { currentPage, totalPages, nextPage, prevPage, goToPage, paginatedData } =
        usePagination(users, 8);


    useEffect(() => {
        getUsers();
    }, []);


    function getUsers() {
        axios.get('http://localhost/Server/api/users/users.php').then(function (response) {
            // console.log(response.data.data);
            setUsers(response.data.data);
        });
    }
    return (
        <>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Họ và tên</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Số điện thoại</th>
                        <th scope='col'>Giới tính</th>
                        <th scope='col'>Vai trò</th>
                        <th scope='col'>Tùy chỉnh</th>

                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        users.map((item, key) => {
                            return (
                                <tr>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src={require('../../images/avatar/' + item.avatar + '.png')}
                                                alt=''
                                                style={{ width: '45px', height: '45px' }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-3'>
                                                <p className='fw-bold mb-1'>{item.fullname}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{item.email}</p>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{item.phone}</p>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{item.sex == '1' ? <span>Nam</span> : <span>Nữ</span>}</p>
                                    </td>

                                    <td>
                                        {item.role == '1' ? <span>

                                            <div style={{ textAlign: 'center', padding: '7px', backgroundColor: 'white', color: 'black', borderRadius: '5px' }}>
                                                Khách hàng
                                            </div>
                                        </span> : <span>
                                            <div style={{ textAlign: 'center', padding: '7px', backgroundColor: 'red', color: 'white', borderRadius: '5px' }}>
                                                Quản lý
                                            </div></span>}

                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-info">Chỉnh sửa</button>

                                        <button style={{ marginLeft: '2vh' }} type="button" className="btn btn-info">Xóa</button>

                                    </td>
                                </tr>
                            )
                        })
                    }
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
                            <span style={{ marginLeft: '2vh' }}>tới {totalPages} </span>
                        </div>
                    </div>

                </MDBTableBody>
            </MDBTable>
        </>
    )
}

export default Users;