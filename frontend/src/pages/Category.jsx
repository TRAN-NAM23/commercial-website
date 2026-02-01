/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom'; // 1. IMPORT CÁI NÀY QUAN TRỌNG

import ProductCard from '../components/ProductCard.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx'; 

import { getAllProducts } from '../data/products.js'; 
import '../styles/category.css';

const Category = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  
  // 2. KHAI BÁO SEARCH PARAMS ĐỂ ĐỌC URL
  const [searchParams] = useSearchParams();
  
  // Cấu hình Load More
  const INITIAL_LIMIT = 8; 
  const LOAD_MORE_STEP = 4; 
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);
  const loadMoreRef = useRef(null);

  // --- LOGIC LỌC SẢN PHẨM ---
  useEffect(() => {
    // 1. Lấy tất cả sản phẩm gốc
    let data = getAllProducts();
    
    // 2. Đọc region từ URL (ví dụ: ?region=bac)
    const regionParam = searchParams.get('region');

    // 3. Nếu có region trên URL thì lọc luôn
    if (regionParam) {
        // Lọc theo trường 'region' trong file data
        data = data.filter(item => item.region === regionParam);
    }

    setProducts(data);
    setVisibleCount(INITIAL_LIMIT); // Reset lại số lượng hiển thị khi đổi danh mục
  }, [searchParams]); // Chạy lại mỗi khi URL thay đổi (bấm menu khác)


  // --- LOGIC SẮP XẾP ---
  const getSortedProducts = () => {
    let sorted = [...products];
    if (sortOption === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  };

  const sortedProducts = getSortedProducts();
  const currentViewProducts = sortedProducts.slice(0, visibleCount);

  // --- LOGIC SCROLL ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && visibleCount < sortedProducts.length) {
        setTimeout(() => {
            setVisibleCount((prev) => prev + LOAD_MORE_STEP);
        }, 500);
      }
    }, { root: null, rootMargin: '0px', threshold: 1.0 });

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => { if (loadMoreRef.current) observer.unobserve(loadMoreRef.current); };
  }, [visibleCount, sortedProducts.length]); 

  // --- HÀM HELPER ĐỂ CHECK XEM CHECKBOX CÓ NÊN ĐƯỢC CHECK KHÔNG ---
  const isRegionChecked = (regionKey) => {
      return searchParams.get('region') === regionKey;
  };

  return (
    <>
      <Breadcrumb title="Tất cả sản phẩm" />

      <div className="container category-layout-wrapper">
        <aside className="sidebar">
           <div className="sidebar-widget">
            <div className="widget-header-dark">LỌC SẢN PHẨM</div>
            <div className="widget-content">
               <h4 className="filter-group-title">Giá</h4>
               <ul className="filter-list">
                  <li><label className="custom-checkbox"><input type="checkbox" /> <span className="checkmark"></span> Tất cả</label></li>
                 <li><label className="custom-checkbox"><input type="checkbox" /> <span className="checkmark"></span> Dưới 100k</label></li>
                 <li><label className="custom-checkbox"><input type="checkbox" /> <span className="checkmark"></span> 100k - 300k</label></li>
                 <li><label className="custom-checkbox"><input type="checkbox" /> <span className="checkmark"></span> 300k - 500k</label></li>
                 <li><label className="custom-checkbox"><input type="checkbox" /> <span className="checkmark"></span> Trên 500k</label></li>
               </ul>

               <h4 className="filter-group-title" style={{marginTop: '20px'}}>Danh mục</h4>
               <ul className="filter-list">
                 {/* Cập nhật UI: Nếu URL đang là region đó thì checkbox tự động tick */}
                 <li>
                    <label className="custom-checkbox">
                        <input type="checkbox" checked={isRegionChecked('bac')} readOnly/> 
                        <span className="checkmark"></span> Đặc sản miền Bắc
                    </label>
                 </li>
                 <li>
                    <label className="custom-checkbox">
                        <input type="checkbox" checked={isRegionChecked('trung')} readOnly/> 
                        <span className="checkmark"></span> Đặc sản miền Trung
                    </label>
                 </li>
                 <li>
                    <label className="custom-checkbox">
                        <input type="checkbox" checked={isRegionChecked('nam')} readOnly/> 
                        <span className="checkmark"></span> Đặc sản miền Nam
                    </label>
                 </li>
               </ul>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="shop-toolbar">
            <h4 className="page-title">
                {/* Đổi tiêu đề động theo URL cho chuyên nghiệp */}
                {searchParams.get('region') === 'bac' ? 'ĐẶC SẢN MIỀN BẮC' : 
                 searchParams.get('region') === 'trung' ? 'ĐẶC SẢN MIỀN TRUNG' : 
                 searchParams.get('region') === 'nam' ? 'ĐẶC SẢN MIỀN NAM' : 'TẤT CẢ SẢN PHẨM'}
            </h4>
            
            <div className="toolbar-right">
              <span className="product-count">
                Hiển thị <b>{currentViewProducts.length}</b> sản phẩm
              </span>
              <div className="sort-box">
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                </select>
              </div>
            </div>
          </div>

          <div className="shop-product-grid">
            {currentViewProducts.length > 0 ? (
              currentViewProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p style={{gridColumn: '1 / -1', textAlign: 'center', padding: '20px'}}>
                  Không có sản phẩm nào thuộc danh mục này.
              </p>
            )}
          </div>

          <div className="load-more-trigger" ref={loadMoreRef}>
            {visibleCount < sortedProducts.length ? (
              <div className="loading-spinner"></div>
            ) : (
              sortedProducts.length > 0 && <span className="no-more-text">Đã hiển thị tất cả sản phẩm</span>
            )}
          </div>
          
        </main>
      </div>
    </>
  );
};

export default Category;