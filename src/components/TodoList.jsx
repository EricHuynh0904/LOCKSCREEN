import React, { useEffect, useState, useCallback, use } from 'react';
import { getTodos } from '../services/todo';
import Todo from './Todo';

const TodoList = ({ selectedListId, onChangeTodos }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success");
  const [items, setItems] = useState([]); 
  const toastRef = React.useRef(null);
  const bsToastRef = React.useRef(null);


  useEffect(() => {
    if (!selectedListId) { setItems([]); onChangeTodos?.([]); return; }
    (async () => {
      const res = await getTodos(Number(selectedListId));
      const data = res?.data ?? res;
      const arr = Array.isArray(data) ? data : [];
      setItems(arr);
      onChangeTodos?.(arr); 
    })().catch(() => { setItems([]); onChangeTodos?.([]); });
  }, [selectedListId, onChangeTodos]);


  const fetchTodos = useCallback(async () => {
    if (!selectedListId) { setTodos([]); return; }
    try {
      setLoading(true);
      const response = await getTodos(Number(selectedListId));
      const data = response?.data ?? response;
      setTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách todo:', error?.response?.data || error.message);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }, [selectedListId]);

  useEffect(() => { fetchTodos(); }, [fetchTodos]);


  useEffect(() => {
    const onCreated = (e) => {
      const { listId } = e.detail || {};
      if (Number(selectedListId) === Number(listId)) {
        fetchTodos();
      }
    };

    
    
    window.addEventListener('todo:created', onCreated);
    return () => window.removeEventListener('todo:created', onCreated);
  }, [selectedListId, fetchTodos]);

  useEffect(() => {
    const onUpdated = (e) => {
      const { id, todo } = e.detail || {};
      if (Number(selectedListId) === Number(todo.listId)) {
        setTodos((prev) => prev.map((t) => (t.id === id ? todo : t)));
      }
    };

    window.addEventListener('todo:updated', onUpdated);
    return () => window.removeEventListener('todo:updated', onUpdated);
  }, [selectedListId]);

  if (!selectedListId) return <div className="p-3 text-secondary">Chọn danh sách để xem công việc.</div>;
  if (loading) return <div className="p-3">Đang tải danh sách...</div>;

  return (
  <ul className="list-unstyled p-3">
    {todos.map((todo) => (
      <Todo
        key={todo.id}
        id={todo.id}
        listId={todo.listId ?? todo.list_id}
        name={todo.title ?? todo.name}
        completed={todo.is_completed ?? todo.completed ?? false}
        priority={todo.priority}
        dueDate={todo.dueDate ?? todo.due_date ?? ''}
        onDeleted={(deletedId) =>
          setTodos(prev => prev.filter(t => Number(t.id) !== Number(deletedId)))
        }
      />
      
    ))}
    {todos.length === 0 && <li className="text-secondary">Chưa có việc nào.</li>}

    
    
  

  </ul>
);
};
export default TodoList;