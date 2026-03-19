import React, { useState } from 'react';
import { useContacts } from '../hooks/useContacts';
import SearchBar from '../components/SearchBar';
import ContactList from '../components/ContactList';
import ContactFormModal from '../components/ContactFormModal';
import ContactViewModal from '../components/ContactViewModal';

const ContactsPage = () => {
  const {
    filteredContacts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    addContact,
    updateContact,
    deleteContact
  } = useContacts();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

  const handleAddClick = () => {
    setSelectedContact(null);
    setModalMode('add');
    setIsFormModalOpen(true);
  };

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
    setModalMode('edit');
    setIsFormModalOpen(true);
  };

  const handleViewClick = (contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      deleteContact(id);
    }
  };

  const handleFormSubmit = (formData) => {
    if (modalMode === 'add') {
      addContact(formData);
    } else {
      updateContact({ ...formData, id: selectedContact.id });
    }
  };

  return (
    <div className="contacts-page">
      <header className="page-header">
        <h1>Contact Management</h1>
        <button className="btn-add" onClick={handleAddClick}>
          + Add Contact
        </button>
      </header>

      <div className="controls-section">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      <main className="main-content">
        {error && <div className="error-message">Error: {error}</div>}
        
        {loading ? (
          <div className="loading-message">Loading contacts...</div>
        ) : (
          <ContactList 
            contacts={filteredContacts} 
            onView={handleViewClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        )}
      </main>

      <ContactFormModal 
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={modalMode === 'edit' ? selectedContact : null}
      />

      <ContactViewModal 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        contact={selectedContact}
      />
    </div>
  );
};

export default ContactsPage;
