import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Đảm bảo đúng đường dẫn logo
import { FaSearch, FaShoppingCart, FaPhoneAlt, FaUser, FaBars, FaTimes, FaChevronRight } from "react-icons/fa";
import '../styles/header.css';

function Header({openPopUp}) {
  // State quản lý việc đóng/mở menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hàm toggle menu
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Hàm đóng menu khi click vào link bên trong
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header-wrapper fixed-header">
        
        <div className="container header-main">
          
          {/* 1. Nút Menu Mobile (Chỉ hiện trên Tablet/Phone) */}
          <div className="mobile-menu-toggle" onClick={toggleMenu}>
            <FaBars />
          </div>

          {/* Logo */}
          <Link to="/" className="logo-link" onClick={closeMenu}>
             <img src={logo} alt="Logo" className='logo' />
          </Link>

          {/* Thanh tìm kiếm */}
          <div className="search-bar ">
            <input type="text" placeholder="Tìm kiếm đặc sản..." />
            <button className="btn-search">
              <FaSearch className="icon-search" />
            </button>
          </div>

          <div className="header-actions">
            {/* Hotline (Ẩn trên mobile) */}
            <div className="hotline hide-on-mobile">
              <span>Hotline </span>
              <div className="hotline-number">
                <FaPhoneAlt className="icon-phone" />
                <span>0938.711.019</span>
              </div>
            </div>
          
            {/* Giỏ hàng */}
            <Link to="/Cart" className="action-item">
              <FaShoppingCart className="icon-cart" />
              <span className="label">Giỏ hàng (0)</span>
            </Link>

            {/* Account*/}
          <div className="user-dropdown-container hide-on-mobile">
             {/* Icon User */}
             <Link to = "/Register" className="action-item">
                <FaUser className="icon-user" />
                <span className="label">Tài khoản</span>
             </Link>

             {/* Menu Dropdown (Ẩn, chỉ hiện khi hover) */}
             <div className="user-dropdown-menu">
                <div className="dropdown-arrow"></div>
                <div 
                    className="dropdown-btn" 
                    onClick={(e) => {
                    e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
                    openPopUp('login');
                    }}
                    style={{cursor: 'pointer'}}
                >
                   Đăng nhập
                </div>
                
                <div 
                    className="dropdown-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      openPopUp('register'); 
                  }}
                    style={{cursor: 'pointer'}}
                >
                   Đăng ký
                </div>
             </div>
          </div>
          </div>
        </div>

        {/* Navigation Desktop (Ẩn trên mobile) */}
        <nav className="navbar desktop-nav">
          <div className="container">
            <ul className="nav-menu">
              <li><Link to="/" className="nav-item">TRANG CHỦ</Link></li>
              <li><Link to="/Category" className="nav-item">DANH MỤC</Link></li>
              <li><Link to="/Category?region=bac" className="nav-item">ĐẶC SẢN MIỀN BẮC</Link></li>
              <li><Link to="/Category?region=trung" className="nav-item">ĐẶC SẢN MIỀN TRUNG</Link></li>
              <li><Link to="/Category?region=nam" className="nav-item">ĐẶC SẢN MIỀN NAM</Link></li>
              <li><Link to="/" className="nav-item">BỘ QUÀ TẶNG</Link></li>
              <li><Link to="/" className="nav-item">LIÊN HỆ</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* --- PHẦN MENU MOBILE (SIDEBAR) --- */}
      
      {/* 1. Lớp phủ đen mờ (Overlay) */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`} 
        onClick={closeMenu}
      ></div>

      {/* 2. Thanh Menu trượt ra */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        
        {/* Header của Sidebar */}
        <div className="sidebar-header">
          <h3>MENU</h3>
          <button className="close-btn" onClick={closeMenu}>
            <FaTimes />
          </button>
        </div>

        {/* Danh sách link mobile */}
        <ul className="sidebar-menu">
          <li>
            <Link to="/" onClick={closeMenu}>Trang chủ <FaChevronRight /></Link>
          </li>
          <li>
            <Link to="/Category" onClick={closeMenu}>Danh mục <FaChevronRight /></Link>
          </li>
          <li>
            <Link to="/" onClick={closeMenu}>Đặc sản miền Bắc <FaChevronRight /></Link>
          </li>
          <li>
            <Link to="/" onClick={closeMenu}>Đặc sản miền Trung <FaChevronRight /></Link>
          </li>
          <li>
            <Link to="/" onClick={closeMenu}>Đặc sản miền Nam <FaChevronRight /></Link>
          </li>
          <li>
            <Link to="/" onClick={closeMenu}>Bộ quà tặng <FaChevronRight /></Link>
          </li>
          <li>
            <Link to="/" onClick={closeMenu}>Liên hệ <FaChevronRight /></Link>
          </li>
          <li>
            <Link to="/login" onClick={closeMenu}>Tài khoản <FaChevronRight /></Link>
          </li>
        </ul>
      </div>
      
      {/* Một div rỗng để đẩy nội dung web xuống, tránh bị Header che mất */}
      <div className="header-spacer"></div>
    </>
  )
}

export default Header;