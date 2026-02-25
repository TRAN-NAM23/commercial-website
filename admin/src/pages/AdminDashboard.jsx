import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import '../styles/admin.css';
import { FaChartPie, FaBoxOpen, FaUsers, FaSignOutAlt, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

// THƯ VIỆN BIỂU ĐỒ
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Legend, BarChart, Bar , Cell
} from 'recharts';

import { Products } from '../data/products';
import { users } from '../data/user';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [adminUser] = useState('admin');
  const [listProducts, setListProducts] = useState(Products);
  const [listUsers] = useState(users);
  const navigate = useNavigate();

  // ---  DỮ LIỆU GIẢ LẬP CHO BIỂU ĐỒ ---
  
  // Data Biểu đồ Doanh thu (6 tháng đầu năm)
  const revenueData = [
    { month: 'Thg 1', revenue: 15000000, orders: 45 },
    { month: 'Thg 2', revenue: 23000000, orders: 52 },
    { month: 'Thg 3', revenue: 18500000, orders: 38 },
    { month: 'Thg 4', revenue: 32000000, orders: 65 },
    { month: 'Thg 5', revenue: 29000000, orders: 58 },
    { month: 'Thg 6', revenue: 45000000, orders: 85 },
  ];

  // Data Biểu đồ Tròn (Tỷ lệ danh mục sản phẩm)
  // Tự động tính toán từ listProducts
  const categoryData = listProducts.reduce((acc, product) => {
    const existing = acc.find(item => item.name === product.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: product.category, value: 1 });
    }
    return acc;
  }, []);

  // Màu sắc cho biểu đồ tròn
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const handleDeleteProduct = (id) => {
    if(window.confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) {
        setListProducts(listProducts.filter(p => p.id !== id));
    }
  };


  if (!adminUser) return null;

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <div className="admin-profile">
            <img src={adminUser.avatar || "https://i.pinimg.com/736x/4b/e8/7d/4be87d31be22d24ea1c4044aec5a6977.jpg"} alt="Admin" />
            <h3>Admin Control</h3>
            <p className="admin-name">Xin chào, {adminUser.fullName}</p>
        </div>
        
        <ul className="admin-menu">
            <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                <FaChartPie /> Thống kê
            </li>
            <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
                <FaBoxOpen /> Quản lý Sản phẩm
            </li>
            <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
                <FaUsers /> Quản lý Người dùng
            </li>
            <li className="logout-btn">
                <FaSignOutAlt /> Đăng xuất
            </li>
        </ul>
      </div>

      {/* CONTENT */}
      <div className="admin-content">
        
        {/* --- TAB DASHBOARD (THỐNG KÊ) --- */}
        {activeTab === 'dashboard' && (
            <div className="admin-panel">
                <h2>Tổng quan hệ thống</h2>
                
                {/* 1. CÁC THẺ CARD SỐ LIỆU */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Sản phẩm</h3>
                        <p>{listProducts.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Thành viên</h3>
                        <p>{listUsers.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Doanh thu tháng</h3>
                        <p className="highlight-text">45.000.000 ₫</p>
                    </div>
                    <div className="stat-card">
                        <h3>Đơn hàng mới</h3>
                        <p>85</p>
                    </div>
                </div>

                {/* 2. KHU VỰC BIỂU ĐỒ */}
                <div className="charts-container">
                    
                    {/* BIỂU ĐỒ 1: DOANH THU (AREA CHART) */}
                    <div className="chart-card large">
                        <h3>Biểu đồ doanh thu 6 tháng đầu năm</h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#b76d28" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#b76d28" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="month" />
                                    <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <Tooltip formatter={(value) => `${value.toLocaleString()} ₫`} />
                                    <Area type="monotone" dataKey="revenue" stroke="#b76d28" fillOpacity={1} fill="url(#colorRevenue)" name="Doanh thu" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* BIỂU ĐỒ 2: DANH MỤC (PIE CHART) */}
                    <div className="chart-card small">
                        <h3>Tỷ lệ danh mục sản phẩm</h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60} // Tạo biểu đồ Donut
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        label
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* BIỂU ĐỒ 3: SỐ ĐƠN HÀNG (BAR CHART) */}
                    <div className="chart-card full-width">
                        <h3>Số lượng đơn hàng theo tháng</h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="orders" fill="#2e7d32" name="Số đơn hàng" barSize={40} radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </div>
        )}

        {/* DANH SÁCH SẢN PHẨM */}
        {activeTab === 'products' && (
            <div className="admin-panel">
               <div className="panel-header">
                    <h2>Danh sách sản phẩm</h2>
                    {/* Gắn sự kiện chuyển trang */}
                    <button className="btn-add" onClick={() => navigate('/add')}>
                        <FaPlus /> Thêm mới
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr >
                                <th>ID</th>
                                <th>Ảnh</th>
                                <th style={{width: '30%'}}>Tên sản phẩm</th>
                                <th>Giá bán</th>
                                <th>Danh mục</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listProducts.map(product => (
                                <tr 
                            key={product.id} 
                            // 1. THÊM SỰ KIỆN CLICK VÀO HÀNG
                            onClick={() => navigate(`/product/edit/${product.id}`)}
                            style={{cursor: 'pointer'}} 
                            className="clickable-row">

                                    <td>#{product.id}</td>
                                    <td><img src={product.image} alt="" className="table-img"/></td>
                                    <td className="product-name-cell">{product.name}</td>
                                    <td>{Number(product.price).toLocaleString()} ₫</td>
                                    <td>
                                        <span className="role-badge admin" style={{background: '#fff3e0', color: '#e65100'}}>
                                            {product.category}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn-edit" title="Sửa"><FaEdit /></button>
                                        <button className="btn-delete" title="Xóa" onClick={() => handleDeleteProduct(product.id)}><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* DANH SÁCH NGƯỜI DÙNG */}
        {activeTab === 'users' && (
            <div className="admin-panel">
                <h2>Danh sách người dùng</h2>
                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên hiển thị</th>
                                <th>Email</th>
                                <th>Vai trò</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers.map(user => (
                                <tr key={user.id}>
                                    <td>#{user.id}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`role-badge ${user.role}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{color: 'green', fontWeight: 'bold', fontSize:'13px'}}>● Online</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;