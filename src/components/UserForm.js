import React, { useState } from 'react';
import { addUser, editUser } from '../services/api';

const UserForm = ({ user, onClose, refreshUsers }) => {
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    department: user?.company?.name || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      id: user?.id || null,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      company: { name: formData.department },
    };

    try {
      if (user) {
        await editUser(user.id, newUser);
      } else {
        await addUser(newUser);
      }
      refreshUsers();
      onClose();
    } catch (error) {
      alert('Error saving user. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>{user ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Department:
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserForm;
