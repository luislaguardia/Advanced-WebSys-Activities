import React, { useEffect, useState } from 'react';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import '../../styles/UsersPage.css';

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
  const [accessDenied, setAccessDenied] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const userType = localStorage.getItem('type');
    if (userType !== 'admin') {
      setAccessDenied(true);
    } else {
      fetchUsers();
    }
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 4000);
  };

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      showNotification('Failed to fetch users.', 'error');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields for both create and edit
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.age.toString().trim()) newErrors.age = 'Age is required';
    if (!formData.gender.trim()) newErrors.gender = 'Gender is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.type.trim()) newErrors.type = 'User type is required';
    
    // Password is only required when creating a new user
    if (!editingId && !formData.password.trim()) newErrors.password = 'Password is required';
    
    // Validate age is a valid number
    if (formData.age && (isNaN(formData.age) || formData.age < 1 || formData.age > 120)) {
      newErrors.age = 'Please enter a valid age between 1 and 120';
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate contact number (basic validation for numbers, spaces, dashes, parentheses)
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    if (formData.contactNumber && !phoneRegex.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid contact number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (editingId) {
        await updateUser(editingId, formData);
        showNotification('User updated successfully!', 'success');
      } else {
        await createUser(formData);
        showNotification('User created successfully!', 'success');
      }
      setShowModal(false);
      setEditingId(null);
      setErrors({});
      fetchUsers();
    } catch (err) {
      if (err.response?.status === 409) {
        showNotification('Email already exists!', 'error');
      } else {
        showNotification('Failed to save user.', 'error');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser(id);
      showNotification('User deleted successfully.', 'success');
      fetchUsers();
    } catch (err) {
      showNotification('Failed to delete user.', 'error');
    }
  };

  const openEditModal = (user) => {
    setFormData(user);
    setEditingId(user._id);
    setShowModal(true);
    setErrors({});
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
    setErrors({});
  };

  const closeModal = () => {
    setShowModal(false);
    setErrors({});
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
    <div className="page-container">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`notification-toast ${notification.type}`}>
          <div className="notification-content">
            <div className="notification-icon">
              {notification.type === 'success' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              )}
            </div>
            <span>{notification.message}</span>
            <button 
              className="notification-close"
              onClick={() => setNotification({ show: false, message: '', type: '' })}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}

      {accessDenied && (
        <div className="access-denied-overlay">
          <div className="access-denied-modal">
            <h3>Access Denied</h3>
            <p>Only admins can view this page.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="access-denied-btn"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="page-header">
        <h1>User Management</h1>
        <button onClick={openCreateModal} className="add-btn">+ Add User</button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, email, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">No users found</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`status-badge ${user.type}`}>
                      {user.type}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        onClick={() => openEditModal(user)} 
                        className="edit-btn"
                        title="Edit User"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(user._id)} 
                        className="delete-btn"
                        title="Delete User"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="user-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <h2>{editingId ? 'Edit User' : 'Add New User'}</h2>
              <button className="close-btn" onClick={closeModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* Personal Information Section */}
                <div className="form-section">
                  <h3 className="section-title">Personal Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? 'error' : ''}
                        placeholder="Enter first name"
                        required
                      />
                      {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? 'error' : ''}
                        placeholder="Enter last name"
                        required
                      />
                      {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="age">Age *</label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className={errors.age ? 'error' : ''}
                        placeholder="Enter age"
                        min="1"
                        max="120"
                        required
                      />
                      {errors.age && <span className="error-text">{errors.age}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="gender">Gender *</label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={errors.gender ? 'error' : ''}
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                      {errors.gender && <span className="error-text">{errors.gender}</span>}
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="address">Address *</label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={errors.address ? 'error' : ''}
                      placeholder="Enter full address"
                      rows="3"
                      required
                    />
                    {errors.address && <span className="error-text">{errors.address}</span>}
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="form-section">
                  <h3 className="section-title">Contact Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="Enter email address"
                        required
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="contactNumber">Contact Number *</label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className={errors.contactNumber ? 'error' : ''}
                        placeholder="Enter contact number"
                        required
                      />
                      {errors.contactNumber && <span className="error-text">{errors.contactNumber}</span>}
                    </div>
                  </div>
                </div>

                {/* Account Information Section */}
                <div className="form-section">
                  <h3 className="section-title">Account Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="username">Username *</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={errors.username ? 'error' : ''}
                        placeholder="Enter username"
                        required
                      />
                      {errors.username && <span className="error-text">{errors.username}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="type">User Type *</label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className={errors.type ? 'error' : ''}
                        required
                      >
                        <option value="">Select user type</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                        <option value="viewer">Viewer</option>
                      </select>
                      {errors.type && <span className="error-text">{errors.type}</span>}
                    </div>

                    {!editingId && (
                      <div className="form-group full-width">
                        <label htmlFor="password">Password *</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={errors.password ? 'error' : ''}
                          placeholder="Enter password"
                          required
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                      </div>
                    )}
                  </div>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                      />
                      <span className="checkmark"></span>
                      Active User
                    </label>
                    <small className="help-text">Inactive users cannot log in to the system</small>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingId ? 'Update User' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;