import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo, getTodos } from '../services/todo';
import ModalConfirmDelete from './ModalConfirmDelete';
import ModalAddTodo from './ModalAddTodo';
import {Toast} from 'bootstrap';



function Todo({ id, listId, name, completed, priority = "med", dueDate, onDeleted }) {

  const [showDelete, setShowDelete] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [todoName, setTodoName] = useState(name || "");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoDueDate, setTodoDueDate] = useState(dueDate || "");
  const [todoPriority, setTodoPriority] = useState(priority || "med");
  const [error, setError] = useState('');
  const [isCompleted, setIsCompleted] = useState(!!completed);
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [todoLists, setTodoLists] = useState([]);
  const dispatch = useDispatch();

  const norm = s => (s||'').trim().toLowerCase();
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success");
  const toastRef = React.useRef(null);
  const bsToastRef = React.useRef(null);

    React.useEffect(() => {
    if (toastRef.current && !bsToastRef.current) {
      bsToastRef.current = new Toast(toastRef.current, { delay: 3000, autohide: true });
    }
  }, []);

      const showToast = (msg, type = "success") => {
        setToastMsg(msg);
        setToastType(type);
  
        setTimeout(() => bsToastRef.current?.show(), 0);
    }
  

  const getPriorityLabel = (priority) => {
    if (priority === "high")
      return <span className="badge rounded-pill" style={{ background: "#FFD6DA", color: "#E65060" }}>Cao</span>;
    if (priority === "med")
      return <span className="badge rounded-pill" style={{ background: "#FFF3CD", color: "#B68900" }}>Trung bình</span>;
    return <span className="badge rounded-pill" style={{ background: "#D1FADF", color: "#12B76A" }}>Thấp</span>;
  };

    const handleShowRename = (id, oldName, oldDescription, oldDueDate, oldPriority) => {
    setEditMode(true);
    setEditTodoId(id);
    setTodoName(oldName);
    setTodoDescription(oldDescription);
    setTodoDueDate(oldDueDate);
    setTodoPriority(oldPriority);
    setShowEdit(true);
  };


   const handleClose = () => {
    setShowEdit(false);
    setError("");
  };

  const handleToggleCompleted = async (e) => {
    const next = e.target.checked;
    setIsCompleted(next); 
    try {
      await updateTodo(id, { completed: next }); 
    } catch (err) {
      console.error('[Todo] toggle completed failed', err);
      setIsCompleted(!next); 
    }
  };

  const handleRename = async (body) => {
    const inputTitle = (body?.title ?? todoName ?? '').trim();
    const payload = {
      title: inputTitle,
      description: body?.description ?? todoDescription ?? '',
      priority: body?.priority ?? todoPriority ?? 'med',
      dueDate: body?.dueDate ?? (todoDueDate || null),
    };

    if (!payload?.title?.trim()) { setError('Vui lòng nhập tiêu đề!'); return; }
    if (!editTodoId) { setError('Không tìm thấy Todo để cập nhật!'); return; }


    let source = [];
    try {
      const res = await getTodos(Number(listId));
      const data = res?.data ?? res;
      if (Array.isArray(data)) source = data;
    } catch { /* BỎ */ }

    const titleNorm = norm(payload.title);
    const isDup = source.some(
      t => t && norm(t.title ?? t.name) === titleNorm && t.id !== editTodoId
    );
    if (isDup) {
      showToast("Tên công việc đã tồn tại!", "danger");
      return;
    }

    try {
      const res = await updateTodo(editTodoId, payload);
      const updated = res?.data ?? res;

      window.dispatchEvent(new CustomEvent('todo:updated', {
        detail: { id: editTodoId, todo: updated }
      }));

      setTodoName(updated.title);
      setTodoDescription(updated.description || "");
      setTodoDueDate(updated.dueDate || "");
      setTodoPriority(updated.priority || "med");
      handleClose();
    } catch (err) {
      console.error('[Todo] API ERR:', err?.response?.status, err?.response?.data || err.message);
      setError(err?.response?.data?.message || 'Có lỗi khi cập nhật Todo!');
    }
  };

    const handleDelete = async (id) => {
      try {
        await deleteTodo(id);
        setTodoLists(prev => prev.filter(x => x?.id !== id));
        if (onDeleted) onDeleted(id);

      } catch (err) {
        console.error(err);
        setError("Có lỗi khi xóa danh sách!");
      }
    };
  
  return (
    <>
      <li
        className="list-group-item bg-white d-flex align-items-center mb-3 rounded-3"
      >
        <input
          type="checkbox"
          className="form-check-input ms-3"
          checked={isCompleted}
          onChange={handleToggleCompleted}
         
          style={{ width: 20, height: 20, accentColor: "#344054" }}
        />

        <span
          className="flex-grow-1"
          style={{
            marginLeft: 20,
            textDecoration: isCompleted ? "line-through" : "none",
            opacity: isCompleted ? 0.5 : 1,
            fontSize: 18,
          }}
        >
          {todoName}
        </span>

        <div className="d-flex align-items-center gap-2">
          {getPriorityLabel(priority)}
          <span className="text-secondary ms-2" style={{ fontSize: 15 }}>
            <i className="bi bi-calendar-event" /> {dueDate}
          </span>
          <button
                    className="bg-white"
                    onClick={e => {
                      e.stopPropagation();
                      handleShowRename(id, todoName, todoDescription, todoDueDate, todoPriority);
                    }}
          >
            {renaming
              ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              : <i className="bi bi-pencil" />
            }
          </button>
          <button
            className="btn btn-outline-danger px-2 btn-sm"
            onClick={() => setShowDelete(true)}
          >
            <i className="bi bi-trash" style={{ fontSize: 18 }} />
          </button>
        </div>
      </li>
      <ModalConfirmDelete
        show={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => handleDelete(id)}
      />

      <ModalAddTodo
        show={showEdit}
        onClose={handleClose}
        onSave={handleRename}
        todoName={todoName} setTodoName={setTodoName}
        todoDescription={todoDescription} setTodoDescription={setTodoDescription}
        todoDueDate={todoDueDate} setTodoDueDate={setTodoDueDate}
        todoPriority={todoPriority} setTodoPriority={setTodoPriority}
      />

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
    </>
  );
}

export default Todo;