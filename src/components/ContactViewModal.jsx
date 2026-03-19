import React from 'react';

const ContactViewModal = ({ isOpen, onClose, contact }) => {
  if (!isOpen || !contact) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content view-modal">
        <div className="modal-header">
          <h2>Contact Details</h2>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>
        <div className="contact-details">
          <div className="detail-row">
            <strong>Name:</strong>
            <span>{contact.name || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <strong>Email:</strong>
            <span>{contact.email || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <strong>Mobile:</strong>
            <span>{contact.mobile || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <strong>Address:</strong>
            <span>{contact.address || 'N/A'}</span>
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ContactViewModal;
