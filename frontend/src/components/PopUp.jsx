import React, { useState, useEffect } from 'react';
import { FaTimes, FaFacebookF, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from "../assets/logo.png"
import "../styles/popUp.css"
import "../index.css"

const PopUp = ({isOpen, onClose, initialTab = 'login'}) =>{
    const [activeTab, setActiveTab] = useState(initialTab);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        // Ngăn hành vi reload trang mặc định (nếu nút nằm trong form)
        if(e) e.preventDefault(); 
        if (activeTab === 'login') {
            // Logic Đăng nhập cũ
            alert("Đã click đăng nhập");
        } else {
            alert("Đã click đăng ký");
        }
    };
    return (
        <>
        <div className="pop-up-overlay" onClick={onClose}>
            <div className="pop-up" onClick= { e => e.stopPropagation()}>
                {/* Nút đóng */}
                <button className="close-btn" onClick={onClose}>
                    <FaTimes />
                </button>

                {/* -- THÔNG TIN -- */}
                <div className="pop-up-left">
                    <h2>{activeTab === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}</h2>
                    <p className="desc">
                        {activeTab === 'login' 
                            ? 'Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.' 
                            : 'Tạo tài khoản để nhận ưu đãi thành viên và mua sắm nhanh chóng hơn.'}
                    </p>
                    <div className="left-logo">
                        <img src={Logo} alt="Đặc sản 3 miền" className='pop-up-logo' />
                    </div>
                </div>

                {/*-- FORM --*/}
                <div className="pop-up-right">
                    {/* Tabs chuyển đổi */}
                    <div className="pop-up-tabs">
                        <button 
                            className={`pop-up-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => setActiveTab('login')}
                        >
                            Đăng nhập
                        </button>
                        <button 
                            className={`pop-up-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                            onClick={() => setActiveTab('register')}
                        >
                            Đăng kí tài khoản
                        </button>
                    </div>
                    {/* Form điền */}
                    <div className="form-container">
                        {activeTab === 'register' && (
                            <>
                                <div className="form-group">
                                    <label>Tên:</label>
                                    <input type="text" placeholder="Tên" />
                                </div>
                                <div className="form-group">
                                    <label>Họ:</label>
                                    <input type="text" placeholder="Họ" />
                                </div>
                            </>
                        )}
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" placeholder="Nhập email của bạn" />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu:</label>
                            <div className="password-input" style={{flex:1}}>
                                <input type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu" />
                                <button 
                                    type="button" 
                                    className="toggle-password-btn"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        {activeTab === 'register' && (
                            <>
                                <div className="form-group">
                                    <label>Xác nhận lại mật khẩu</label>
                                    <div className="password-input" style={{flex:1}}>
                                        <input type={showConfirmPass? "text" : "password"}
                                        placeholder="Nhập mật khẩu" />
                                        <button 
                                            type="button" className="toggle-password-btn"
                                            onClick={() => setShowConfirmPass(!showConfirmPass)}>
                                            {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    </div>
                                </div>
                            </>
                        )}
                        {activeTab === 'login' && (
                                <div className="login-options">
                                    <label className="remember-me">
                                        <input type="checkbox" />
                                        <span>Nhớ mật khẩu</span>
                                    </label>
                                    <span className="lost-password">Quên mật khẩu?</span>
                                </div>
                        )}
                        
                        <button className="submit-btn" onClick={handleSubmit}>
                            {activeTab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                             
                        </button>

                        <div className="social-login">
                            <button className="social-btn facebook">
                                <FaFacebookF /> Facebook
                            </button>
                            <button className="social-btn google">
                                <FaGoogle /> Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
export default PopUp;