import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaMinus, FaPlus, FaExclamationTriangle } from 'react-icons/fa'; // Thêm icon cảnh báo

import { Products } from '../data/products.js'; 
import '../styles/cart.css';

const Cart = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    // Dữ liệu mẫu
    const [cartItems, setCartItems] = useState(() => {
        const demoIds = [1, 10]; 
        const selectedItems = Products.filter(p => demoIds.includes(p.id));
        return selectedItems.map(item => ({ ...item, quantity: 1 }));
    });

    const [note, setNote] = useState("");

    // --- STATE CHO MODAL XÓA ---
    const [showModal, setShowModal] = useState(false); // Ẩn/Hiện Modal
    const [idToDelete, setIdToDelete] = useState(null); // Lưu ID cần xóa

    // Cập nhật số lượng
    const updateQuantity = (id, type) => {
        const newCart = cartItems.map(item => {
            if (item.id === id) {
                const newQty = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
                return { ...item, quantity: newQty < 1 ? 1 : newQty };
            }
            return item;
        });
        setCartItems(newCart);
    };

    // 1. KHI BẤM NÚT X (Mở Modal)
    const handleDeleteClick = (id) => {
        setIdToDelete(id);   // Lưu lại ID món hàng muốn xóa
        setShowModal(true);  // Hiện bảng hỏi
    };

    // 2. KHI BẤM "XÓA" TRONG MODAL (Xóa thật)
    const confirmDelete = () => {
        if (idToDelete !== null) {
            setCartItems(cartItems.filter(item => item.id !== idToDelete));
            setShowModal(false); // Tắt bảng
            setIdToDelete(null); // Reset ID
        }
    };

    // 3. KHI BẤM "HỦY"
    const cancelDelete = () => {
        setShowModal(false);
        setIdToDelete(null);
    };

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const formatMoney = (n) => n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    return (
        <div className="cart-page-wrapper">
            <div className="cart-container">
                <h1 className="cart-title">GIỎ HÀNG ({cartItems.length} sản phẩm)</h1>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty" style={{width: '100px', opacity: 0.5, marginBottom: '20px'}}/>
                        <p style={{fontSize: '18px', color: '#666'}}>Chưa có sản phẩm nào trong giỏ hàng.</p>
                        <Link to="/" className="btn-continue">Quay lại cửa hàng</Link>
                    </div>
                ) : (
                    <>
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th style={{width: '45%'}}>Sản Phẩm</th>
                                    <th style={{width: '15%'}}>Giá</th>
                                    <th style={{width: '15%'}}>Số lượng</th>
                                    <th style={{width: '15%'}}>Thành tiền</th>
                                    <th style={{width: '10%'}}>Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.id}>
                                        <td data-label="Sản Phẩm">
                                            <div className="product-col">
                                                <img src={item.image} alt={item.name} />
                                                <div className="product-info-text">
                                                    <h4>{item.name}</h4>
                                                    <span style={{fontSize:'12px', color:'#888'}}>Loại: {item.category}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-label="Giá">
                                            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                                <span style={{fontWeight:'600'}}>{formatMoney(item.price)}</span>
                                                {item.oldPrice && <span style={{textDecoration:'line-through', color:'#999', fontSize:'12px'}}>{formatMoney(item.oldPrice)}</span>}
                                            </div>
                                        </td>
                                        <td data-label="Số lượng">
                                            <div className="qty-input-group">
                                                <button className="qty-btn" onClick={() => updateQuantity(item.id, 'dec')}><FaMinus size={10} /></button>
                                                <input type="text" className="qty-value" value={item.quantity} readOnly />
                                                <button className="qty-btn" onClick={() => updateQuantity(item.id, 'inc')}><FaPlus size={10} /></button>
                                            </div>
                                        </td>
                                        <td data-label="Thành tiền" style={{fontWeight: 'bold', color: '#b76d28'}}>
                                            {formatMoney(item.price * item.quantity)}
                                        </td>
                                        <td data-label="Xóa">
                                            {/* Gọi hàm mở modal thay vì xóa ngay */}
                                            <button className="remove-icon-btn" onClick={() => handleDeleteClick(item.id)}>
                                                <FaTimes />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="cart-footer">
                            <div className="cart-note-section">
                                <h5>Ghi chú đơn hàng</h5>
                                <textarea className="cart-note-input" placeholder="Ghi chú..." value={note} onChange={(e) => setNote(e.target.value)}></textarea>
                            </div>
                            <div className="cart-summary-section">
                                <div className="cart-total-row">Tổng cộng: <span className="cart-total-price">{formatMoney(total)}</span></div>
                                <div className="cart-buttons">
                                    <Link to="/" className="btn-continue">Tiếp tục xem sản phẩm</Link>
                                    <button className="btn-checkout" onClick={() => alert("Chức năng thanh toán đang cập nhật")}>Tiến hành thanh toán</button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* --- MODAL XÁC NHẬN XÓA --- */}
            {showModal && (
                <div className="delete-modal-overlay">
                    <div className="delete-modal-content">
                        <div className="modal-icon">
                            <FaExclamationTriangle />
                        </div>
                        <h3>Xác nhận xóa</h3>
                        <p>Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng không?</p>
                        <div className="modal-actions">
                            <button className="modal-btn cancel" onClick={cancelDelete}>Không</button>
                            <button className="modal-btn confirm" onClick={confirmDelete}>Xác nhận xóa</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;