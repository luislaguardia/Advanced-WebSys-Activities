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
            <form onSubmit={handleSubmit}>
              {Object.keys(formData).map((key) =>
                !['_id', '__v', 'password'].includes(key) && (
                  <div key={key}>
                    <label>{key}</label>
                    <input
                      name={key}
                      type={typeof formData[key] === 'boolean' ? 'checkbox' : 'text'}
                      value={
                        typeof formData[key] === 'boolean'
                          ? undefined
                          : formData[key]
                      }
                      checked={
                        typeof formData[key] === 'boolean'
                          ? formData[key]
                          : undefined
                      }
                      onChange={handleChange}
                    />
                  </div>
                )
              )}

              {/* Show password only on Create */}
              {!editingId && (
                <div>
                  <label>Password</label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="modal-footer">
                <button type="submit" className="edit-btn">
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">
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