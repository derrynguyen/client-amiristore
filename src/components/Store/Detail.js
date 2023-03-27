import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
import 'mdb-ui-kit/css/mdb.min.css';
import { Route, Link, useParams, useHistory, NavLink } from "react-router-dom";
import { MDBBtn, MDBTextArea, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon, MDBRipple } from 'mdb-react-ui-kit'
import classNames from 'classnames/bind'
import styles from '../../css/detail.module.css'


let cx = classNames.bind(styles);
const Detail = ({ props }) => {


    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost/Server/api/products/detail.php?id=${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error(error));
    }, [id]);
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ backgroundColor: '#eee' }}>
            <div className="container " style={{ fontFamily: 'ThanhHai' }}>

                <div className="row" >
                    <div className="col-4" style={{ marginBottom: '1vh', marginTop: '10vh' }}>
                        <img src={require('../../images/items/' + product.img + '.png')} style={{ width: '100%' }} />
                    </div>
                    <div className="col-8" style={{ marginBottom: '1vh', marginTop: '10vh', }}>
                        <p style={{ fontSize: '20px', fontFamily: 'ThanhHai' }}>{product.name_brand}</p>
                        <h3 style={{ fontSize: '29px', fontFamily: 'monospace' }}>{product.name}</h3>
                        <p style={{ fontSize: '18px', fontFamily: 'monospace' }}>{product.price.toLocaleString('en-US')} VNĐ</p>


                        <p style={{ fontSize: '16px' }}>Tình trạnh :<span style={{ color: 'red', fontSize: '19px' }}>
                            {
                                product.amount != '' ? <span> {product.amount} cái</span> : <span>Hết hàng</span>
                            }
                        </span></p>


                        <p style={{ fontSize: '16px' }}>Dành cho: <span style={{ color: 'black', fontSize: '19px' }}>

                            {
                                product.sex == '1' ? <span>Nam</span> : <span>Nữ</span>
                            }
                        </span></p>

                        <p style={{ fontSize: '16px' }}>Màu sắc: <span style={{ color: 'black', fontSize: '19px' }}>
                            {product.color}
                        </span></p>
                        <p style={{ fontSize: '16px' }}>Nơi sản xuất: <span style={{ color: 'black', fontSize: '19px' }}>{product.addreas}</span></p>
                        <p style={{ fontSize: '16px' }}>Phiên bản: <span style={{ color: 'black', fontSize: '19px' }}>{product.session}</span></p>

                        <p style={{ fontSize: '16px' }}>
                            Đánh giá: Đang cập nhật

                        </p>

                        <button type="button" className="btn btn-primary">Thêm vào giỏ hàng</button><br />


                        <NavLink to='/store' >
                            <button style={{ marginTop: '2vh' }} type="button" class="btn btn-danger">
                                Quay lại
                            </button>
                        </NavLink>


                    </div>
                    <div style={{ marginBottom: '10vh', marginTop: '3vh', padding: '10px', }}>
                        <h3 style={{ color: 'black' }}  >Đánh giá sản phẩm: </h3>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="5"
                            />
                        </div>
                        <button style={{ marginTop: '1vh' }} type="button" class="btn btn-success">
                            Đăng
                        </button>
                    </div>




                </div>
            </div>
        </div >


    )
}
export default Detail;
