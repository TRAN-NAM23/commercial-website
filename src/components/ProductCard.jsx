import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaEye } from "react-icons/fa"; 
import '../styles/productCard.css';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const ProductCard = ({ product }) => {

  // --- LOGIC THÊM VÀO GIỎ HÀNG (Demo) ---
  const handleAddToCart = (e) => {
        e.preventDefault();   // Ngăn không cho chuyển sang trang chi tiết
        e.stopPropagation();  // Ngăn sự kiện click lan ra ngoài
        alert(`Đã thêm ${product.name} vào giỏ hàng!`); 
    };
  if (!product) return null;

  return (
    <div className="product-card">
     <Link to={`/ProductDetail/${product.id}`}>
      <div className="product-image-wrapper">
        
          <img src={product.image} alt={product.name} className="product-img" />
    
        
        {/* Nhãn Giảm giá */}
        {product.discount > 0 && (
          <span className="badge-discount">-{product.discount}%</span>
        )}

        {/* Nhãn Hot */}
        {product.isHot && (
          <span className="badge-hot">HOT</span>
        )}

        <div className="hover-actions">
          <div className="action-circle-btn" title="Thêm vào giỏ" onClick={handleAddToCart}><FaShoppingBag /></div>
          
          <Link to={`/ProductDetail/${product.id}`} className="action-circle-btn" title="Xem chi tiết">
            <FaEye />
          </Link>
        </div>
      </div>
      </Link> 

      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/ProductDetail/${product.id}`}>{product.name}</Link>
        </h3>
        
        <div className="price-box">
          <span className="current-price">{formatCurrency(product.price)}</span>
          {product.oldPrice && (
            <span className="old-price">{formatCurrency(product.oldPrice)}</span>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProductCard;