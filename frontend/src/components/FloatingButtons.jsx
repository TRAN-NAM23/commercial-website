import React, { useState } from 'react';
import '../styles/floatingButton.css';
import { FaPhoneAlt, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

const FloatingButtons = () => {
  const [showMap, setShowMap] = useState(false);
  const [showZalo, setShowZalo] = useState(false);

  // --- qr zalo 
  const ZaloQR = "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg";


  // --- CẤU HÌNH TOẠ ĐỘ  ---
  const SHOP_LOCATION = {
    lat: 20.982114, 
    lng: 105.793056
  };

  const handleToggleMap = (e) => {
    e.preventDefault();
    setShowMap(!showMap); // Bấm là hiện/ẩn luôn, không cần hỏi quyền
  };
  
  const handleToggleZalo = (e) => {
    e.preventDefault();
    setShowZalo(!showZalo);
    setShowMap(false); // Tắt Map nếu đang mở
  };

  return (
    <>
      {/* --- KHUNG MAP POPUP (HIỆN VỊ TRÍ QUÁN) --- */}
      {showMap && (
        <div className="mini-map-popup">
          <button className="close-map-btn" onClick={() => setShowMap(false)}>
            <FaTimes />
          </button>
          
          <iframe
            title="Shop Location"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${SHOP_LOCATION.lat},${SHOP_LOCATION.lng}&z=16&output=embed`}
          ></iframe>
        </div>
      )}

      {/* popup zalo */}
      {showZalo && (
        <div className="mini-popup zalo-type">
          <button className="close-popup-btn" onClick={() => setShowZalo(false)}>
            <FaTimes />
          </button>
          
          <div className="zalo-content">
            <p>Quét mã để chat Zalo</p>
            {/* Hiển thị ảnh QR */}
            <img src={ZaloQR} alt="Mã QR Zalo" />
          </div>
        </div>
      )}

      {/* --- CÁC NÚT TRÒN --- */}
      <div className="floating-container">
        
        {/* Nút Gọi */}
        <a href="tel:0938711019" className="float-btn phone-btn" title="Gọi ngay">
          <FaPhoneAlt />
          <span className="animate-ring"></span>
        </a>

        {/* Nút Zalo */}
        <a 
          href="#" 
          onClick={handleToggleZalo}
          className={`float-btn zalo-btn ${showZalo ? 'active' : ''}`} 
          title="Chat Zalo"
        >
          <SiZalo /> 
        </a>

        {/* Nút Vị trí Quán */}
        <a 
          href="#" 
          onClick={handleToggleMap} 
          className={`float-btn map-btn ${showMap ? 'active' : ''}`}
          title="Xem địa chỉ quán"
        >
          <FaMapMarkerAlt />
        </a>

      </div>
    </>
  );
};

export default FloatingButtons;