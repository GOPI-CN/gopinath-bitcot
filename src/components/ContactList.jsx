import React from 'react';
import ContactItem from './ContactItem';

const ContactList = ({ contacts, onView, onEdit, onDelete }) => {
  if (!contacts || contacts.length === 0) {
    return <div className="empty-state">No contacts found.</div>;
  }

  return (
    <div className="contact-list" role="list">
      {contacts.map((contact, index) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          index={index + 1}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default React.memo(ContactList);