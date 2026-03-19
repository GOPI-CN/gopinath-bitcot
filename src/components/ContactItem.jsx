import React from 'react';

const ContactItem = ({ contact, index, onView, onEdit, onDelete }) => {

  const handleView = () => onView(contact);
  const handleEdit = () => onEdit(contact);
  const handleDelete = () => onDelete(contact.id);

  const avatarLetter =
    (contact.name || '').trim().charAt(0).toUpperCase() || '?';

  return (
    <div className="contact-item" role="listitem">
      <div className="contact-info">
        <span className="serial-number">{index}.</span>

        <div className="avatar">
          {avatarLetter}
        </div>

        <div className="details">
          <div className="name">{contact.name}</div>
          <div className="mobile">{contact.mobile}</div>
        </div>
      </div>

      <div className="actions">
        <button type="button" title="View Contact" className="btn-view" onClick={handleView}>
          View
        </button>

        <button type="button" title="Edit Contact" className="btn-edit" onClick={handleEdit}>
          Edit
        </button>

        <button type="button" title="Delete Contact" className="btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default React.memo(ContactItem);