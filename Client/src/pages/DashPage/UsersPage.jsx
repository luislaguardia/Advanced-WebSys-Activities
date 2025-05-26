import React, { useEffect, useState } from 'react';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../../services/UserService';
import '../../styles/UsersPage.css';

import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    type: 'editor',
    username: '',
    password: '',
    address: '',
    isActive: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem('type');
    if (userType !== 'admin') {
      alert('Access denied. Only admins can view this page.');
      navigate('/dashboard');
    } else {
      fetchUsers(); // 
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateUser(editingId, formData);
      } else {
        await createUser(formData);
      }
      setShowModal(false);
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  const openEditModal = (user) => {
    setFormData(user);
    setEditingId(user._id);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      contactNumber: '',
      email: '',
      type: 'editor',
      username: '',
      password: '',
      address: '',
      isActive: true,
    });
    setEditingId(null);
    setShowModal(true);
  };

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      u.firstName.toLowerCase().includes(term) ||
      u.lastName.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.type.toLowerCase().includes(term)
    );
  });

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>User Management</h2>
        <button onClick={openCreateModal} className="add-user-btn">+ Add User</button>
      </div>

      {/* 🔍 Search */}
      <div className="user-searchbar">
        <input
          type="text"
          placeholder="Search by name, email, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id}>
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`role-badge ${u.type}`}>{u.type}</span>
                </td>
                <td>{u.isActive ? ' Active' : ' Inactive'}</td>
                <td>
                  <div className="users-actions">
                    <button onClick={() => openEditModal(u)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(u._id)} className="delete-btn">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>{editingId ? 'Edit User' : 'Add New User'}</h3>
      <form onSubmit={handleSubmit} className="modal-form">

  <div className="form-section">
    <p className="form-section-title">User Info</p>
    <div className="form-grid">
      <div className="form-group">
        <label>First Name</label>
        <input name="firstName" value={formData.firstName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input name="lastName" value={formData.lastName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Role</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>
    </div>
  </div>

  <div className="form-section">
    <p className="form-section-title">Contact & Details</p>
    <div className="form-grid">
      <div className="form-group">
        <label>Contact Number</label>
        <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input name="address" value={formData.address} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Age</label>
        <input name="age" value={formData.age} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  </div>

  <div className="form-section">
    <p className="form-section-title">Account</p>
    <div className="form-grid">
      <div className="form-group">
        <label>Username</label>
        <input name="username" value={formData.username} onChange={handleChange} />
      </div>
      {!editingId && (
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
      )}
    </div>
  </div>

  <div className="modal-footer">
    <button type="submit" className="edit-btn">
      {editingId ? 'Update' : 'Create'}
    </button>
    <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
      Cancel
    </button>
  </div>
</form>
    </div>
  </div>
)}
    </div>
  );
};

export default UsersPage;