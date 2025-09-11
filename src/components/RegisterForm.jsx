import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { register } from "../services/auth"; 
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Toast as BsToast } from "bootstrap";



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



    const toastRef = useRef(null);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success"); 
  const toastInstRef = useRef(null);


  useEffect(() => {
    if (toastRef.current && !toastInstRef.current) {
      toastInstRef.current = new BsToast(toastRef.current, { delay: 2000, autohide: true });
    }
  }, []);

  const showToast = (msg, type = "success") => {
    setToastMsg(msg);
    setToastType(type);
    
    setTimeout(() => toastInstRef.current?.show(), 0);
  };


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
          showToast("Đăng ký thất bại", "danger");
          newError.name = "Tên không được để trống";
        }
        if(formData.email.length == 0){
            showToast("Đăng ký thất bại", "danger");
            newError.email = "Email không được để trống";
        }else if(!/\S+@\S+\.\S+/.test(formData.email)){
            showToast("Đăng ký thất bại", "danger");
            newError.email = "Email không hợp lệ";
        }
        if(formData.password.length == 0){
            showToast("Đăng ký thất bại", "danger");
            newError.password = "Mật khẩu không được để trống";
        }else if(formData.password.length < 8){
            showToast("Đăng ký thất bại", "danger");
            newError.password = "Mật khẩu phải có ít nhất 8 ký tự";
        }
        if(formData.confirmPassword.length == 0){
            showToast("Đăng ký thất bại", "danger");
            newError.confirmPassword = "Xác nhận mật khẩu không được để trống";
        }else if(formData.confirmPassword !== formData.password){
            showToast("Đăng ký thất bại", "danger");
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
   navigate("/login", {
    replace: true,
    state: { toast: { type: "success", msg: "Đăng ký thành công! Vui lòng đăng nhập." } }
  });
} else {

  setGeneralError("Đăng ký thất bại, không có id trả về");
  showToast("Đăng ký thất bại, không có id trả về", "danger");
}

  } catch (err) {
    if (err?.response?.status === 409) {
      showToast("Email đã tồn tại", "danger");
      setError((prev) => ({ ...prev, email: "Email đã tồn tại" }));
    } else if (err?.response?.data?.error) {

      setGeneralError(err.response.data.error);
    } else {
      showToast("Đăng ký thất bại. Hãy thử lại.", "danger");
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
              Tạo tài khoản
            </h5>
            <p className="mb-4 text-muted text-center" style={{ fontSize: 15 }}>
              Chào mừng bạn đến với TodoFlow! Hãy tạo tài khoản để bắt đầu quản lý công việc của mình.
            </p>
            {generalError && (
              <div className="alert alert-danger py-2">{generalError}</div>
                    )}
            {serverError && (
            <div className="alert alert-danger py-2">{serverError}</div>
              )}
            <form onSubmit={onSubmitHandler}> 
               <div className="mb-3">
                <label className="form-label"> <strong>Tên của bạn</strong></label>
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
                <label className="form-label"><strong>Email</strong></label>
                <input
                  className="form-control"
                  id="email"
                  placeholder="nhap.email@example.com"
                  onChange={onChangeHandler}
                  value={formData.email}
                  
                />
              </div>
              {error.email && (<div className="text-danger mb-3">{error.email}</div>)}
              <div className="mb-3">
                <label className="form-label"><strong>Mật Khẩu</strong></label>
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
                <label className="form-label"><strong>Xác nhận mật khẩu</strong></label>
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
                className="btn btn-dark w-100 mb-3"
                style={{ fontWeight: 600 }}
              
              >
                Tạo tài khoản
              </button>

            </form>
           
           
            <div className="text-center" style={{ fontSize: 14 }}>
              Đã có tài khoản? <Link to="/login" className="text-black"><strong>Đăng nhập</strong></Link>

            
              
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
  );
}

export default RegisterForm;