import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaCheck, FaTruck, FaPhoneAlt, FaShieldAlt, FaMinus, FaPlus, FaShoppingCart, FaUserCircle } from "react-icons/fa";

import Breadcrumb from '../components/Breadcrumb.jsx';
import ProductCard from '../components/ProductCard.jsx';

import { getProductById, getRelatedProducts } from '../data/products';
// 1. IMPORT HÀM LẤY DATA FEEDBACK VÀO ĐÂY
import { getFeedbackByProductId } from '../data/dataFeeadback.js';

import '../styles/productDetail.css';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [activeTab, setActiveTab] = useState('description');

  const [rating, setRating] = useState(0); 
  const [hoverRating, setHoverRating] = useState(0); 
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');
  
  // 2. STATE REVIEWS BAN ĐẦU LÀ MẢNG RỖNG
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const currentProduct = getProductById(id);
    
    if (currentProduct) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProduct(currentProduct);
      const initialImage = (currentProduct.images && currentProduct.images.length > 0) 
                            ? currentProduct.images[0] 
                            : currentProduct.image;
      setSelectedImage(initialImage);

      const related = getRelatedProducts(id, currentProduct.category);
      setRelatedProducts(related);
      setQuantity(1);
      setActiveTab('description'); 

      // 3. LẤY DANH SÁCH ĐÁNH GIÁ TỪ DATA CHO SẢN PHẨM NÀY
      const productReviews = getFeedbackByProductId(id);
      setReviews(productReviews);

    } else {
      setProduct(null);
    }
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === 'decrease') {
      if (quantity > 1) setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleReviewSubmit = (e) => {
      e.preventDefault();
      if(rating === 0) {
          alert("Vui lòng chọn số sao đánh giá!");
          return;
      }
      if(!reviewText || !reviewerName || !reviewerEmail) {
          alert("Vui lòng điền đầy đủ thông tin!");
          return;
      }

      // 4. Cập nhật review ảo 
      const newReview = {
          id: Date.now(),
          productId: Number(id), // Gắn thêm ID sản phẩm hiện tại
          name: reviewerName,
          date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' }),
          rating: rating,
          comment: reviewText
      };

      // Đẩy review mới lên đầu mảng
      setReviews([newReview, ...reviews]); 

      setRating(0);
      setReviewText('');
      setReviewerName('');
      setReviewerEmail('');
      alert("Cảm ơn bạn đã đánh giá sản phẩm!");
  };

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

  const imageList = product.images && product.images.length > 0 
                    ? product.images 
                    : [product.image, product.image, product.image];

  return (
    <>
      <Breadcrumb title={product.name} parents={[{name: 'Sản phẩm', link: '/san-pham'}]} />

      <div className="container product-detail-wrapper">
        
        {/* THÔNG TIN CHÍNH */}
        <div className="product-main-info">
          
          <div className="product-gallery">
            <div className="main-image-box">
               <img src={selectedImage || product.image} alt={product.name} className="detail-img" />
               {product.discount > 0 && <span className="detail-badge">-{product.discount}%</span>}
            </div>

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

          <div className="product-summary">
            <h1 className="detail-title">{product.name}</h1>
            
            <div className="detail-meta">
               <div className="rating">
                  <div className="rating-stars">
                     {/* 5. CẬP NHẬT: Tính điểm sao trung bình dựa trên data thực tế */}
                     {[...Array(5)].map ((_, index) =>{
                        const ratingValue = Math.round(product.rating || 0);
                        return index < ratingValue ? ( <FaStar key={index} color="#ffc107" size={18} /> ) : (
                        <FaRegStar key={index} color="#ffc107" size={18} /> );
                     })}
                  </div>
                  <span style={{ marginLeft: '8px', color: '#666', fontSize: '14px' }}>
                  {/* Cập nhật số lượng review thực tế */}
                  ({reviews.length} đánh giá)
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

            <div className="quantity-selector">
               <span>Số lượng:</span>
               <div className="qty-box">
                  <button onClick={() => handleQuantityChange('decrease')}><FaMinus /></button>
                  <input type="text" value={quantity} readOnly />
                  <button onClick={() => handleQuantityChange('increase')}><FaPlus /></button>
               </div>
            </div>

            <div className="detail-actions">
               <button className="btn-add-cart">
                  <FaShoppingCart /> Thêm vào giỏ
               </button>
               <button className="btn-buy-now">
                  Mua ngay
               </button>
            </div>

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

        {/* --- PHẦN 2: KHU VỰC TABS (GIAO DIỆN CHUYỂN ĐỔI) --- */}
        <div className="product-tabs-container">
            
            <div className="tab-headers">
                <button 
                    className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => setActiveTab('description')}
                >
                    CHI TIẾT SẢN PHẨM
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    ĐÁNH GIÁ ({reviews.length})
                </button>
            </div>

            <div className="tab-content">
                
                {activeTab === 'description' && (
                    <div className="tab-pane description-pane">
                        <div className="desc-content">
                            <p>Thông tin chi tiết về sản phẩm <strong>{product.name}</strong>.</p>
                            <p>
                                Đây là đặc sản chất lượng cao, được tuyển chọn kỹ lưỡng từ vùng nguyên liệu {product.region === 'bac' ? 'Miền Bắc' : product.region === 'trung' ? 'Miền Trung' : 'Miền Nam'}. 
                                Sản phẩm đảm bảo vệ sinh an toàn thực phẩm, thích hợp dùng trong gia đình hoặc làm quà biếu.
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="tab-pane reviews-pane">
                        
                        {reviews.length === 0 ? (
                            <>
                                <p className="no-reviews-text">Chưa có đánh giá nào.</p>
                                <h3 className="review-form-title">Hãy là người đầu tiên đánh giá "{product.name}"</h3>
                            </>
                        ) : (
                            <>
                                <h3 className="review-count-title">{reviews.length} đánh giá cho {product.name}</h3>
                                <div className="reviews-list">
                                    {reviews.map(review => (
                                        <div className="review-item" key={review.id}>
                                            <div className="review-avatar">
                                                <FaUserCircle size={45} color="#d0ebdd" />
                                            </div>
                                            <div className="review-content">
                                                <div className="review-header">
                                                    <div className="rating-stars">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FaStar key={i} color={i < review.rating ? "#f8c857" : "#e4e5e9"} size={14} />
                                                        ))}
                                                    </div>
                                                    <span className="reviewer-name">{review.name}</span>
                                                    <span className="review-date">{review.date}</span>
                                                </div>
                                                <p className="review-text">{review.comment}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <h3 className="review-form-title" style={{marginTop: '30px'}}>Thêm đánh giá</h3>
                            </>
                        )}

                        <form className="review-form" onSubmit={handleReviewSubmit}>
                            <p className="review-note">Email của bạn sẽ không được hiển thị công khai. Các trường bắt buộc được đánh dấu *</p>
                            
                            <div className="form-rating-input">
                                <span>Đánh giá của bạn *</span>
                                <div className="interactive-stars">
                                    {[...Array(5)].map((_, index) => {
                                        const starValue = index + 1;
                                        return (
                                            <FaStar
                                                key={index}
                                                color={starValue <= (hoverRating || rating) ? "#ffe555" : "#e4e5e9"} 
                                                size={18}
                                                onMouseEnter={() => setHoverRating(starValue)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                onClick={() => setRating(starValue)}
                                                style={{ cursor: 'pointer', marginRight: '4px', transition: 'color 0.2s' }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="form-group">
                                <textarea 
                                    placeholder="Nhận xét của bạn *" 
                                    rows="5" 
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <input type="text" placeholder="Tên *" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <input type="email" placeholder="Email *" value={reviewerEmail} onChange={(e) => setReviewerEmail(e.target.value)} required />
                                </div>
                            </div>


                            <button type="submit" className="btn-submit-review">Gửi đánh giá</button>
                        </form>
                    </div>
                )}
            </div>
        </div>

        {/* SẢN PHẨM LIÊN QUAN */}
        <div className="related-products-section" style={{marginTop: '60px'}}>
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

      </div>
    </>
  );
};

export default ProductDetail;