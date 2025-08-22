import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { register } from "../services/auth"; 
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";


function RegisterForm() {
    const [formData, setFormData]  = useState({
        name : "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState("");
      const [serverError, setServerError] = useState("");
    const onChangeHandler = (e) => {
       
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
         setError((prev) => ({ ...prev, [e.target.id]: "" }));
        setGeneralError("");
    }

    
    const onSubmitHandler = async (e) => {
       e.preventDefault();
    setLoading(true);
    setError({});
    setServerError("");
    setGeneralError("");
        const newError = {};
        if(formData.name.length == 0){
          newError.name = "Tên không được để trống";
        }
        if(formData.email.length == 0){
            newError.email = "Email không được để trống";
        }else if(!/\S+@\S+\.\S+/.test(formData.email)){
            newError.email = "Email không hợp lệ";
        }
        if(formData.password.length == 0){
            newError.password = "Mật khẩu không được để trống";
        }else if(formData.password.length < 8){
            newError.password = "Mật khẩu phải có ít nhất 8 ký tự";
        }
        if(formData.confirmPassword.length == 0){
            newError.confirmPassword = "Xác nhận mật khẩu không được để trống";
        }else if(formData.confirmPassword !== formData.password){
            newError.confirmPassword = "Xác nhận mật khẩu không khớp";
        }
        
       
        if(Object.keys(newError).length > 0){
            setError({...newError});
            return;
    }
    
    try {
 
    const res = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    
    console.log("Full response:", res);
  console.log("Response data:", res.data);

    if (res && res.id) {
  console.log("Đăng ký thành công:", res);
  navigate("/todos");
} else {
  setGeneralError("Đăng ký thất bại, không có id trả về");
}

  } catch (err) {
    if (err?.response?.status === 409) {
      setError((prev) => ({ ...prev, email: "Email đã tồn tại" }));
    } else if (err?.response?.data?.error) {
      setGeneralError(err.response.data.error);
    } else {
      setGeneralError("Đăng ký thất bại. Hãy thử lại.");
    }
  } finally {
    setLoading(false);
  }



    }
    useEffect (() => {
        console.log(formData);
    }, [formData]);

   


    return (
    <div className="container-fluid min-vh-100 bg-light">
      <div className="row justify-content-center align-items-center min-vh-100">
       
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src="https://ik.imagekit.io/tvlk/blog/2024/01/landmark-81-3-841x1024.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2"
            alt="building"
            className="img-fluid"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100vh",
              display: "block",
            }}
          />
        </div>
       
        <div className="col-md-6 bg-white d-flex flex-column justify-content-center align-items-center py-5">
          <div className="w-75" style={{ maxWidth: 400 }}>
            <div className="d-flex justify-content-center align-items-center mb-3">
              <div
                style={{
                  background: "#e0e7ff",
                  color: "#6366f1",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: 1,
                }}
              >
                KH
              </div>
            </div>
            <h5 className="mb-2 fw-bold text-center">
              Chào mừng đến với Nền Tảng Bất Động Sản!
            </h5>
            <p className="mb-4 text-muted text-center" style={{ fontSize: 15 }}>
              Hãy tạo tài khoản của bạn để bắt đầu.
            </p>
            {generalError && (
              <div className="alert alert-danger py-2">{generalError}</div>
                    )}
            {serverError && (
            <div className="alert alert-danger py-2">{serverError}</div>
              )}
            <form onSubmit={onSubmitHandler}> 
               <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  id="name"
                  placeholder="Nhập tên của bạn"
                  onChange={onChangeHandler}
                  value={formData.name}
                  
                />
              </div>
              {error.name && (<div className="text-danger mb-3">{error.name}</div>)}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  id="email"
                  placeholder="Nhập email của bạn"
                  onChange={onChangeHandler}
                  value={formData.email}
                  
                />
              </div>
              {error.email && (<div className="text-danger mb-3">{error.email}</div>)}
              <div className="mb-3">
                <label className="form-label">Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Tạo mật khẩu"
                  onChange={onChangeHandler}
                  value={formData.password}
                  
                />
              </div>
              {error.password && (<div className="text-danger mb-3">{error.password}</div>)}
              <div className="mb-3">
                <label className="form-label">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  onChange={onChangeHandler}
                  value={formData.confirmPassword}
                  
                />
              </div>
              {error.confirmPassword && (<div className="text-danger mb-3">{error.confirmPassword}</div>)}
              
              
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="terms"
                  
                />
                <label className="form-check-label" htmlFor="terms">
                  Tôi đồng ý với{" "}
                  <Link to="#">Điều khoản dịch vụ</Link> và{" "}
                  <Link to="#">Chính sách bảo mật</Link>.
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
                style={{ fontWeight: 600 }}
              
              >
                Đăng Ký
              </button>

            </form>
            <div className="text-center mb-3 text-muted" style={{ fontSize: 14 }}>
              Hoặc đăng nhập bằng
            </div>
            <div className="d-flex gap-2 mb-3">
              <button className="btn btn-outline-secondary w-50">
                <i className="bi bi-google me-2"></i>Google
              </button>
              <button className="btn btn-outline-secondary w-50">
                <i className="bi bi-facebook me-2"></i>Facebook
              </button>
            </div>
            
            <div className="text-center" style={{ fontSize: 14 }}>
              Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>

            
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;