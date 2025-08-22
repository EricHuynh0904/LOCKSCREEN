import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function TodosPage() {
  const navigate = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Todos</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
     
    </div>
  );
}

export default TodosPage;