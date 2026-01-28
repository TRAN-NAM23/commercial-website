import  { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../styles/account.css'; 
import '../../index.css'

const LogIn = () => {
        const [showPassword, setShowPassword] = useState(false);
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="login-page-wrapper">
            <div className="login-card">
                <h2 className="login-title">Đăng nhập</h2>
                
                <form>
                    <div className="login-form-group">
                        <label>Email</label>
                        <input type="text" className="login-input" placeholder="Nhập email..." required />
                    </div>

                    <div className="login-form-group">
                        <label>Mật khẩu</label>
                        <div className="password-input-wrapper">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="login-input" 
                                placeholder="Nhập mật khẩu..." 
                                required 
                            />
                            <button 
                                type="button"
                                className="toggle-password-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Checkbox nhớ mật khẩu */}
                    <div className="login-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Nhớ mật khẩu</span>
                        </label>
                        <span className="forgot-password">Quên mật khẩu?</span>
                    </div>

                    <button type="submit" className="login-btn">Đăng nhập</button>
                </form>

                <div className="login-divider">
                    <span>Hoặc đăng nhập bằng</span>
                </div>

                <div className="social-login" style={{marginTop: 0}}>
                    <button className="social-btn facebook"><FaFacebookF /> Facebook</button>
                    <button className="social-btn google"><FaGoogle /> Google</button>
                </div>

                <div className="login-redirect">
                    Bạn chưa có tài khoản? <Link to="/Register">Đăng ký ngay</Link>
                </div>
            </div>
        </div>
    );
};
export default LogIn;