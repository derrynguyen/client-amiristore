import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
import { Route, Redirect, Switch, useHistory, NavLink } from "react-router-dom";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import usePagination from '../../service/usePagination ';


import classNames from 'classnames/bind'
import styles from '../../css/dashboard.module.css'


let cx = classNames.bind(styles);
const Dashboard = () => {

    const [products, setProducts] = useState([]);

    const [users, setUsers] = useState([]);


    useEffect(() => {
        getUsers();
        getProducts();
    }, []);

    const { currentPage, totalPages, nextPage, prevPage, goToPage, paginatedData } =
        usePagination(products, 5);

    function getUsers() {
        axios.get('http://localhost/Server/api/users/users.php').then(function (response) {
            // console.log(response.data.data);
            setUsers(response.data.data);
        });
    }
    function getProducts() {
        axios.get('http://localhost/Server/api/products/read.php').then(function (response) {
            // console.log(response.data.data);
            setProducts(response.data.data);
        });
    }
    return (
        <div className={cx('main')}>
            <div className={cx('navbar')}>
                <NavLink className={cx('nav')} activeClassName={cx('active')} to='/manager/users'>Danh sách người dùng</NavLink>
                <NavLink className={cx('nav')} activeClassName={cx('active')} to='/manager/products'>Danh sách sản phẩm</NavLink>
                <NavLink className={cx('nav')} activeClassName={cx('active')} to='/manager/order'>Quản lý đơn hàng</NavLink>

            </div>
            <div className={cx('content')}>
                <Switch>
                    <Redirect exact from="/" to="/manager/users" />

                    <Route path='/manager/users'>
                        <button type="button" className="btn btn-light">Danh sách thành viên</button>


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
                                                            <p className='fw-bold mb-1'>{item.name}</p>
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

                                                        <MDBBadge color='success' pill>
                                                            Khách hàng
                                                        </MDBBadge>
                                                    </span> : <span>
                                                        <MDBBadge color='danger' pill>
                                                            Quản lý
                                                        </MDBBadge></span>}

                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-info">Chỉnh sửa</button>

                                                    <button style={{ marginLeft: '2vh' }} type="button" className="btn btn-info">Xóa</button>

                                                </td>
                                            </tr>
                                        )
                                    })
                                }


                            </MDBTableBody>
                        </MDBTable>
                    </Route>
                    <Route path='/manager/products'>
                        <button type="button" className="btn btn-light">Danh sách sản phẩm</button>
                        <button type="button" className="btn btn-success">Thêm sản phẩm</button>


                        <MDBTable align='middle'>
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>Tên sản phẩm</th>
                                    <th scope='col'>Thương hiệu</th>
                                    <th scope='col'>Số lượng</th>
                                    <th scope='col'>Giá</th>
                                    <th scope='col'>Tùy chỉnh</th>

                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    paginatedData.map((item, key) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <div className='d-flex align-items-center'>
                                                        <img
                                                            src={require('../../images/items/' + item.img + '.png')}
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
                                                    <p className='fw-normal mb-1'>{item.name_brand}</p>
                                                </td>

                                                <td>
                                                    <p className='fw-normal mb-1'>{item.amount == '' ? <span>Hết hàng</span> : <span>{item.amount}</span>}</p>
                                                </td>
                                                <td>
                                                    <p className='fw-normal mb-1'>{item.price}</p>
                                                </td>


                                                <td>
                                                    <button type="button" className="btn btn-info">Chỉnh sửa</button>

                                                    <button style={{ marginLeft: '2vh' }} type="button" className="btn btn-info">Xóa</button>

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
                                        style={{ border: '1px soild gray' }}
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
                    </Route>
                </Switch>
            </div>
        </div>
    )
}
export default Dashboard
