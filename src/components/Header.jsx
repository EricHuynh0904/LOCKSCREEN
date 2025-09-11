import React, { useState } from 'react';
import ModalAddTodo from './ModalAddTodo';
import { createTodoInList, getTodos } from '../services/todo';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef } from 'react';
import {Toast} from 'bootstrap';


function Header({ selectedListId, todos = [] }) {
  const [show, setShow] = useState(false);
  const [todoName, setTodoName] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todoDueDate, setTodoDueDate] = useState('');
  const [todoPriority, setTodoPriority] = useState('med');
  const [error, setError] = useState('');
  

  
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success");
  const toastRef = React.useRef(null);
  const bsToastRef = React.useRef(null);
  const norm = s => (s||'').trim().toLowerCase();

    useEffect(() => {
    if (toastRef.current && !bsToastRef.current) {
      bsToastRef.current = new Toast(toastRef.current, { delay: 3000, autohide: true });
    }
  }, []); 
  
      const showToast = (msg, type = "success") => {
        setToastMsg(msg);
        setToastType(type);
  
        setTimeout(() => bsToastRef.current?.show(), 0);
    };


  const handleClose = () => {
    setShow(false);
    setTodoName('');
    setTodoDescription('');
    setTodoDueDate('');
    setTodoPriority('med');
    setError('');
  };

   const handleSave = async (body) => {
    if (!selectedListId) { 
      setError("Vui lòng chọn danh sách!");
      showToast("Vui lòng chọn danh sách!", "danger");
      return; 
    }

    const inputTitle = (body?.title ?? todoName ?? '').trim();
    if (!inputTitle) { setError("Tên không được để trống!"); return; }
    const titleNorm = norm(inputTitle);

    
    let source = Array.isArray(todos) ? todos : [];
    try {
      const res = await getTodos(Number(selectedListId));
      const data = res?.data ?? res;
      if (Array.isArray(data)) source = data;
    } catch { /* ignore */ }

    const isDup = source.some(t => t && norm(t.title ?? t.name) === titleNorm);
    if (isDup) {
      showToast("Tên công việc đã tồn tại!", "danger");
      
      return;
    }

  

       try {
      const payload = { ...body, title: inputTitle };
      const res = await createTodoInList(Number(selectedListId), payload);
      const created = res?.data ?? res;

      window.dispatchEvent(new CustomEvent('todo:created', {
        detail: { listId: Number(selectedListId), todo: created }
      }));

      handleClose();
    } catch (err) {
      const status = err?.response?.status || err?.status;
      if (status === 409) {
      
        showToast("Tên công việc đã tồn tại!", "danger");
      } else {
        setError(err?.response?.data?.message || 'Có lỗi khi lưu Todo!');
        showToast("Có lỗi khi lưu Todo!", "danger");
      }
    }
  };


  return (
    <header className="p-3 mb-3 border-bottom bg-light">
      <div className="container d-flex align-items-center justify-content-between">
        <strong className="fs-4">Todo App</strong>
        <div className="d-flex align-items-center flex-grow-1 mx-4" style={{ maxWidth: 400 }}>
          <input
            className="form-control  px-4 "
            type="search"
            placeholder="Tìm kiếm công việc..."
            aria-label="Search"
          />
        </div>
        <button className="btn btn-dark px-4 me-5" onClick={() => setShow(true)}>
          + Công việc mới
        </button>
      </div>

      <ModalAddTodo
        show={show}
        onClose={handleClose}
        onSave={handleSave}
        todoName={todoName} setTodoName={setTodoName}
        todoDescription={todoDescription} setTodoDescription={setTodoDescription}
        todoDueDate={todoDueDate} setTodoDueDate={setTodoDueDate}
        todoPriority={todoPriority} setTodoPriority={setTodoPriority}
      />
      {error && <div className="text-danger mt-2 ms-3">{error}</div>}

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
      
    </header>
  );
}
export default Header;