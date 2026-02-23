import  { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { FaLeaf, FaSun, FaCloudMoon, FaSnowflake } from "react-icons/fa";
import '../../styles/productSection.css';
import ProductCard from '../ProductCard.jsx';

import { getHotProducts, getProductsBySeason } from '../../data/products.js';

const ProductSection = ({ title = "ĐẶC SẢN NỔI BẬT", type = 'hot' }) => {
  
  // 1. State quản lý tab mùa
  const [activeSeason, setActiveSeason] = useState('spring');
  
  // 2. State quản lý danh sách sản phẩm (thay vì biến let)
  const [products, setProducts] = useState([]);

  // 3. Dùng useEffect để lấy dữ liệu tự động
  useEffect(() => {
    let data = [];
    
    if (type === 'hot') {
      // Nếu là section Nổi bật -> Lấy sản phẩm Hot
      data = getHotProducts();
    } else if (type === 'seasonal') {
      // Nếu là section Theo mùa -> Lấy theo mùa đang chọn
      data = getProductsBySeason(activeSeason);
    }
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProducts(data); // Cập nhật state
    
  }, [type, activeSeason]); 
  const seasonSubtitles = {
    spring: "Hương vị Tết & Xuân",
    summer: "Giải nhiệt ngày Hè",
    autumn: "Thức quà Thu Hà Nội",
    winter: "Ấm áp Mùa Đông"
  };

    // Link động dẫn đến các sp nổi bật và mùa còn lại 
    const getViewMoreLink = () =>{
      if (type === 'hot') {
          return '/tat-ca-san-pham?type=hot'; // Dẫn về trang lọc Hot
      } 
    
      
      return '/tat-ca-san-pham';
    }

  return (
    <section className="product-section">
      <div className="container">
        
        {/* Header */}
        <div className="section-header-wrapper">
          <h2 className="section-title">
            {title} {type === 'seasonal' && `- ${seasonSubtitles[activeSeason]}`}
          </h2>
        </div>

        {/* Tab chuyển mùa (Chỉ hiện khi type='seasonal') */}
        {type === 'seasonal' && (
          <div className="season-tabs-wrapper">
             <button className={`tab-btn ${activeSeason === 'spring' ? 'active' : ''}`} onClick={() => setActiveSeason('spring')}>
                <FaLeaf /> Xuân
             </button>
             <button className={`tab-btn ${activeSeason === 'summer' ? 'active' : ''}`} onClick={() => setActiveSeason('summer')}>
                <FaSun /> Hạ
             </button>
             <button className={`tab-btn ${activeSeason === 'autumn' ? 'active' : ''}`} onClick={() => setActiveSeason('autumn')}>
                <FaCloudMoon /> Thu
             </button>
             <button className={`tab-btn ${activeSeason === 'winter' ? 'active' : ''}`} onClick={() => setActiveSeason('winter')}>
                <FaSnowflake /> Đông
             </button>
          </div>
        )}

        {/* Lưới sản phẩm */}
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-product">
                Đang cập nhật sản phẩm cho mục này...
            </div>
          )}
        </div>


        <div className="view-more-container">
          <Link to={getViewMoreLink()} className="btn-view-more">
            Xem thêm
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ProductSection;