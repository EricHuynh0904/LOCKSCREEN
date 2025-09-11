import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ModalAddTodo({
  show,
  onClose,
  onSave,
  todoName, setTodoName,
  todoDescription, setTodoDescription,
  todoPriority, setTodoPriority,
  todoDueDate, setTodoDueDate,
}) {
  
 const [draftName, setDraftName] = useState(todoName || '');
  const [draftDescription, setDraftDescription] = useState(todoDescription || '');
  const [draftPriority, setDraftPriority] = useState(todoPriority || 'med');
  const [draftDueDate, setDraftDueDate] = useState(todoDueDate || '');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (show) {
      setDraftName(todoName || '');
      setDraftDescription(todoDescription || '');
      setDraftPriority(todoPriority || 'med');
      setDraftDueDate(todoDueDate || '');
      setCompleted(false);
    }
  }, [show, todoName, todoDescription, todoPriority, todoDueDate]);

  if (!show) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Tạo Mới/Chỉnh Sửa Công Việc</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 text-muted" style={{ fontSize: 15 }}>
          Hoàn thành các thông tin dưới đây để quản lý công việc của bạn.
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Tiêu đề công việc</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tiêu đề công việc..."
            value={draftName}
            onChange={e => setDraftName(e.target.value)}
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Nhập mô tả"
            value={draftDescription}
            onChange={e => setDraftDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mức độ ưu tiên</Form.Label>
          <div>
            <Button
              variant={draftPriority === 'low' ? 'secondary' : 'outline-secondary'}
              className="me-2"
              onClick={() => setDraftPriority('low')}
            >
              Thấp
            </Button>
            <Button
              variant={draftPriority === 'med' ? 'secondary' : 'outline-secondary'}
              className="me-2"
              onClick={() => setDraftPriority('med')}
            >
              Trung bình
            </Button>
            <Button
              variant={draftPriority === 'high' ? 'dark' : 'outline-dark'}
              onClick={() => setDraftPriority('high')}
            >
              Cao
            </Button>
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ngày đáo hạn</Form.Label>
          <Form.Control
            type="date"
            value={draftDueDate}
            onChange={e => setDraftDueDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="completedSwitch">
            <Form.Label>Đã hoàn thành </Form.Label>
            <Form.Check
              type="switch"
              id="completedSwitch"
              checked={completed === true}
              onChange={e => setCompleted(e.target.checked)}
            />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Hủy
        </Button>
    <Button
  variant="dark"
  disabled={!draftName?.trim()}
  onClick={() => {
    const payload = {
      title: (draftName || '').trim(),
      description: (draftDescription || '').trim(),
      priority: draftPriority,
      dueDate: draftDueDate || null,

    };
    console.log('[Modal] payload:', payload);
    onSave(payload);
  }}
>
  Lưu
</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddTodo;