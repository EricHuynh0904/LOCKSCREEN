import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ModalAddList({ show, onClose, onSave, listName, setListName }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Tạo danh sách mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Tên danh sách</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập tên danh sách..."
          value={listName}
          onChange={e => setListName(e.target.value)}
          autoFocus
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="dark" onClick={onSave}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddList;