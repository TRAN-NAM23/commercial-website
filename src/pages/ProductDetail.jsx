import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar,FaRegStar, FaCheck, FaTruck, FaPhoneAlt, FaShieldAlt, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";

import Breadcrumb from '../components/Breadcrumb.jsx';
import ProductCard from '../components/ProductCard.jsx';

import { getProductById, getRelatedProducts } from '../data/products';


// Import CSS
import '../styles/productDetail.css';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [quantity, setQuantity] = useState(1);
  
  // State lưu dữ liệu sản phẩm
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  // 1. BỔ SUNG: State lưu ảnh đang chọn
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Cuộn lên đầu trang
    window.scrollTo(0, 0);

    // Lấy dữ liệu sản phẩm hiện tại
    const currentProduct = getProductById(id);
    
    if (currentProduct) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProduct(currentProduct);

      // Xử lý ảnh mặc định ban đầu
      const initialImage = (currentProduct.images && currentProduct.images.length > 0) 
                            ? currentProduct.images[0] 
                            : currentProduct.image;
      setSelectedImage(initialImage);

      const related = getRelatedProducts(id, currentProduct.category);
      setRelatedProducts(related);
      setQuantity(1);
    } else {
      setProduct(null);
    }
  }, [id]);

  // Xử lý tăng/giảm số lượng
  const handleQuantityChange = (type) => {
    if (type === 'decrease') {
      if (quantity > 1) setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  // Giao diện khi không tìm thấy sản phẩm
  if (!product) {
      return (
          <div className="container" style={{padding: '100px 0', textAlign: 'center'}}>
              <h2>Sản phẩm không tồn tại!</h2>
              <p>Có vẻ như đường dẫn bạn truy cập không đúng.</p>
              <Link to="/" className="btn-buy-now" style={{display: 'inline-block', marginTop: '20px', textDecoration:'none'}}>
                 Quay lại cửa hàng
              </Link>
          </div>
      );
  }

  // Danh sách ảnh (đảm bảo luôn là mảng)
  const imageList = product.images && product.images.length > 0 
                    ? product.images 
                    : [product.image, product.image, product.image];

  return (
    <>
      <Breadcrumb title={product.name} parents={[{name: 'Sản phẩm', link: '/san-pham'}]} />

      <div className="container product-detail-wrapper">
        
        {/* --- PHẦN 1: THÔNG TIN CHÍNH (Flex Container) --- */}
        <div className="product-main-info">
          
          {/* === CỘT TRÁI: ẢNH === */}
          <div className="product-gallery">
            <div className="main-image-box">
               {/* 2. SỬA: Dùng selectedImage thay vì product.image */}
               <img src={selectedImage || product.image} alt={product.name} className="detail-img" />
               
               {product.discount > 0 && <span className="detail-badge">-{product.discount}%</span>}
            </div>

            {/* 3. DANH SÁCH THUMBNAIL (Nằm TRONG product-gallery) */}
            <div className="thumbnail-list">
                {imageList.map((img, index) => (
                    <div 
                        key={index} 
                        className={`thumbnail-item ${selectedImage === img ? 'active' : ''}`}
                        onClick={() => setSelectedImage(img)}
                    >
                        <img src={img} alt={`thumb-${index}`} />
                    </div>
                ))}
            </div>
          </div> 

          {/* === CỘT PHẢI: THÔNG TIN === */}
          <div className="product-summary">
            <h1 className="detail-title">{product.name}</h1>
            
            <div className="detail-meta">
               <div className="rating">
                  <div className="rating-stars">
                     {[...Array(5)].map ((_, index) =>{
                        const ratingValue = Math.round(product.rating || 0);
                        return index < ratingValue ? ( <FaStar key={index} color="#ffc107" size={18} /> ) : (
                        <FaRegStar key={index} color="#ffc107" size={18} /> );
                     })}
                  </div>
                  <span style={{ marginLeft: '8px', color: '#666', fontSize: '14px' }}>
                  ({product.reviewCount || 0} đánh giá)
                   </span>
               </div>
               <span className="stock-status"><FaCheck /> Còn hàng</span>
            </div>

            <div className="detail-price-box">
               <span className="detail-current-price">{formatCurrency(product.price)}</span>
               {product.oldPrice && <span className="detail-old-price">{formatCurrency(product.oldPrice)}</span>}
            </div>

            <p className="detail-short-desc">
              {product.description}
            </p>

            {/* Bộ chọn số lượng */}
            <div className="quantity-selector">
               <span>Số lượng:</span>
               <div className="qty-box">
                  <button onClick={() => handleQuantityChange('decrease')}><FaMinus /></button>
                  <input type="text" value={quantity} readOnly />
                  <button onClick={() => handleQuantityChange('increase')}><FaPlus /></button>
               </div>
            </div>

            {/* Nút hành động */}
            <div className="detail-actions">
               <button className="btn-add-cart">
                  <FaShoppingCart /> Thêm vào giỏ
               </button>
               <button className="btn-buy-now">
                  Mua ngay
               </button>
            </div>

            {/* Chính sách */}
            <div className="detail-policies">
               <div className="policy-item">
                  <FaTruck className="policy-icon"/><span>Miễn phí ship trong phạm vi 3km</span>
               </div>
               <div className="policy-item">
                  <FaShieldAlt className="policy-icon"/><span>Đổi trả trong 7 ngày</span>
               </div>
               <div className="policy-item">
                  <FaPhoneAlt className="policy-icon"/><span>Hotline: 0938.711.019</span>
               </div>
            </div>
          </div>   
        </div> 


        {/* --- PHẦN 2: MÔ TẢ CHI TIẾT --- */}
        <div className="product-description-section">
           <h3 className="section-heading">Chi tiết sản phẩm </h3>
           <div className="desc-content">
              <p>Thông tin chi tiết về sản phẩm <strong>{product.name}</strong>.</p>
              <p>
                Đây là đặc sản chất lượng cao, được tuyển chọn kỹ lưỡng từ vùng nguyên liệu {product.region === 'bac' ? 'Miền Bắc' : product.region === 'trung' ? 'Miền Trung' : 'Miền Nam'}. 
                Sản phẩm đảm bảo vệ sinh an toàn thực phẩm, thích hợp dùng trong gia đình hoặc làm quà biếu.
              </p>
           </div>
        </div>

        {/* --- PHẦN 3: SẢN PHẨM LIÊN QUAN --- */}
        <div className="related-products-section">
           <h3 className="section-heading">SẢN PHẨM LIÊN QUAN</h3>
           <div className="related-grid">
              {relatedProducts.length > 0 ? (
                 relatedProducts.map(item => (
                    <ProductCard key={item.id} product={item} />
                 ))
              ) : (
                 <p style={{fontStyle:'italic', color:'#777'}}>Chưa có sản phẩm liên quan nào.</p>
              )}
           </div>
        </div>

      {/*--- PHẦN 4: SẢN PHẨM XEM GẦN ĐÂY --*/}
      
      </div>
    </>
  );
};

export default ProductDetail;