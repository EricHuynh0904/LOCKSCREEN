import ModalAddList from "./ModalAddList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { createTodoList, renameTodoList, deleteTodoList, getTodoLists }from "../services/todoList";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {Toast} from 'bootstrap';


function SideBar({ selectedListId, setSelectedListId }) {

  const [show, setShow] = useState(false);
  const [listName, setListName] = useState("");
  const [todoLists, setTodoLists] = useState([]);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editListId, setEditListId] = useState(null);
  


  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success");
  const toastRef = useRef(null);
  const bsToastRef = useRef(null);
  const norm = s => (s||'').trim().toLowerCase();
  const dispatch = useDispatch();

  const STORAGE_KEY = "todoLists";

  useEffect(() => {
    const saved = Number(localStorage.getItem(STORAGE_KEY) || '');
    if (saved) setSelectedListId?.(saved);
  }, [setSelectedListId]);

    useEffect(() => {
    if (selectedListId == null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, String(selectedListId));
  }, [selectedListId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getTodoLists();
        const data = res?.data ?? res;
        const lists = Array.isArray(data) ? data : [];
        if (cancelled) return;
        setTodoLists(lists);

        
        const saved = Number(localStorage.getItem(STORAGE_KEY) || '');
        const current = Number(selectedListId ?? saved);
        if (current && lists.some(l => Number(l.id) === current)) {
          setSelectedListId?.(current);
        } else {
          setSelectedListId?.(lists[0]?.id ?? null);
        }
      } catch (e) {
        console.error(e);
        setError("Có lỗi khi tải danh sách!");
      }
    })();
    return () => { cancelled = true; };
  }, [setSelectedListId]);




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
    setListName("");
    setEditMode(false);
    setEditListId(null);
    setError("");
  };

  const handleShow = () => {
    setEditMode(false);
    setListName("");
    setShow(true);
  };

  const handleShowRename = (id, oldName) => {
    setEditMode(true);
    setEditListId(id);
    setListName(oldName);
    setShow(true);
  };

  const handleSave = async () => {
    const name = (listName || "").trim();
    if (!name) { setError("Tên không được để trống!"); return; }

  
    const isDup = (Array.isArray(todoLists) ? todoLists : [])
      .some(l => l && norm(l.name) === norm(name) && (!editMode || l.id !== editListId));
    if (isDup) {
      setError("Tên danh sách đã tồn tại!");
      showToast("Tên danh sách đã tồn tại!", "danger");
      return;
    }
    try {
      if (editMode) {
        const updated = await renameTodoList(editListId, { name: listName });
        if (updated?.id) {
          setTodoLists(prev => prev.map(x => (x.id === updated.id ? { ...x, ...updated } : x)));
        } else {
          setTodoLists(prev => prev.map(x => (x.id === editListId ? { ...x, name: listName } : x)));
        }
      } else {
        const created = await createTodoList({ name: listName });
        if (created?.id) {
          setTodoLists(prev => [created, ...prev]);
          setSelectedListId?.(created.id);
        }
      }
      handleClose();
    } catch (err) {
      console.error(err);
      setError("Có lỗi khi lưu danh sách!");
    }
  };


  const handleDelete = async (id) => {
    try {
      await deleteTodoList(id);
      setTodoLists(prev => prev.filter(x => x?.id !== id));
      if (selectedListId === id) setSelectedListId?.(null);
    } catch (err) {
      console.error(err);
      setError("Có lỗi khi xóa danh sách!");
    }
  };



  console.log("todoLists (local):", todoLists);

  return (
    <div className="flex-shrink-0 p-3 bg-white" style={{ width: 280 }}>
      <a
        href="/"
        className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
      >
        <svg className="bi me-2" width="30" height="24">
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="fs-5 fw-semibold">Danh sách của bạn</span>
      </a>

      <ul className="list-unstyled ps-0">
        {(Array.isArray(todoLists) ? todoLists : [])
          .filter(list => list && list.id)
          .map(list => (
            <li
              className={`mb-1 ${selectedListId === list.id ? "bg-light" : ""}`}
              key={list.id}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedListId(list.id)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span className="ms-5">{list.name}</span>
                <div>
                  <button
                    className="bg-white"
                    onClick={e => {
                      e.stopPropagation();
                      handleShowRename(list.id, list.name);
                    }}
                  >
                    Đổi tên
                  </button>
                  <button
                    className="bg-white"
                    onClick={e => {
                      e.stopPropagation();
                      handleDelete(list.id);
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </li>
          ))}
        <li className="border-top my-3" />
        <li className="mb-1">
          <button className="btn btn shadow-sm addTodo ms-5" onClick={handleShow}>
            + Danh sách mới
          </button>
        </li>
      </ul>

      <ModalAddList
        show={show}
        onClose={handleClose}
        onSave={handleSave}
        listName={listName}
        setListName={setListName}
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
    
    </div>

    
  );
}

export default SideBar;