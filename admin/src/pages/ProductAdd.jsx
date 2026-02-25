/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Products } from '../data/products';
import '../styles/ProductAdd.css';
import { FaSave, FaArrowLeft, FaCloudUploadAlt } from 'react-icons/fa';

const ProductAdd = () => {
    const navigate = useNavigate();

    // State ban đầu rỗng
    const [product, setProduct] = useState({
        // eslint-disable-next-line react-hooks/purity
        id: Date.now(), // Tự sinh ID ngẫu nhiên
        name: '',
        price: 0,
        oldPrice: 0,
        category: 'kho',
        region: 'bac',
        image: '', // Ảnh đại diện
        images: [], // Album ảnh phụ
        description: '',
        isHot: false,
        discount: 0
    });

    //  Xử lý nhập liệu thông thường
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({ 
            ...product, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    // 2. Xử lý UPLOAD ẢNH ĐẠI DIỆN
    const handleMainImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Tạo URL tạm thời để xem trước ảnh
            const previewUrl = URL.createObjectURL(file);
            setProduct({ ...product, image: previewUrl });
        }
    };

    // 3.  UPLOAD ALBUM ẢNH (Nhiều ảnh)
    const handleGalleryUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        
        // Nối thêm vào mảng ảnh cũ
        setProduct({ 
            ...product, 
            images: [...product.images, ...newImages] 
        });
    };

    // Xóa ảnh trong album
    const removeGalleryImage = (index) => {
        const newImages = product.images.filter((_, i) => i !== index);
        setProduct({ ...product, images: newImages });
    };

    // 4. Lưu sản phẩm
    const handleSave = (e) => {
        e.preventDefault();
        
        // Validate đơn giản
        if (!product.name || !product.price) {
            alert("Vui lòng nhập tên và giá sản phẩm!");
            return;
        }

        console.log("Sản phẩm mới:", product);
        //  cần gọi API POST ở đây để lưu vào database
        
        alert("Thêm sản phẩm thành công! (Dữ liệu đã log ra Console)");
        navigate('/');
    };

    return (
        <div className="admin-container">
            <div className="admin-content" style={{marginLeft: 0, width: '100%'}}>
                
                <div className="panel-header" style={{marginBottom: '20px'}}>
                    <button className="btn-back" onClick={() => navigate('/')}>
                        <FaArrowLeft /> Quay lại
                    </button>
                    <h2>Thêm sản phẩm mới</h2>
                </div>

                <div className="admin-panel">
                    <form onSubmit={handleSave} className="edit-form">
                        <div className="form-grid">
                            
                            {/* CỘT TRÁI: THÔNG TIN */}
                            <div className="form-column">
                                <div className="form-group">
                                    {/* tên sản phẩm  */}
                                    <label>Tên sản phẩm <span style={{color:'red'}}>*</span></label>
                                    <input type="text" name="name" placeholder="Nhập tên sản phẩm..." value={product.name} onChange={handleChange} required />
                                </div>

                                <div className="form-row-2">
                                    <div className="form-group">
                                        {/* giá bán hiện tại sau khi áp dụng ưu đãi đối với  các sp có ưu đãi*/}
                                        <label>Giá bán</label>
                                        <input type="number" name="price" value={product.price} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        {/* giá bán ban đầu  */}
                                        <label>Giá ban đầu</label>
                                        <input type="number" name="oldPrice" value={product.oldPrice} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="form-row-2">
                           {/* danh mục sản phẩm  */}
                                    <div className="form-group">
                                        <label>Danh mục</label>
                                        <select name="category" value={product.category} onChange={handleChange}>
                                            <option value="kho">Đồ khô</option>
                                            <option value="tuoi">Đồ tươi</option>
                                            <option value="che-bien">Đồ chế biến</option>
                                        </select>
                                    </div>

                                    {/* sản phẩm thuộc vùng miền nào */}
                                    <div className="form-group">
                                        <label>Vùng miền</label>
                                        <select name="region" value={product.region} onChange={handleChange}>
                                            <option value="bac">Miền Bắc</option>
                                            <option value="trung">Miền Trung</option>
                                            <option value="nam">Miền Nam</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Mô tả chi tiết về sản phẩm  */}
                                <div className="form-group">
                                    <label>Mô tả chi tiết</label>
                                    <textarea name="description" rows="5" placeholder="Mô tả sản phẩm..." value={product.description} onChange={handleChange}></textarea>
                                </div>
                            </div>

                            {/* CỘT PHẢI: HÌNH ẢNH (TÍNH NĂNG MỚI) */}
                            <div className="form-column">
                                
                                {/* 1. ẢNH ĐẠI DIỆN */}
                                <div className="form-group">
                                    <label>Ảnh đại diện</label>
                                    
                                    {/* Khu vực Upload */}
                                    <div className="upload-box">
                                        <label htmlFor="main-upload" className="upload-label">
                                            <FaCloudUploadAlt size={30} />
                                            <span>Bấm để chọn ảnh</span>
                                        </label>
                                        <input 
                                            id="main-upload" 
                                            type="file" 
                                            accept="image/*" 
                                            hidden 
                                            onChange={handleMainImageUpload} 
                                        />
                                    </div>

                                    {/* Hoặc nhập link */}
                                    <input 
                                        type="text" 
                                        name="image" 
                                        placeholder="Hoặc dán link ảnh online vào đây..." 
                                        value={product.image} 
                                        onChange={handleChange} 
                                        style={{marginTop: '10px'}}
                                    />
                                </div>

                                {/* Xem trước Ảnh Đại Diện */}
                                {product.image && (
                                    <div className="image-preview">
                                        <img src={product.image} alt="Preview" />
                                    </div>
                                )}
                                
                                {/* 2. ALBUM ẢNH PHỤ */}
                                <div className="form-group" style={{marginTop: '20px'}}>
                                    <label>Album ảnh phụ</label>
                                    <div className="upload-box small">
                                        <label htmlFor="gallery-upload" className="upload-label">
                                            <FaCloudUploadAlt /> Chọn nhiều ảnh
                                        </label>
                                        <input 
                                            id="gallery-upload" 
                                            type="file" 
                                            accept="image/*" 
                                            multiple 
                                            hidden 
                                            onChange={handleGalleryUpload} 
                                        />
                                    </div>
                                    
                                    {/* Grid hiển thị album */}
                                    <div className="gallery-grid">
                                        {product.images.map((img, idx) => (
                                            <div key={idx} className="gallery-item">
                                                <img src={img} alt="" />
                                                <button 
                                                    type="button" 
                                                    className="btn-remove-img"
                                                    onClick={() => removeGalleryImage(idx)}
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard')}>Hủy bỏ</button>
                            <button type="submit" className="btn-save"><FaSave /> Lưu sản phẩm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductAdd;