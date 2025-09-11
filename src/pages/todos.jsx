import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import TodoList from "../components/TodoList";
import Footer from "../components/Footer";
import SideBar from "../components/Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';  

function TodosPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = React.useState([]);
  const [selectedListId, setSelectedListId] = React.useState(null);
     useEffect(() => {
    console.log('[TodosPage] selectedListId changed:', selectedListId);
  }, [selectedListId]);

  

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

 
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header selectedListId={selectedListId} setSelectedListId={setSelectedListId} todos={todos} />
        <div className="container-fluid flex-grow-1 d-flex p-0">
          <SideBar setSelectedListId={setSelectedListId} 
                    selectedListId={selectedListId} />
          <main className="flex-grow-1 p-4 bg-light">
            <TodoList selectedListId={selectedListId} setSelectedListId={setSelectedListId}  onChangeTodos={setTodos} />
          </main>
        </div>
        <Footer selectedListId={selectedListId} setSelectedListId={setSelectedListId} />
      </div>
    </>
  );
}

export default TodosPage;