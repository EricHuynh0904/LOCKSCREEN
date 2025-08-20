import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

function LoginForm (){
    return(
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
              Hãy đăng nhập tài khoản của bạn để bắt đầu.
            </p>
            <form>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mật khẩu của bạn"
                  required
                />
              </div>
              
              
              <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
                style={{ fontWeight: 600 }}
              >
                Đăng nhập
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
              Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
            </div>
            </div>
            
          </div>
        </div>
      </div>
   
    )
}

export default LoginForm;