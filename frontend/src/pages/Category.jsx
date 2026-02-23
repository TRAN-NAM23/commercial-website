/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductCard from '../components/ProductCard.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx'; 

import { getAllProducts } from '../data/products.js'; 
import '../styles/category.css';

const Category = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  const [searchParams] = useSearchParams(); 
  // Load More Config
  const INITIAL_LIMIT = 8; 
  const LOAD_MORE_STEP = 4; 
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);
  const loadMoreRef = useRef(null);

  // Lấy giá trị từ URL
  const regionParam = searchParams.get('region');
  const typeParam = searchParams.get('type'); 
  // --- 1. XỬ LÝ TIÊU ĐỀ & BREADCRUMB ---
  let pageTitle = "Tất cả sản phẩm";
  let breadcrumbParents = []; 

  if (regionParam || typeParam) {
      breadcrumbParents = [{ name: "Sản phẩm", link: "/tat-ca-san-pham" }];

      if (regionParam) {
          switch(regionParam) {
              case 'bac': pageTitle = "Đặc sản miền Bắc"; break;
              case 'trung': pageTitle = "Đặc sản miền Trung"; break;
              case 'nam': pageTitle = "Đặc sản miền Nam"; break;
              default: pageTitle = "Sản phẩm";
          }
      } 
      // Nếu có type=hot thì đổi tên tiêu đề
      else if (typeParam === 'hot') {
          pageTitle = "Sản phẩm Nổi bật 🔥";
      }
  }

  // --- 2. LOGIC LỌC DATA ---
  useEffect(() => {
    let data = getAllProducts();

    // Lọc theo Vùng miền
    if (regionParam) {
        data = data.filter(item => item.region === regionParam);
    }

    // Lọc theo Sản phẩm Hot (LOGIC MỚI)
    if (typeParam === 'hot') {
        data = data.filter(item => item.isHot === true);
    }

    setProducts(data);
    setVisibleCount(INITIAL_LIMIT); 
  }, [searchParams]); // Chạy lại khi URL thay đổi

  // Logic sắp xếp
  const getSortedProducts = () => {
    let sorted = [...products];
    if (sortOption === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    else if (sortOption === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    return sorted;
  };

  const sortedProducts = getSortedProducts();
  const currentViewProducts = sortedProducts.slice(0, visibleCount);

  // Logic Infinite Scroll
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

  // Helper check checkbox
  const isRegionChecked = (regionKey) => regionParam === regionKey;
  const isHotChecked = () => typeParam === 'hot';

  return (
    <>
      <Breadcrumb title={pageTitle} parents={breadcrumbParents} />

      <div className="container category-layout-wrapper">
        <aside className="sidebar">
           <div className="sidebar-widget">
            <div className="widget-header-dark">LỌC SẢN PHẨM</div>
            <div className="widget-content">
               
               {/* --- LỌC TRẠNG THÁI --- */}
               <h4 className="filter-group-title">Trạng thái</h4>
               <ul className="filter-list">
                 <li>
                    <label className="custom-checkbox">
                        {/* Checkbox tự động tích nếu URL có ?type=hot */}
                        <input type="checkbox" checked={isHotChecked()} readOnly/> 
                        <span className="checkmark"></span> Sản phẩm Nổi bật 🔥
                    </label>
                 </li>
                 <li>
                    <label className="custom-checkbox">
                        <input type="checkbox" /> <span className="checkmark"></span> Đang giảm giá
                    </label>
                 </li>
               </ul>

               <h4 className="filter-group-title" style={{marginTop: '20px'}}>Danh mục</h4>
               <ul className="filter-list">
                 <li><label className="custom-checkbox"><input type="checkbox" checked={!regionParam && !typeParam} readOnly/> <span className="checkmark"></span> Tất cả</label></li>
                 <li><label className="custom-checkbox"><input type="checkbox" checked={isRegionChecked('bac')} readOnly/> <span className="checkmark"></span> Đặc sản miền Bắc</label></li>
                 <li><label className="custom-checkbox"><input type="checkbox" checked={isRegionChecked('trung')} readOnly/> <span className="checkmark"></span> Đặc sản miền Trung</label></li>
                 <li><label className="custom-checkbox"><input type="checkbox" checked={isRegionChecked('nam')} readOnly/> <span className="checkmark"></span> Đặc sản miền Nam</label></li>
               </ul>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="shop-toolbar">
            <h4 className="page-title">{pageTitle.toUpperCase()}</h4>
            
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
              <p style={{gridColumn: '1 / -1', textAlign: 'center', padding: '20px'}}>Không tìm thấy sản phẩm nổi bật nào.</p>
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