/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Products } from '../data/products';
import '../styles/productEdit.css';
import { FaSave, FaArrowLeft, FaImage,FaFire, FaTags } from 'react-icons/fa';

const ProductEdit = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    // Tìm sản phẩm khi mới vào trang
    useEffect(() => {
        const foundProduct = Products.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            alert("Không tìm thấy sản phẩm!");
            navigate('/');
        }
    }, [id, navigate]);

    // Hàm xử lý khi gõ vào ô input và check box ( ô lựa chọn là sp ưu đãi hay đang h)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({ 
            ...product, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    

    // Hàm lưu (Giả lập)
    const handleSave = (e) => {
        e.preventDefault();
        // Ở đây  API để lưu vào Database.
        // hông báo tạm thời 
        console.log("Dữ liệu sau khi sửa:", product);
        alert("Đã lưu thông tin sản phẩm thành công! (Check Console để xem data)");
        navigate('/'); 
    };

    if (!product) return <div>Đang tải...</div>;

    return (
        <div className="admin-container">
            <div className="admin-content" style={{marginLeft: 0, width: '100%'}}>
                
                {/* Header */}
                <div className="panel-header" style={{marginBottom: '20px'}}>
                    <button className="btn-back" onClick={() => navigate('/')}>
                        <FaArrowLeft /> Quay lại
                    </button>
                    <h2>Chỉnh sửa sản phẩm #{product.id}</h2>
                </div>

                <div className="admin-panel">
                    <form onSubmit={handleSave} className="edit-form">
                        <div className="form-grid">
                            
                            {/* Cột Trái: Thông tin chung */}
                            <div className="form-column">
                                <div className="form-group">
                                    <label>Tên sản phẩm</label>
                                    <input 
                                        type="text" name="name" 
                                        value={product.name} onChange={handleChange} 
                                    />
                                </div>

                                <div className="form-row-2">
                                    <div className="form-group">
                                        <label>Giá bán (VNĐ)</label>
                                        <input 
                                            type="number" name="price" 
                                            value={product.price} onChange={handleChange} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Giá ban đầu(VNĐ)</label>
                                        <input 
                                            type="number" name="oldPrice" 
                                            value={product.oldPrice || ''} onChange={handleChange} 
                                        />
                                    </div>
                                </div>

                                {/* TRẠNG THÁI & ƯU ĐÃI --- */}


                                <div className="form-row-2">
                                    <div className="form-group">
                                        <label>Danh mục (Category)</label>
                                        <select name="category" value={product.category} onChange={handleChange}>
                                            <option value="kho">Đồ khô</option>
                                            <option value="tuoi">Đồ tươi</option>
                                            <option value="che-bien">Đồ chế biến</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Vùng miền</label>
                                        <select name="region" value={product.region} onChange={handleChange}>
                                            <option value="bac">Miền Bắc</option>
                                            <option value="trung">Miền Trung</option>
                                            <option value="nam">Miền Nam</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Mô tả chi tiết</label>
                                    <textarea 
                                        name="description" rows="5"
                                        value={product.description} onChange={handleChange}
                                    ></textarea>
                                </div>

                                                                <div className="promotion-box">
                                    <label className="section-label"><FaTags /> Trạng thái & Ưu đãi</label>
                                    <div className="promotion-grid">
                                        {/* Checkbox sản phẩm nổi bật */}
                                        <label className={`custom-toggle ${product.isHot ? 'active' : ''}`}>
                                            <input 
                                                type="checkbox" 
                                                name="isHot" 
                                                checked={product.isHot || false} 
                                                onChange={handleChange} 
                                            />
                                            <span className="toggle-icon"><FaFire /></span>
                                            <span className="toggle-text">
                                                {product.isHot ? 'Nổi bật🔥' : 'Nổi bật'}
                                            </span>
                                        </label>

                                        {/*  % Giảm giá */}
                                        <div className="discount-input-group">
                                            <span>Giảm giá:</span>
                                            <input 
                                                type="number" 
                                                name="discount" 
                                                value={product.discount || 0} 
                                                onChange={handleChange}
                                                min="0" max="100"
                                            />
                                            <span className="unit">%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            

                            {/* Cột Phải: Hình ảnh */}
                            <div className="form-column">
                                <div className="form-group">
                                    <label>Link Ảnh đại diện</label>
                                    <input 
                                        type="text" name="image" 
                                        value={product.image} onChange={handleChange} 
                                    />
                                </div>
                                <div className="image-preview">
                                    <p>Xem trước ảnh:</p>
                                    <img src={product.image} alt="Preview" 
                                         onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=No+Image'} 
                                    />
                                </div>
                                
                                {/* Demo hiển thị list ảnh con */}
                                <div className="gallery-preview">
                                    <label>Album ảnh ({product.images?.length || 0})</label>
                                    <div className="gallery-grid">
                                        {product.images?.map((img, idx) => (
                                            <img key={idx} src={img} alt="" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-cancel" onClick={() => navigate('/')}>Hủy bỏ</button>
                            <button type="submit" className="btn-save"><FaSave /> Lưu thay đổi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductEdit;