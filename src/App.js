import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as mdb from 'mdb-ui-kit'; // lib
import 'mdb-ui-kit/css/mdb.min.css';
import { Route, Redirect, Switch, NavLink, useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

import ac from './images/active.png'
import classNames from 'classnames/bind'
import styles from './css/main.module.css'
import Home from './components/Home/Home';
import Resigter from './components/Auth/Resigter';
import Login from './components/Auth/Login';
import Cart from './components/Cart/Cart';
import Store from './components/Store/Store';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import Detail from './components/Store/Detail';
import Dashboard from './components/Manager/Dashboard';
import Error from './components/Error/Error';

let cx = classNames.bind(styles);

const App = () => {
  const history = useHistory();


  const [isLogin, setIsLogin] = useState(false);
  const getName = Cookies.get('name');
  const getRole = Cookies.get('role');


  useEffect(() => {
    const getIDUser = Cookies.get('id');

    if (getIDUser != null) {
      setIsLogin(true);
    }
    else {
      setIsLogin(false);
    }
  }, []);

  const handleLogout = () => {

    const removeIDUser = Cookies.remove('id');
    const removeRole = Cookies.remove('role');
    const removeName = Cookies.remove('name');
    const removeEmail = Cookies.remove('email');
    const removeAddreas = Cookies.remove('addreas');
    const removePhone = Cookies.remove('phone');

    if (removeIDUser == null) {
      setIsLogin(false)
      history.push('/login')
      window.location.reload();
    }

  }
  return (
    <React.Fragment>
      <div className={cx('main')}>
        <div className={cx('container')}>

          {/* Header */}

          <div className={cx('header')}>
            <div className={cx('language')}>

            </div>

            <div className={cx('logo')}>
              <p>AMIRI STORE</p>
            </div>

          </div>

          {/* navbar */}

          <div className={cx('navbar')}>
            <div className={cx('nav')}>
              <NavLink to='/home' className={cx('navlink')} activeClassName={cx('active')}>
                <span>Trang chủ</span>
              </NavLink>
              <NavLink to='/store' className={cx('navlink')} activeClassName={cx('active')}>
                <span>Cửa hàng</span>
              </NavLink>
              <NavLink to='/about' className={cx('navlink')} activeClassName={cx('active')}>
                <span>Về chúng tôi</span>
              </NavLink>
              <NavLink to='/talk' className={cx('navlink')} activeClassName={cx('active')}>
                <span>Thảo luận</span>
              </NavLink>
              {
                getRole == '2' ?
                  <NavLink to='/manager' className={cx('navlink')} activeClassName={cx('active')}>
                    <span>Quản lý cửa hàng</span>
                  </NavLink> :
                  <></>
              }
            </div>
            <div className={cx('auth')}>
              {isLogin ? (
                <div className={cx('navbarmenu')}>

                  <NavLink to='/profile' className={cx('navlink')} activeClassName={cx('active')}>
                    <span>{getName}</span>
                  </NavLink>
                  <span className={cx('btn-logout')} onClick={handleLogout}>Đăng xuất</span>

                </div>
              ) : (
                <>
                  <NavLink to='/login' className={cx('navlink')} activeClassName={cx('active')}>
                    <span>Đăng nhập</span>
                  </NavLink>
                  <NavLink to='/register' className={cx('navlink')} activeClassName={cx('active')}>
                    <span>Đăng ký</span>
                  </NavLink>
                </>
              )}

              <NavLink to='/cart' className={cx('navlink')} activeClassName={cx('active')}>


                <i className="fa-solid fa-cart-shopping"></i>
              </NavLink>

            </div>
          </div>

          <div className={cx('body')}>
            <Switch>
              <Redirect exact from="/" to="/home" />

              <Route path='/home'>
                <Home />
              </Route>
              <Route path='/register'>
                <Resigter />
              </Route>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/cart'>
                <Cart />
              </Route>
              <Route path='/store'>
                <Store />
              </Route>
              <Route path='/about'>
                <About />
              </Route>
              <Route path={`/detail/:id`}>
                <Detail
                />
              </Route>
              <Route path='/profile'>
                <Profile
                  name={getName}
                />
              </Route>
              {isLogin ?
                <div >
                  {
                    getRole == '2' ? <Route path='/manager'>
                      <Dashboard
                      />
                    </Route> :
                      <Route path='/error404'>
                        <Error
                        />
                      </Route>
                  }

                </div>
                :
                <>
                  <Route path='/error404'>
                    <Error
                    />
                  </Route>
                </>
              }




            </Switch>
          </div>
          {/* Footer */}

          <div className={cx('footer')}>
            <div className={cx('content')}>
              <h3>Thông tin cửa hàng</h3>

              <p>
                <p><i className="fa-solid fa-map-location-dot"></i><span>Địa Chỉ: 31/32/1a Ung Văn Khiêm, Phường 25, Quận Bình Thạnh, TP HCM</span></p>
                <p><i className="fa-solid fa-phone"></i><span>Điện Thoại: (+84)938386616</span></p>
                <p><i className="fa-solid fa-envelope"></i> <span>Email: info@amiri.com</span></p>
                <p><i className="fa-solid fa-clock"></i><span>Thời Gian Mở Cửa: T2 - CN / 10:00 - 21:00</span></p>
              </p>
            </div>
            <div className={cx('content')}>
              <h3>Cam kết của chúng tôi</h3>

              <p>
                <p>Hàng Authentic 100%</p>
                <p>Đổi trả trong vòng 20 ngày</p>
                <p>Bảo trì quần áo</p>

              </p>
            </div>
            <div className={cx('content')}>
              <img src={ac} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment >

  );
}

export default App;