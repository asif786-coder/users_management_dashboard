import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchUsers } from './services/api';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response.data);
    } catch (err) {
      setError('Failed to load users. Please try again later.');
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="app">
      <h1>User Management Dashboard</h1>
      {error && <p className="error">{error}</p>}
      <button onClick={() => setIsFormOpen(true)}>Add User</button>
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
      {isFormOpen && (
        <UserForm
          user={selectedUser}
          onClose={handleFormClose}
          refreshUsers={loadUsers}
        />
      )}
    </div>
  );
};

export default App;
