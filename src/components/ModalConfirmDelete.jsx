import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalConfirmDelete({ show, onClose, onConfirm }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Xóa mục này?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="text-secondary">Hành động này không thể hoàn tác.</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirmDelete;