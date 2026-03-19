import React, { useState, useEffect } from 'react';
import { validateContactForm } from '../utils/validation';

const ContactFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        mobile: initialData.mobile || '',
        address: initialData.address || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        mobile: '',
        address: ''
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "name") {
      // allow only letters and space
      updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    if (name === "mobile") {
      // allow only digits
      updatedValue = value.replace(/\D/g, "");
    }

    setFormData(prev => ({ ...prev, [name]: updatedValue }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      address: formData.address.trim()
    };

    const validationErrors = validateContactForm(cleanData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(cleanData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{initialData ? 'Edit Contact' : 'Add Contact'}</h2>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Mobile (10 digits)</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              maxLength="10"
            />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit">
              {initialData ? 'Update' : 'Add'} Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactFormModal;
