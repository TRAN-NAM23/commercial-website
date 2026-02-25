import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. IMPORT LINK Ở ĐÂY
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import imgMienBac from '../../assets/mienBac.png';
import imgMienTrung from '../../assets/mienTrung.png';
import imgMienNam from '../../assets/mienNam.png';
import '../../styles/slider.css';

const slides = [
  {
    id: 1,
    image: imgMienBac, 
    link: "/Category?region=bac",
  },
  {
    id: 2,
    image: imgMienTrung, 
    link: "/Category?region=trung",
  },
  {
    id: 3,
    image: imgMienNam, 
    link: "/Category?region=nam",
  }
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  // Tự động chạy slider
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000); 

    // Clear timeout khi component unmount hoặc user bấm chuyển slide thủ công
    return () => clearTimeout(timer);
  }, [current]); 

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className="slider-container">
      <div 
        className="slider-wrapper" 
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div className="slide" key={slide.id}>
            {/* 2. BỌC THẺ LINK QUANH ẢNH ĐỂ CÓ THỂ CLICK CHUYỂN TRANG */}
            <Link to={slide.link} style={{ display: 'block', width: '100%', height: '100%' }}>
                <img src={slide.image} alt={`Slide ${slide.id}`} className="slide-image" />
            </Link>
          </div>
        ))}
      </div>

      <button className="arrow-btn left-arrow" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <button className="arrow-btn right-arrow" onClick={nextSlide}>
        <FaChevronRight />
      </button>

      <div className="dots-container">
        {slides.map((_, index) => (
          <div 
            key={index} 
            className={`dot ${index === current ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;