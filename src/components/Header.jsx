import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import logo from '../assets/logo.png'; 
import { FaSearch, FaShoppingCart, FaPhoneAlt, FaUser, FaBars, FaTimes, FaChevronRight } from "react-icons/fa";
import '../styles/header.css';
import { Products } from '../data/products.js'; 
function Header({openPopUp}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // --- STATE TÌM KIẾM ---
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchRef = useRef(null);

  // --- LOGIC LỌC SẢN PHẨM TÌM KIẾM ---
  useEffect(() => {
    if (searchTerm.trim() === '') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSearchResults([]);
        setIsDropdownVisible(false);
        return;
    }

    // Lọc sản phẩm có tên chứa từ khóa (không phân biệt hoa thường)
    const filteredProducts = Products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredProducts.slice(0, 5)); 
    setIsDropdownVisible(true);
  }, [searchTerm]);

  // --- LOGIC ĐÓNG DROPDOWN KHI CLICK RA NGOÀI ---
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setIsDropdownVisible(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  // --- LOGIC CHỌN SẢN PHẨM ---
  const handleProductClick = (productId) => {
    setIsDropdownVisible(false);
    setSearchTerm(''); // Xóa nội dung tìm kiếm sau khi click
    navigate(`/ProductDetail/${productId}`);
  };

  const toggleMenu = () => { setIsMobileMenuOpen(!isMobileMenuOpen); };
  const closeMenu = () => { setIsMobileMenuOpen(false); };

  return (
    <>
      <header className="header-wrapper fixed-header">
        <div className="container header-main">
          
          <div className="mobile-menu-toggle" onClick={toggleMenu}>
            <FaBars />
          </div>

          <Link to="/" className="logo-link" onClick={closeMenu}>
             <img src={logo} alt="Logo" className='logo' />
          </Link>

          {/* --- THANH TÌM KIẾM --- */}
          <div className="search-bar" ref={searchRef} style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Tìm kiếm đặc sản..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => {
                if (searchResults.length > 0) setIsDropdownVisible(true);
              }}
            />
            <button className="btn-search">
              <FaSearch className="icon-search" />
            </button>

            {/* Khung Dropdown Hiển Thị Kết Quả */}
            {isDropdownVisible && searchResults.length > 0 && (
                <div className="search-dropdown">
                    {searchResults.map((product) => (
                        <div 
                            key={product.id} 
                            className="search-item"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <img src={product.image} alt={product.name} className="search-item-img" />
                            <div className="search-item-info">
                                <h4 className="search-item-name">{product.name}</h4>
                                <span className="search-item-price">
                                    {Number(product.price).toLocaleString()} ₫
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Thông báo không tìm thấy */}
            {isDropdownVisible && searchTerm.trim() !== '' && searchResults.length === 0 && (
                <div className="search-dropdown empty-result">
                    Không tìm thấy sản phẩm "{searchTerm}"
                </div>
            )}
          </div>
          {/* -------------------------------------- */}

          <div className="header-actions">
            <div className="hotline hide-on-mobile">
              <span>Hotline </span>
              <div className="hotline-number">
                <FaPhoneAlt className="icon-phone" />
                <span>0938.711.019</span>
              </div>
            </div>
          
            <Link to="/Cart" className="action-item">
              <FaShoppingCart className="icon-cart" />
              <span className="label">Giỏ hàng (0)</span>
            </Link>

          <div className="user-dropdown-container hide-on-mobile">
             <Link to = "/Register" className="action-item">
                <FaUser className="icon-user" />
                <span className="label">Tài khoản</span>
             </Link>

             <div className="user-dropdown-menu">
                <div className="dropdown-arrow"></div>
                <div className="dropdown-btn" onClick={(e) => { e.stopPropagation(); openPopUp('login'); }} style={{cursor: 'pointer'}}>
                   Đăng nhập
                </div>
                
                <div className="dropdown-btn" onClick={(e) => { e.stopPropagation(); openPopUp('register'); }} style={{cursor: 'pointer'}}>
                   Đăng ký
                </div>
             </div>
          </div>
          </div>
        </div>

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

      {/* PHẦN MENU MOBILE GIỮ NGUYÊN BÊN DƯỚI... */}
      <div className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>

      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>MENU</h3>
          <button className="close-btn" onClick={closeMenu}><FaTimes /></button>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/" onClick={closeMenu}>Trang chủ <FaChevronRight /></Link></li>
          <li><Link to="/Category" onClick={closeMenu}>Danh mục <FaChevronRight /></Link></li>
          <li><Link to="/" onClick={closeMenu}>Đặc sản miền Bắc <FaChevronRight /></Link></li>
          <li><Link to="/" onClick={closeMenu}>Đặc sản miền Trung <FaChevronRight /></Link></li>
          <li><Link to="/" onClick={closeMenu}>Đặc sản miền Nam <FaChevronRight /></Link></li>
          <li><Link to="/" onClick={closeMenu}>Bộ quà tặng <FaChevronRight /></Link></li>
          <li><Link to="/" onClick={closeMenu}>Liên hệ <FaChevronRight /></Link></li>
          <li><Link to="/login" onClick={closeMenu}>Tài khoản <FaChevronRight /></Link></li>
        </ul>
      </div>
      
      <div className="header-spacer"></div>
    </>
  )
}

export default Header;