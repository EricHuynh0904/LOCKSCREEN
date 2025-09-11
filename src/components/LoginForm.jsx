import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth"; 
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { Toast as BsToast } from "bootstrap";



function LoginForm (){
      const [formData, setFormData]  = useState({
              
              email: "",
              password: "",
             
          })
      
          const [error, setError] = useState({
              
              email: "",
              password: "",
              
          });
      
          const navigate = useNavigate();
          const [loading, setLoading] = useState(false);
          const [generalError, setGeneralError] = useState("");
            const [serverError, setServerError] = useState("");



            const location = useLocation();
  const toastRef = useRef(null);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success");
  const [bsToast, setBsToast] = useState(null);

  useEffect(() => {
    if (toastRef.current && !bsToast) {
      setBsToast(new BsToast(toastRef.current, { delay: 2000, autohide: true }));
    }
  }, [bsToast]);

  // Nhận message từ Register và bật toast
 useEffect(() => {
    const t = location.state?.toast;
    if (t?.msg) {
      setToastMsg(t.msg);
      setToastType(t.type || "success");
      setTimeout(() => bsToast?.show(), 0);
      // Xóa state để F5/back không hiện lại
      navigate(".", { replace: true, state: {} });
    }
  }, [location.state, bsToast, navigate]);


          const handleChange = (e) => {
             
              setFormData({
                  ...formData,
                  [e.target.id]: e.target.value
              });
               setError((prev) => ({ ...prev, [e.target.id]: "" }));
              setGeneralError("");
          }
      
          const showToast = (msg, type = "success") => {  
    setToastMsg(msg);
    setToastType(type);
    
    setTimeout(() => bsToast?.show(), 0);
  }
          

  const handleSubmit = async (e) => {
   e.preventDefault();
    setLoading(true);
    setError({});
    setServerError("");
    setGeneralError("");
        const newError = {};
  if (!/\S+@\S+\.\S+/.test(formData.email)) {
    showToast("Đăng nhập thất bại", "danger");
    newError.email = "Email không hợp lệ";
  } else if (formData.email.length == 0) {
    showToast("Đăng nhập thất bại", "danger");
    newError.email = "Email không được để trống";
    
  }
  if (formData.password.length == 0) {
    showToast("Đăng nhập thất bại", "danger");
    newError.password = "Mật khẩu không được để trống";
    
  }
  setLoading(true);
  setError(newError);
  if (Object.keys(newError).length > 0) {
    setLoading(false);
    return;
  }
  try {
    const res = await login({
  email: formData.email,
  password: formData.password,
});


const token = res?.access_token;

if (token) {
  localStorage.setItem("token", String(token));
   navigate("/todos");
} else {
  setGeneralError("Đăng nhập thất bại. Không nhận được token/id.");
}

  } catch (err) {
    if (err?.response?.status === 401) {
      showToast("Mật khẩu/Email không đúng", "danger");
      setError("Email hoặc mật khẩu không đúng.");
    } else {
      showToast("Mật khẩu/Email không đúng", "danger");
      setError("Đăng nhập thất bại. Hãy thử lại.");
    }
  } finally {
    setLoading(false);
  }


  };


   useEffect (() => {
          console.log(formData);
      }, [formData]);



    return(
        <div className="container-fluid min-vh-100 bg-light">
      <div className="row justify-content-center align-items-center min-vh-100">
       
        
       
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
              Đăng Nhập
            </h5>
           
          
            <form onSubmit={handleSubmit}>
  
  <div className="mb-3">
    <label className="form-label"><strong>Email</strong></label>
    <input
      className="form-control"
      name="email"
      id="email"
      placeholder="Nhập email của bạn"
      value={formData.email}
      onChange={handleChange}
      
    />
  </div>
  {error.email && (<div className="text-danger mb-3">{error.email}</div>)}
  <div className="mb-3">
    <label className="form-label"><strong>Mật khẩu</strong></label>
    <input
      type="password"
      className="form-control"
      name="password"
      id="password"
      placeholder="Mật khẩu của bạn"
      value={formData.password}
      onChange={handleChange}
      
    />
  </div>
  {error.password && (<div className="text-danger mb-3">{error.password}</div>)}

              <button
                type="submit"
                className="btn btn-dark w-100 mb-3"
                style={{ fontWeight: 600 }}
              >
                Đăng nhập
              </button>
            </form>
           
            <div className="text-center" style={{ fontSize: 14 }}>
              Chưa có tài khoản? <Link to="/register" className="text-dark"><strong>Tạo tài khoản</strong></Link>
            </div>
            </div>
            
          </div>
        </div>

        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1080 }}>
        <div
          ref={toastRef}
          className={`toast align-items-center text-bg-${toastType} border-0`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{toastMsg}</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>

      </div>
   
    )
}

export default LoginForm;