import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../styles/account.css';
import '../../index.css'

const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const [password, setPassword] = useState('');
    const [passError, setPassError] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmError, setConfirmError] = useState('');

    //KIỂM TRA MẬT KẨU
    const validatePassword = (value) => {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})");
        if (!value) { setPassError(""); 
            return false;
        }
        if (!strongRegex.test(value)) {
            setPassError("Mật khẩu phải có ít nhất 8 ký tự gồm A-Z, a-z, 0-9, !@#$...");
            return false;
        } else {setPassError("");
            return true;
        }
    };

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);       // Cập nhật giá trị
        validatePassword(val);  // Kiểm tra ngay lập tức
    };

    // HÀM KIỂM TRẢ ĐÃ KHỚP MẬT KHẨU CHƯA
    const validateConfirmPassword = (pass, confirmPass) => {
        if (confirmPass && pass !== confirmPass) {
            setConfirmError("Mật khẩu nhập lại không khớp.");
            return false;
        }
        setConfirmError("");
        return true;
    };
    const handleConfirmPasswordChange = (e) => {
        const val = e.target.value;
        setConfirmPassword(val);
        validateConfirmPassword(password, val);
    };

    const handleRegister = (e) => {
       e.preventDefault(); 
        const isPassValid = validatePassword(password);
        const isConfirmValid = validateConfirmPassword(password, confirmPassword);
        if (!isPassValid || !isConfirmValid) {
            return; // Chặn nếu có lỗi
        }
        alert("Đăng ký thành công!");
    };


    
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="register-page-wrapper">
            <div className="register-card">
                <h2 className="register-title">Đăng ký tài khoản</h2>
                
                <form onSubmit={handleRegister}>
                    <div className="name-row">
                        <div className="register-form-group">
                            <label>Tên</label>
                            <input type="text" className="register-input" placeholder="Tên" required />
                        </div>
                        <div className="register-form-group">
                            <label>Họ</label>
                            <input type="text" className="register-input" placeholder="Họ" required />
                        </div>
                    </div>

                    <div className="register-form-group">
                        <label>Email</label>
                        <input type="email" className="register-input" placeholder="Nhập email..." required />
                    </div>

                    <div className="register-form-group">
                        <label>Mật khẩu</label>
                        <div className="password-input-wrapper">
                            <input 
                                type={showPass ? "text" : "password"} 
                                className={`register-input ${passError ? 'input-error' : ''}`}
                                placeholder="Mật khẩu" 
                                required 
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <button 
                                type="button"
                                className="toggle-password-btn"
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {passError && <span className="error-message">{passError}</span>}
                    </div>

                <div className="register-form-group">
                        <label>Nhập lại mật khẩu</label>
                        <div className="password-input-wrapper">
                            <input 
                                type={showConfirmPass ? "text" : "password"} 
                                className={`register-input ${confirmError ? 'input-error' : ''}`}
                                placeholder="Nhập lại mật khẩu" 
                                required 
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            <button 
                                type="button"
                                className="toggle-password-btn"
                                onClick={() => setShowConfirmPass(!showConfirmPass)} >
                                {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    {confirmError && <span className="error-message">{confirmError}</span>}
                </div>

                    <button type="submit" className="register-btn">Đăng ký</button>
                </form>

                <div className="register-divider">
                    <span>Hoặc đăng nhập bằng</span>
                </div>

                <div className="social-login" style={{marginTop: 0}}>
                    <button className="social-btn facebook"><FaFacebookF /> Facebook</button>
                    <button className="social-btn google"><FaGoogle /> Google</button>
                </div>

                <div className="register-redirect">
                    Bạn đã có tài khoản? <Link to="/LogIn">Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
};
export default Register;