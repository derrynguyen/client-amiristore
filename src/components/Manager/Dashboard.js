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
const Dashboard = () => {
    const history = useHistory()

    const [products, setProducts] = useState([]);

    const [users, setUsers] = useState([]);
    const [basicModal, setBasicModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModel, setEditModel] = useState(false);

    ////Them
    const [id, setId] = useState([]);
    const [name, setName] = useState([]);
    const [price, setPrice] = useState([]);
    const [name_brand, setName_brand] = useState([]);
    const [color, setColor] = useState([]);
    const [sex, setSex] = useState([]);
    const [addreas, setAddreas] = useState([]);
    const [session, setSession] = useState([]);
    const [amount, setAmount] = useState([]);
    const [img, setImg] = useState([]);
    const [type, setType] = useState([]);


    ///////////Sử lý thêm
    const handleName = (event) => {
        setName(event.target.value);
    }
    const handlePrice = (event) => {
        setPrice(event.target.value);
    }
    const handleNamebrand = (event) => {
        setName_brand(event.target.value);
    }
    const handleColor = (event) => {
        setColor(event.target.value);
    }
    const handleNAddreas = (event) => {
        setAddreas(event.target.value);
    }
    const handleSession = (event) => {
        setSession(event.target.value);
    }
    const handleAmount = (event) => {
        setAmount(event.target.value);
    }

    const handleType = (event) => {
        setType(event.target.value);
    }
    const handleSex = (event) => {
        setSex(event.target.value);
    }
    const img2 = '';
    const img3 = '';
    const rate = '0';

    const reloadPro = () => {
        getProducts();
        Toast.fire({ icon: 'success', title: `Cập nhật lại danh sách sản phẩm thành công` });

    }

    const AddNewProducts = async () => {
        const formData = new FormData();
        formData.append('name_brand', name_brand);
        formData.append('name', name);
        formData.append('img', img);
        formData.append('img2', img2);
        formData.append('img3', img3);
        formData.append('price', price);
        formData.append('sex', sex);
        formData.append('type', type);
        formData.append('color', color);
        formData.append('addreas', addreas);
        formData.append('session', session);
        formData.append('amount', amount);
        formData.append('rate', rate);
        try {
            const response = await axios.post('http://localhost/Server/api/products/create.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            if (response.data.success) {
                Toast.fire({ icon: 'success', title: `${response.data.success}` });
                getProducts();
                toggleShow(false);
                history.push('/manager/products')

            }
            else {
                Toast.fire({ icon: 'error', title: `${response.data.error}` });
            }

        } catch (error) {
            console.error(error);
        }

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


    const DeleteProducts = (id) => {
        axios.delete(`http://localhost/Server/api/products/delete.php?id=${id}`)
            .then(response => {
                Toast.fire({ icon: 'success', title: `${response.data.success}` });
                setDeleteModal(false);
                getProducts();
                history.push('/manager/products');
            })
            .catch(error => console.error(error));
    }
    const EditProducts = (id) => {
        const formData = new FormData();
        formData.append('name_brand', name_brand);
        formData.append('name', name);
        formData.append('img', img);
        formData.append('img2', img2);
        formData.append('img3', img3);
        formData.append('price', price);
        formData.append('sex', sex);
        formData.append('type', type);
        formData.append('color', color);
        formData.append('addreas', addreas);
        formData.append('session', session);
        formData.append('amount', amount);
        formData.append('rate', rate);

        axios.post(`http://localhost/Server/api/products/edit.php?id=${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log(response);
                Toast.fire({ icon: 'success', title: `${response.data.success}` });
                setEditModel(false)
                getProducts();

            })
            .catch(error => console.error(error));
    }

    const toggleShow = () => setBasicModal(!basicModal);
    const toggleShowDelete = () => setDeleteModal(!deleteModal);
    const toggleShowEdit = () => setEditModel(!editModel);


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
                        <button type="button" className="btn btn-info" style={{ marginLeft: '2vh' }} onClick={reloadPro}>Cập nhật sản phẩm</button>

                        <button type="button" className="btn btn-success" style={{ marginLeft: '2vh' }} onClick={toggleShow}>Thêm sản phẩm</button>
                        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                            <MDBModalDialog>
                                <MDBModalContent>
                                    <MDBModalHeader>
                                        <MDBModalTitle>Thêm sản phẩm mới</MDBModalTitle>
                                        <button type="button" className='btn-close' color='none' onClick={toggleShow}></button>
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <form >

                                            <MDBInput className='mb-2 mt-2' type='text' onChange={handleName} name="name" label='Tên sản phẩm' />

                                            <MDBRow className='mb-4'>

                                                <MDBCol>
                                                    <MDBInput onChange={handlePrice} type="number" name="price" label='Giá' />
                                                </MDBCol>
                                                <MDBCol>
                                                    <MDBInput onChange={handleNamebrand} name="name_brand" label='Tên thương hiệu' />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className='mb-4'>

                                                <MDBCol>
                                                    <MDBInput onChange={handleColor} name="color" label='Màu sắc' />
                                                </MDBCol>
                                                <MDBCol>
                                                    <MDBInput onChange={handleNAddreas} name="addreas" label='Nơi sản xuất' />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className='mb-4'>

                                                <MDBCol>
                                                    <MDBInput onChange={handleSession} name="session" label='Phiên bản' />
                                                </MDBCol>
                                                <MDBCol>
                                                    <MDBInput onChange={handleAmount} type="number" name="amount" label='Số lượng' />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow className='mb-4'>

                                                <MDBCol>
                                                    <select className="browser-default custom-select" onChange={handleType}>
                                                        <option selected>Lựa chọn loại quần áo</option>
                                                        <option value="1">Áo thun</option>
                                                        <option value="2">Áo sơ mi</option>
                                                        <option value="3">Áo len</option>
                                                        <option value="4">Áo khoác</option>
                                                        <option value="5">Quần</option>
                                                        <option value="6">Túi / ví</option>
                                                        <option value="7">Phụ kiện</option>

                                                    </select>
                                                </MDBCol>
                                                <MDBCol>
                                                    <select className="browser-default custom-select" onChange={handleSex}>
                                                        <option selected>Giới tính</option>
                                                        <option value="1">Nam</option>
                                                        <option value="2">Nữ</option>


                                                    </select>
                                                </MDBCol>
                                            </MDBRow>
                                            <div>
                                                <input type="file" name="img" label='Hình ảnh'
                                                    onChange={(event) => setImg(event.target.files[0])}
                                                />
                                            </div>
                                            <button onClick={AddNewProducts} type="button" className="btn btn-danger mt-4">Thêm sản phẩm</button>
                                        </form>

                                    </MDBModalBody>
                                    <MDBModalFooter>
                                        <button type="button" className="btn btn-light" onClick={toggleShow}>Đóng</button>

                                    </MDBModalFooter>
                                </MDBModalContent>
                            </MDBModalDialog>
                        </MDBModal>

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
                                                            src={require('../../images/items/' + item.img)}
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
                                                    <button type="button" className="btn btn-success" style={{ marginLeft: '2vh' }} onClick={toggleShowEdit}>Chỉnh sửa</button>
                                                    <MDBModal show={editModel} setShow={setEditModel} tabIndex='-1'>
                                                        <MDBModalDialog>
                                                            <MDBModalContent>
                                                                <MDBModalHeader>
                                                                    <MDBModalTitle>Chỉnh sửa sản phẩm  {item.id}</MDBModalTitle>
                                                                    <button type="button" className='btn-close' color='none' onClick={toggleShowEdit}></button>
                                                                </MDBModalHeader>
                                                                <MDBModalBody>
                                                                    <form >

                                                                        <MDBInput className='mb-2 mt-2' type='text' onChange={handleName} name="name" label='Tên sản phẩm' />

                                                                        <MDBRow className='mb-4'>

                                                                            <MDBCol>
                                                                                <MDBInput onChange={handlePrice} type="number" name="price" label='Giá' />
                                                                            </MDBCol>
                                                                            <MDBCol>
                                                                                <MDBInput onChange={handleNamebrand} name="name_brand" label='Tên thương hiệu' />
                                                                            </MDBCol>
                                                                        </MDBRow>
                                                                        <MDBRow className='mb-4'>

                                                                            <MDBCol>

                                                                                <MDBInput onChange={handleColor} name="color" label='Màu sắc' />
                                                                            </MDBCol>
                                                                            <MDBCol>
                                                                                <MDBInput onChange={handleNAddreas} name="addreas" label='Nơi sản xuất' />
                                                                            </MDBCol>
                                                                        </MDBRow>
                                                                        <MDBRow className='mb-4'>

                                                                            <MDBCol>
                                                                                <MDBInput onChange={handleSession} name="session" label='Phiên bản' />
                                                                            </MDBCol>
                                                                            <MDBCol>
                                                                                <MDBInput onChange={handleAmount} type="number" name="amount" label='Số lượng' />
                                                                            </MDBCol>
                                                                        </MDBRow>
                                                                        <MDBRow className='mb-4'>

                                                                            <MDBCol>
                                                                                <select className="browser-default custom-select" onChange={handleType}>
                                                                                    <option selected >Lựa chọn loại quần áo</option>
                                                                                    <option value="1">Áo thun</option>
                                                                                    <option value="2">Áo sơ mi</option>
                                                                                    <option value="3">Áo len</option>
                                                                                    <option value="4">Áo khoác</option>
                                                                                    <option value="5">Quần</option>
                                                                                    <option value="6">Túi / ví</option>
                                                                                    <option value="7">Phụ kiện</option>

                                                                                </select>
                                                                            </MDBCol>
                                                                            <MDBCol>
                                                                                <select className="browser-default custom-select" onChange={handleSex}>
                                                                                    <option selected >Giới tính</option>
                                                                                    <option value="1">Nam</option>
                                                                                    <option value="2">Nữ</option>


                                                                                </select>
                                                                            </MDBCol>
                                                                        </MDBRow>
                                                                        <div>
                                                                            <input type="file" name="img" label='Hình ảnh'
                                                                                onChange={(event) => setImg(event.target.files[0])}
                                                                            />
                                                                        </div>
                                                                        <button onClick={(id) => EditProducts(item.id)} type="button" className="btn btn-danger mt-4">Chỉnh sửa sản phẩm</button>
                                                                    </form>

                                                                </MDBModalBody>
                                                                <MDBModalFooter>
                                                                    <button type="button" className="btn btn-light" onClick={toggleShowEdit}>Đóng</button>

                                                                </MDBModalFooter>
                                                            </MDBModalContent>
                                                        </MDBModalDialog>
                                                    </MDBModal>




                                                    <button className="btn btn-info" style={{ marginLeft: '2vh' }} onClick={toggleShowDelete}>Xóa</button>
                                                    <MDBModal show={deleteModal} setShow={setDeleteModal} tabIndex='-1'>
                                                        <MDBModalDialog >
                                                            <MDBModalContent>
                                                                <MDBModalHeader>
                                                                    <MDBModalTitle>Xóa sản phẩm</MDBModalTitle>
                                                                    <button className='btn-close' color='none' onClick={toggleShowDelete}></button>
                                                                </MDBModalHeader>
                                                                <MDBModalBody>
                                                                    Bạn có chắn chắn muốn xóa sản phẩm : {item.name}
                                                                </MDBModalBody>

                                                                <MDBModalFooter>

                                                                    <button className="btn btn-light" onClick={(id) => DeleteProducts(item.id)}>Xóa</button>
                                                                </MDBModalFooter>
                                                            </MDBModalContent>
                                                        </MDBModalDialog>
                                                    </MDBModal>

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
                    </Route>
                </Switch>
            </div>
        </div>
    )
}
export default Dashboard
