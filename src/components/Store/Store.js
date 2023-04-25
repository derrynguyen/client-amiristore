import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
import 'mdb-ui-kit/css/mdb.min.css';
import { Route, Link, Switch, useHistory, NavLink } from "react-router-dom";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon, MDBRippl } from 'mdb-react-ui-kit'
import classNames from 'classnames/bind'
import styles from '../../css/store.module.css'
import Detail from './Detail';
import usePagination from '../../service/usePagination ';


let cx = classNames.bind(styles);
const Store = () => {

    const [filter, setFilter] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");


    useEffect(() => {
        getProducts();
        // const timer = setTimeout(() => {
        //     setLoading(false);
        // }, 6000);
        // return () => {
        //     clearTimeout(timer);
        // };
    }, []);
    ////Hàm phân trang
    const { currentPage, totalPages, nextPage, prevPage, goToPage, paginatedData } =
        usePagination(products, 6);

    ///Hàm lọc theo Dropdown
    const handleDropdownSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(event.target.value);
        setSelectedOption(selectedValue === "" ? "" : selectedValue);


    };
    // const handleSort = (selectedValue) => {
    //     let sortedList = [...paginatedData]; // list là danh sách cần sắp xếp
    //     // cập nhật danh sách đã sắp xếp
    // };

    const options = [
        { id: 1, value: "Thom Brown" },
        { id: 2, value: "Amiri" },
        { id: 3, value: "Off White" },
        { id: 4, value: "Saint Laurent" },
        { id: 6, value: "Dsquared2" },
        { id: 7, value: "Tất cả thương hiệu" },

    ];

    const optionsprice = [
        { value: "Giá từ cao đến thấp", label: "" },
        { value: "Giá từ thấp đến cao", label: "" }
    ];

    const optionstype = [
        { id: 1, value: "Áo sơ mi" },
        { id: 2, value: "Áo thun" },
        { id: 3, value: "Áo len" },

    ];


    const filteredProducts = paginatedData.filter((product) =>
        (selectedOption === "Tất cả thương hiệu" || product.name_brand === selectedOption || selectedOption === "") &&
        (product.name.toLowerCase().includes(filter.toLowerCase()))

    );

    function getProducts() {
        axios.get('https://14.225.205.66/api/products/read.php').then(function (response) {
            // console.log(response.data.data);
            setProducts(response.data.data);
        });
    }
    return (
        <div style={{ backgroundColor: '#eee', height: '110vh' }} >
            <div className="container text-center" >
                <div className="row" >
                    <div className="col-sm-4" style={{ marginTop: '5vh', fontFamily: 'ThanhHai' }}>

                        <h3>Cửa hàng</h3>
                        <hr />
                        <p>Thương hiệu</p>
                        <select value={selectedOption} onChange={handleDropdownSelect} className={cx('selected')}>
                            {options.map((option) => (
                                <option key={option.id} >
                                    {option.value}
                                </option>
                            ))}
                        </select>

                        <p style={{ marginTop: '3vh' }} value={selectedPrice} onChange={handleDropdownSelect}>Giá tiền</p>
                        <select className={cx('selected')}>
                            {optionsprice.map((option) => (
                                <option key={option.id} >
                                    {option.value}
                                </option>
                            ))}
                        </select>

                        <p style={{ marginTop: '3vh' }} value={selectedPrice} onChange={handleDropdownSelect}>Loại quần áo</p>
                        <select className={cx('selected')}>
                            {optionstype.map((option) => (
                                <option key={option.id} >
                                    {option.value}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-sm-8">
                        <div className={cx('search')}>
                            <input type='text' placeholder='Tìm kiếm sản phẩm....'
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            ></input>

                            <button><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                        <div className="row row-cols-3" style={{ marginTop: '5vh' }}>
                            {
                                filteredProducts.map((item, key) => {
                                    return (
                                        <NavLink to={`/detail/${item.id}`}>
                                            <div className={cx('card')} >
                                                <div className={cx('img')}>
                                                    <img src={require('../../images/items/' + item.img)} />
                                                </div>
                                                <div className={cx('brand')}>
                                                    <p>{item.name_brand}</p>
                                                </div>
                                                <div className={cx('title')}>
                                                    <p>{item.name}</p>
                                                </div>
                                                <div className={cx('price')}>
                                                    <p>{item.price.toLocaleString('en-US')} vnđ</p>
                                                </div>
                                            </div>

                                        </NavLink>

                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className={cx('pagination')}>
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            Quay lại
                        </button>

                        <button onClick={nextPage} disabled={currentPage === totalPages}>
                            Tiếp tục
                        </button>

                        <div>
                            <input
                                type="number"
                                value={currentPage}
                                onChange={(e) => goToPage(e.target.value)}
                                min="1"
                                max={totalPages}
                            />
                            <span style={{ marginLeft: '1vh' }}>tới {totalPages} </span>
                        </div>
                    </div>
                </div>
            </div>



        </div>


    )
}
export default Store;