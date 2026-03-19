import { useState, useEffect, useMemo, useCallback } from 'react';

const API_URL = 'https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json';

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Map API data to ensure all required fields exist (e.g. address)
      const mappedData = data.map(contact => ({
        id: contact.id,
        name: contact.name || '',
        mobile: contact.mobile || '',
        email: contact.email || '',
        address: contact.address || ''
      }));

      setContacts(mappedData);
    } catch (e) {
      setError(e.message || 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const addContact = useCallback((newContactData) => {
    const newContact = {
      id: Date.now(),
      name: newContactData.name.trim(),
      mobile: newContactData.mobile.trim(),
      email: newContactData.email.trim(),
      address: newContactData.address?.trim() || ''
    };
    setContacts(prev => [...prev, newContact]);
  }, []);

  const updateContact = useCallback((updatedContact) => {
    setContacts(prev => prev.map(contact =>
      contact.id === updatedContact.id
        ? { ...contact, ...updatedContact }
        : contact
    ));
  }, []);

  const deleteContact = useCallback((id) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  }, []);

  const filteredContacts = useMemo(() => {
    if (!searchTerm.trim()) return contacts;

    const lowercasedTerm = searchTerm.toLowerCase();
    return contacts.filter(contact => {
      const matchName = contact.name.toLowerCase().includes(lowercasedTerm);
      const matchMobile = String(contact.mobile).includes(searchTerm);
      return matchName || matchMobile;
    });
  }, [contacts, searchTerm]);

  return {
    contacts,
    filteredContacts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    addContact,
    updateContact,
    deleteContact,
    refreshContacts: fetchContacts
  };
};
